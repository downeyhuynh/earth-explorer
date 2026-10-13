import { VOLCANOES } from "../data/volcanoes";
import type { Classification, GameState, Mistake, Placement, TectonicSetting, VolcanoType } from "../types";
import { gradeClassification } from "../utils/answerChecking";
import { useLocalStorage } from "./useLocalStorage";

export const SAVE_KEY = "volcano-explorer-v1";
export const START_LIVES = 5;

function blankClassification(): Classification {
  return { volcanoType: null, tectonicSetting: null };
}

export function blankState(): GameState {
  const classifications: Record<string, Classification> = {};
  const checkResults: Record<string, Mistake | null> = {};
  const placements: Record<string, Placement | null> = {};
  for (const volcano of VOLCANOES) {
    classifications[volcano.id] = blankClassification();
    checkResults[volcano.id] = null;
    placements[volcano.id] = null;
  }
  return {
    stage: "start",
    classifications,
    checkResults,
    classAttempts: 0,
    classLives: START_LIVES,
    classTried: {},
    stage1Complete: false,
    placements,
    mapAttempts: 0,
    mapLives: START_LIVES,
    mapTried: {},
    mapComplete: false,
    sound: false,
    tolerance: 1,
  };
}

function triedMap(raw: unknown): Record<string, boolean> {
  const tried: Record<string, boolean> = {};
  if (!raw || typeof raw !== "object") return tried;
  const saved = raw as Record<string, unknown>;
  for (const volcano of VOLCANOES) {
    if (saved[volcano.id] === true) tried[volcano.id] = true;
  }
  return tried;
}

function blankClassProgress(): Pick<GameState, "classifications" | "checkResults" | "classTried" | "stage1Complete"> {
  const classifications: Record<string, Classification> = {};
  const checkResults: Record<string, Mistake | null> = {};
  for (const volcano of VOLCANOES) {
    classifications[volcano.id] = blankClassification();
    checkResults[volcano.id] = null;
  }
  return { classifications, checkResults, classTried: {}, stage1Complete: false };
}

function blankMapProgress(): Pick<GameState, "placements" | "mapTried" | "mapComplete"> {
  const placements: Record<string, Placement | null> = {};
  for (const volcano of VOLCANOES) placements[volcano.id] = null;
  return { placements, mapTried: {}, mapComplete: false };
}

function isType(value: unknown): value is VolcanoType {
  return value === "shield" || value === "composite" || value === "cinder";
}

function isSetting(value: unknown): value is TectonicSetting {
  return value === "convergent" || value === "divergent" || value === "hotspot";
}

export function normalizeState(raw: unknown): GameState {
  const base = blankState();
  if (!raw || typeof raw !== "object") return base;
  const saved = raw as Partial<GameState>;
  const classifications = { ...base.classifications };
  const checkResults = { ...base.checkResults };
  const placements = { ...base.placements };
  if (saved.classifications && typeof saved.classifications === "object") {
    for (const volcano of VOLCANOES) {
      const item = saved.classifications[volcano.id];
      if (!item) continue;
      classifications[volcano.id] = {
        volcanoType: isType(item.volcanoType) ? item.volcanoType : null,
        tectonicSetting: isSetting(item.tectonicSetting) ? item.tectonicSetting : null,
      };
    }
  }
  if (saved.checkResults && typeof saved.checkResults === "object") {
    for (const volcano of VOLCANOES) {
      const item = saved.checkResults[volcano.id];
      checkResults[volcano.id] = item === "correct" || item === "type" || item === "setting" || item === "both" ? item : null;
    }
  }
  if (saved.placements && typeof saved.placements === "object") {
    for (const volcano of VOLCANOES) {
      const item = saved.placements[volcano.id];
      if (item && typeof item.x === "number" && typeof item.y === "number") placements[volcano.id] = { x: item.x, y: item.y };
    }
  }
  const stage = saved.stage === "classify" || saved.stage === "map" || saved.stage === "complete" || saved.stage === "start"
    ? saved.stage
    : "start";
  return {
    stage,
    classifications,
    checkResults,
    classAttempts: typeof saved.classAttempts === "number" ? saved.classAttempts : 0,
    classLives: typeof saved.classLives === "number" && saved.classLives > 0 ? saved.classLives : START_LIVES,
    classTried: triedMap(saved.classTried),
    stage1Complete: Boolean(saved.stage1Complete),
    placements,
    mapAttempts: typeof saved.mapAttempts === "number" ? saved.mapAttempts : 0,
    mapLives: typeof saved.mapLives === "number" && saved.mapLives > 0 ? saved.mapLives : START_LIVES,
    mapTried: triedMap(saved.mapTried),
    mapComplete: Boolean(saved.mapComplete),
    sound: Boolean(saved.sound),
    tolerance: typeof saved.tolerance === "number" ? Math.min(1.8, Math.max(0.7, saved.tolerance)) : 1,
  };
}

function readState(): GameState {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return blankState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return blankState();
  }
}

export function classifiedCount(state: GameState): number {
  return VOLCANOES.filter((volcano) => {
    const answer = state.classifications[volcano.id];
    return Boolean(answer?.volcanoType && answer?.tectonicSetting);
  }).length;
}

