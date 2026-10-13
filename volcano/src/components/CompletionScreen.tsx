import { PLACE_BOXES, boxForPlacement } from "../data/placeBoxes";
import { VOLCANOES } from "../data/volcanoes";
import type { GameState } from "../types";
import { WorldMap } from "./WorldMap";

interface CompletionScreenProps {
  state: GameState;
  onAgain: () => void;
  onReset: () => void;
}

export function CompletionScreen({ state, onAgain, onReset }: CompletionScreenProps) {
  return (
    <main className="stage complete-screen">
      <p className="eyebrow">Ring of Fire</p>
      <h1>MISSION COMPLETE!</h1>
      <p className="lede">You correctly classified and located all 12 volcanoes.</p>
      <ul className="score-list">
        <li>Classification attempts: {state.classAttempts}</li>
        <li>Map attempts: {state.mapAttempts}</li>
        <li>Total volcanoes identified: 12</li>
      </ul>
      <div className="map-frame zoomed" id="completed-map">
        <WorldMap zoom="ring" />
        {PLACE_BOXES.map((box) => {
          const volcano = VOLCANOES.find((item) => boxForPlacement(state.placements[item.id])?.id === box.id);
          return (
            <p key={box.id} className="place-box filled static-box" style={{ left: `${box.left}%`, top: `${box.top}%` }}>
              <strong>{volcano?.name ?? ""}</strong>
            </p>
          );
        })}
      </div>
      <section className="review">
        <h2>Three tectonic settings</h2>
        <h3>CONVERGENT BOUNDARY</h3>
        <p>Plates move toward each other. One plate may sink beneath another, producing magma.</p>
        <h3>DIVERGENT BOUNDARY</h3>
        <p>Plates move apart. Magma rises through cracks and creates new crust.</p>
        <h3>HOTSPOT</h3>
        <p>A hot area below a plate produces magma away from most plate boundaries.</p>
      </section>
      <div className="row">
        <a className="primary button-link" href="#completed-map">Review Completed Map</a>
        <button type="button" className="ghost" onClick={onAgain}>Play Again</button>
        <button type="button" className="ghost" onClick={() => window.print()}>Print Results</button>
        <button type="button" className="ghost" onClick={onReset}>RESET PROGRESS</button>
      </div>
    </main>
  );
}
