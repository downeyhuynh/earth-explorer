import { useState } from "react";
import { PLACE_BOXES, boxForPlacement, type PlaceBox } from "../data/placeBoxes";
import { VOLCANOES } from "../data/volcanoes";
import type { GameState } from "../types";
import { correctPlacementIds } from "../utils/answerChecking";
import { playTone } from "../utils/sound";
import { DraggableVolcano } from "./DraggableVolcano";
import { Lives } from "./Lives";
import { WorldMap } from "./WorldMap";

interface MapStageProps {
  state: GameState;
  onMiss: (id: string) => { wiped: boolean };
  onPlaceInBox: (id: string, placement: { x: number; y: number }, finished: boolean) => number;
  onBack: () => void;
  onReset: () => void;
  onTeacher: () => void;
}

export function MapStage({ state, onMiss, onPlaceInBox, onBack, onReset, onTeacher }: MapStageProps) {
  const [message, setMessage] = useState("");
  const [aim, setAim] = useState(0);
  const [aiming, setAiming] = useState(false);
  const [loss, setLoss] = useState(0);
  const [gainTick, setGainTick] = useState(0);
  const [gainAmount, setGainAmount] = useState(0);
  const [wipe, setWipe] = useState(0);
  const placedIds = new Set(correctPlacementIds(VOLCANOES, state.placements, state.tolerance));
  const remaining = VOLCANOES.filter((volcano) => !placedIds.has(volcano.id));
  const current = remaining[0] ?? null;
  const done = VOLCANOES.length - remaining.length;

  function occupant(box: PlaceBox): string | null {
    const volcano = VOLCANOES.find((item) => boxForPlacement(state.placements[item.id])?.id === box.id);
    return volcano?.name ?? null;
  }

  function openSpots(): PlaceBox[] {
    return PLACE_BOXES.filter((box) => !occupant(box));
  }

  function choose(box: PlaceBox) {
    if (!current) return;
    const taken = occupant(box);
    if (taken) {
      setMessage("That spot is already used. Try a different spot.");
      return;
    }
    if (!box.accepts.includes(current.id)) {
      const outcome = onMiss(current.id);
      setAim(0);
      setAiming(false);
      if (outcome.wiped) {
        setWipe((value) => value + 1);
        setMessage("You lost. Start Stage 2 over.");
      } else {
        setLoss((value) => value + 1);
        setMessage("That spot is not the right place. Try another spot. You lost a life.");
      }
      playTone(state.sound, outcome.wiped ? 140 : 180, outcome.wiped ? 0.2 : 0.12);
      return;
    }
    const next = { ...state.placements, [current.id]: { x: box.x, y: box.y } };
    const finished = correctPlacementIds(VOLCANOES, next, state.tolerance).length === VOLCANOES.length;
    const bonus = onPlaceInBox(current.id, { x: box.x, y: box.y }, finished);
    setGainAmount(bonus);
    setGainTick((value) => value + 1);
    setAim(0);
    setAiming(false);
    setMessage(bonus === 2 ? "That spot is right. You gained 2 lives." : "That spot is right. You gained a life.");
    playTone(state.sound, finished ? 640 : 520, 0.1);
  }

  function dropAt(clientX: number, clientY: number) {
    const hit = document.elementFromPoint(clientX, clientY);
    const spot = hit instanceof Element ? hit.closest<HTMLElement>("[data-spot]") : null;
    const box = PLACE_BOXES.find((item) => item.id === spot?.dataset.spot);
    if (!box) {
      setMessage("Drag the volcano onto an empty spot.");
      return;
    }
    choose(box);
  }

  function nudgeAim(dx: number, dy: number) {
    const open = openSpots();
    if (open.length === 0) return;
    const dir = dx + dy >= 0 ? 1 : -1;
    setAiming(true);
    setAim((index) => (index + dir + open.length) % open.length);
  }

  const aimed = openSpots()[aim % Math.max(openSpots().length, 1)];

  return (
    <main className="stage">
      <header className="topbar">
        <div>
          <p className="eyebrow">Ring of Fire</p>
          <h1>STAGE 2: PLACE ONE VOLCANO</h1>
        </div>
        <div className="row">
          <button type="button" className="gear small" onClick={onTeacher} aria-label="Teacher menu">⚙</button>
          <button type="button" className="ghost" onClick={onReset}>RESET PROGRESS</button>
        </div>
      </header>
      <p className="directions">The map is zoomed in on the Ring of Fire. Drag the volcano onto an empty spot. You start with 5 lives. A wrong spot costs a life. The right spot gives 1 life. The first try gives 2 lives. Lose every life and this stage starts over.</p>
      <Lives count={state.mapLives} loss={loss} gainTick={gainTick} gainAmount={gainAmount} wipe={wipe} wipeMessage="Start Stage 2 over." />
      <p className="progress" aria-live="polite">Placed: {done} / 12</p>
      <p className="progress">Map attempts: {state.mapAttempts}</p>
      {current && (
        <section className="ask-card ask-compact">
          <p className="progress">Volcano {done + 1} of 12</p>
          <DraggableVolcano
            name={current.name}
            location={current.location}
            placed={false}
            ariaLabel={`${current.name}, ${current.location}. Drag onto an empty spot. Arrow keys move between spots. Enter places it.`}
            onOpen={() => { if (aiming && aimed) choose(aimed); }}
            onDrop={dropAt}
            onNudge={nudgeAim}
          />
          {message && <p className="warn" role="alert">{message}</p>}
        </section>
      )}
      <div className="map-frame zoomed">
        <WorldMap zoom="ring" />
        {PLACE_BOXES.map((box) => {
          const name = occupant(box);
          const highlighted = aiming && !name && aimed?.id === box.id;
          return (
            <div
              key={box.id}
              data-spot={box.id}
              className={name ? "place-spot filled" : highlighted ? "place-spot aimed" : "place-spot"}
              style={{ left: `${box.left}%`, top: `${box.top}%` }}
              aria-hidden={name ? undefined : true}
              aria-label={name ? `${name} is on this spot` : undefined}
            >
              {name ? <strong>{name}</strong> : null}
            </div>
          );
        })}
      </div>
      <ul className="legend" aria-label="Map legend">
        <li><span className="swatch convergent-swatch" /> Convergent boundary</li>
        <li><span className="swatch divergent-swatch" /> Divergent boundary</li>
        <li><span className="swatch hotspot-swatch" /> Hotspot</li>
        <li><span className="swatch ring-swatch" /> Pacific Ring of Fire</li>
      </ul>
      <div className="row">
        <button type="button" className="ghost" onClick={onBack}>Return to Investigation</button>
      </div>
    </main>
  );
}