export function useGameState() {
  const [state, setState] = useLocalStorage(SAVE_KEY, readState);

  function updateClassification(id: string, patch: Partial<Classification>) {
    setState((prev) => {
      const classifications = {
        ...prev.classifications,
        [id]: { ...prev.classifications[id], ...patch },
      };
      const checkResults = { ...prev.checkResults, [id]: null };
      const stillPerfect = VOLCANOES.every((volcano) => gradeClassification(volcano, classifications[volcano.id]) === "correct");
      let stage = prev.stage;
      if (!stillPerfect && (stage === "map" || stage === "complete")) stage = "classify";
      return {
        ...prev,
        classifications,
        checkResults,
        stage1Complete: stillPerfect,
        mapComplete: stillPerfect ? prev.mapComplete : false,
        stage,
      };
    });
  }

  function checkOne(id: string): { grade: Mistake | "incomplete"; wiped: boolean; bonus: number } {
    const volcano = VOLCANOES.find((item) => item.id === id);
    if (!volcano) return { grade: "incomplete", wiped: false, bonus: 0 };
    const grade = gradeClassification(volcano, state.classifications[id]);
    if (grade === "incomplete") return { grade, wiped: false, bonus: 0 };
    const firstTry = !state.classTried[id];
    const bonus = grade === "correct" ? (firstTry ? 2 : 1) : 0;
    const wiped = grade !== "correct" && state.classLives <= 1;
    setState((prev) => {
      if (grade !== "correct" && prev.classLives <= 1) {
        return {
          ...prev,
          ...blankClassProgress(),
          classLives: START_LIVES,
          classAttempts: prev.classAttempts + 1,
        };
      }
      const checkResults = { ...prev.checkResults, [id]: grade };
      const allCorrect = VOLCANOES.every((item) => {
        const result = item.id === id ? grade : gradeClassification(item, prev.classifications[item.id]);
        return result === "correct";
      });
      const classTried = { ...prev.classTried, [id]: true };
      const added = grade === "correct" ? (prev.classTried[id] ? 1 : 2) : 0;
      const classLives = grade === "correct" ? prev.classLives + added : prev.classLives - 1;
      return {
        ...prev,
        checkResults,
        classTried,
        classLives,
        classAttempts: prev.classAttempts + 1,
        stage1Complete: allCorrect,
      };
    });
    return { grade, wiped, bonus };
  }

  function noteMapMiss(id: string): { wiped: boolean } {
    const wiped = state.mapLives <= 1;
    setState((prev) => {
      if (prev.mapLives <= 1) {
        return {
          ...prev,
          ...blankMapProgress(),
          mapLives: START_LIVES,
          mapAttempts: prev.mapAttempts + 1,
          stage: "map",
        };
      }
      return {
        ...prev,
        mapTried: { ...prev.mapTried, [id]: true },
        mapLives: prev.mapLives - 1,
        mapAttempts: prev.mapAttempts + 1,
      };
    });
    return { wiped };
  }

  function placeInBox(id: string, placement: Placement, finished: boolean): number {
    const bonus = state.mapTried[id] ? 1 : 2;
    setState((prev) => ({
      ...prev,
      placements: { ...prev.placements, [id]: placement },
      mapTried: { ...prev.mapTried, [id]: true },
      mapLives: prev.mapLives + (prev.mapTried[id] ? 1 : 2),
      mapAttempts: prev.mapAttempts + 1,
      mapComplete: finished,
      stage: finished ? "complete" : "map",
    }));
    return bonus;
  }

  function checkClassifications(): { allCorrect: boolean; lines: string[] } {
    const lines: string[] = [];
    let allCorrect = true;
    const checkResults: Record<string, Mistake | null> = {};
    for (const volcano of VOLCANOES) {
      const grade = gradeClassification(volcano, state.classifications[volcano.id]);
      if (grade === "incomplete") {
        allCorrect = false;
        checkResults[volcano.id] = null;
        continue;
      }
      checkResults[volcano.id] = grade;
      if (grade !== "correct") {
        allCorrect = false;
        lines.push(grade === "type"
          ? `${volcano.name}: Check your volcano type.`
          : grade === "setting"
            ? `${volcano.name}: Check your tectonic setting.`
            : `${volcano.name}: Both answers need another look.`);
      }
    }
    setState((prev) => ({
      ...prev,
      checkResults,
      classAttempts: prev.classAttempts + 1,
      stage1Complete: allCorrect,
    }));
    return { allCorrect, lines };
  }

  function placeVolcano(id: string, placement: Placement | null) {
    setState((prev) => ({
      ...prev,
      mapComplete: false,
      placements: { ...prev.placements, [id]: placement },
      stage: prev.stage === "complete" ? "map" : prev.stage,
    }));
  }

  function recordMapAttempt(correctCount: number) {
    setState((prev) => ({
      ...prev,
      mapAttempts: prev.mapAttempts + 1,
      mapComplete: correctCount === VOLCANOES.length,
      stage: correctCount === VOLCANOES.length ? "complete" : prev.stage,
    }));
  }

  function clearMap() {
    setState((prev) => {
      const placements: Record<string, Placement | null> = {};
      for (const volcano of VOLCANOES) placements[volcano.id] = null;
      return { ...prev, placements, mapComplete: false, stage: prev.stage === "complete" ? "map" : prev.stage };
    });
  }

  function goToStage(stage: GameState["stage"]) {
    setState((prev) => ({ ...prev, stage }));
  }

  function setSound(sound: boolean) {
    setState((prev) => ({ ...prev, sound }));
  }

  function setTolerance(tolerance: number) {
    setState((prev) => ({ ...prev, tolerance }));
  }

  function skipToMap() {
    setState((prev) => ({ ...prev, stage1Complete: true, stage: "map" }));
  }

  function reset() {
    const fresh = blankState();
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      /* ignore */
    }
    setState(fresh);
  }

  return {
    state,
    updateClassification,
    checkOne,
    checkClassifications,
    noteMapMiss,
    placeInBox,
    placeVolcano,
    recordMapAttempt,
    clearMap,
    goToStage,
    setSound,
    setTolerance,
    skipToMap,
    reset,
  };
}
