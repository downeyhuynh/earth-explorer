import type { Volcano } from "../data/volcanoes";
import { VOLCANOES } from "../data/volcanoes";
import type { Classification, Mistake, Placement } from "../types";
import { project } from "./mapProjection";

export interface MapTarget {
  id: string;
  accepts: string[];
  x: number;
  y: number;
  radius: number;
}

const HAWAII_A = project(23.5, -166);
const HAWAII_B = project(16, -145);

export function gradeClassification(volcano: Volcano, answer: Classification): Mistake | "incomplete" {
  if (!answer.volcanoType || !answer.tectonicSetting) return "incomplete";
  const typeOk = answer.volcanoType === volcano.volcanoType;
  const settingOk = answer.tectonicSetting === volcano.tectonicSetting;
  if (typeOk && settingOk) return "correct";
  if (!typeOk && !settingOk) return "both";
  if (!typeOk) return "type";
  return "setting";
}

export function mistakeSentence(name: string, mistake: Mistake): string {
  if (mistake === "type") return `${name}: Check your volcano type.`;
  if (mistake === "setting") return `${name}: Check your tectonic setting.`;
  return `${name}: Both answers need another look.`;
}

export function mapTargets(volcanoes: Volcano[], tolerance: number): MapTarget[] {
  const targets: MapTarget[] = [];
  const hawaii = volcanoes.filter((volcano) => volcano.interchangeableTargetGroup === "hawaii").map((volcano) => volcano.id);
  if (hawaii.length > 0) {
    const radius = 15 * tolerance;
    targets.push({ id: "hawaii-a", accepts: hawaii, x: HAWAII_A.x, y: HAWAII_A.y, radius });
    targets.push({ id: "hawaii-b", accepts: hawaii, x: HAWAII_B.x, y: HAWAII_B.y, radius });
  }
  for (const volcano of volcanoes) {
    if (volcano.interchangeableTargetGroup) continue;
    const point = project(volcano.latitude, volcano.longitude);
    targets.push({
      id: volcano.id,
      accepts: [volcano.id],
      x: point.x,
      y: point.y,
      radius: volcano.acceptableMapRadius * tolerance,
    });
  }
  return targets;
}

export function correctPlacementIds(
  volcanoes: Volcano[],
  placements: Record<string, Placement | null>,
  tolerance: number,
): string[] {
  const targets = mapTargets(volcanoes, tolerance);
  const pairs: { volcanoId: string; targetId: string; dist: number }[] = [];
  for (const volcano of volcanoes) {
    const place = placements[volcano.id];
    if (!place) continue;
    for (const target of targets) {
      if (!target.accepts.includes(volcano.id)) continue;
      const dist = Math.hypot(place.x - target.x, place.y - target.y);
      if (dist <= target.radius) pairs.push({ volcanoId: volcano.id, targetId: target.id, dist });
    }
  }
  pairs.sort((a, b) => a.dist - b.dist);
  const usedVolcanoes = new Set<string>();
  const usedTargets = new Set<string>();
  const correct: string[] = [];
  for (const pair of pairs) {
    if (usedVolcanoes.has(pair.volcanoId) || usedTargets.has(pair.targetId)) continue;
    usedVolcanoes.add(pair.volcanoId);
    usedTargets.add(pair.targetId);
    correct.push(pair.volcanoId);
  }
  return correct;
}

/** Canonical pin for the teacher map. Hawaii uses the two nearby target spaces. */
export function answerPin(volcano: Volcano): Placement {
  if (volcano.id === "mauna-loa") return { x: HAWAII_A.x, y: HAWAII_A.y };
  if (volcano.id === "kilauea") return { x: HAWAII_B.x, y: HAWAII_B.y };
  return project(volcano.latitude, volcano.longitude);
}

export function separatePlacement(
  point: Placement,
  others: Placement[],
  minDist: number,
  maxNudge = 9,
): Placement {
  const gap = (candidate: Placement) => others.reduce((smallest, other) => Math.min(smallest, Math.hypot(candidate.x - other.x, candidate.y - other.y)), Infinity);
  const fits = (candidate: Placement) => gap(candidate) >= minDist - 0.2;
  if (fits(point)) return point;
  let best = point;
  let bestGap = gap(point);
  for (let ring = 1; ring <= 16; ring += 1) {
    const steps = 12;
    const reach = ring * (minDist * 0.35);
    if (reach > maxNudge) break;
    for (let step = 0; step < steps; step += 1) {
      const angle = (Math.PI * 2 * step) / steps;
      const candidate = {
        x: point.x + Math.cos(angle) * reach,
        y: point.y + Math.sin(angle) * reach,
      };
      if (candidate.x < 4 || candidate.y < 4 || candidate.x > 356 || candidate.y > 176) continue;
      const candidateGap = gap(candidate);
      if (candidateGap > bestGap) {
        best = candidate;
        bestGap = candidateGap;
      }
      if (fits(candidate)) return candidate;
    }
  }
  return best;
}

export function allAnswerPins(): Record<string, Placement> {
  const placements: Record<string, Placement> = {};
  for (const volcano of VOLCANOES) placements[volcano.id] = answerPin(volcano);
  return placements;
}
