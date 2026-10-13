import { useState, type FormEvent } from "react";
import { TEACHER_CODE } from "../data/teacher";
import { VOLCANOES, settingLabel, typeLabel } from "../data/volcanoes";
import type { GameState } from "../types";
import { answerPin } from "../utils/answerChecking";
import { MAP_H, MAP_W } from "../utils/mapProjection";
import { Modal } from "./Modal";
import { WorldMap } from "./WorldMap";

interface TeacherPanelProps {
  unlocked: boolean;
  onUnlock: () => void;
  state: GameState;
  onClose: () => void;
  onReset: () => void;
  onSkip: () => void;
  onSound: (on: boolean) => void;
  onTolerance: (value: number) => void;
}

export function TeacherPanel({
  unlocked,
  onUnlock,
  state,
  onClose,
  onReset,
  onSkip,
  onSound,
  onTolerance,
}: TeacherPanelProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  function submitCode(event: FormEvent) {
    event.preventDefault();
    if (code.trim() === TEACHER_CODE) {
      setError("");
      onUnlock();
      return;
    }
    setError("That code is not correct.");
  }

  return (
    <Modal title="Teacher menu" onClose={onClose} wide>
      {!unlocked ? (
        <form onSubmit={submitCode}>
          <label htmlFor="teacher-code">Enter the teacher code</label>
          <input
            id="teacher-code"
            className="code-input"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          {error && <p className="warn" role="alert">{error}</p>}
          <div className="row">
            <button type="submit" className="primary">Unlock</button>
            <button type="button" className="ghost" onClick={onClose}>Close</button>
          </div>
        </form>
      ) : (
        <>
          <p>Classification attempts: {state.classAttempts}</p>
          <p>Stage 1 lives: {state.classLives}</p>
          <p>Map attempts: {state.mapAttempts}</p>
          <p>Stage 2 lives: {state.mapLives}</p>
          <label className="choice" htmlFor="sound-toggle">
            <input
              id="sound-toggle"
              type="checkbox"
              checked={state.sound}
              onChange={(event) => onSound(event.target.checked)}
            />
            Sounds {state.sound ? "on" : "off"}
          </label>
          <label htmlFor="tolerance">
            Location tolerance: {state.tolerance.toFixed(2)} times the standard target size
          </label>
          <input
            id="tolerance"
            type="range"
            min={0.75}
            max={1.6}
            step={0.05}
            value={state.tolerance}
            onChange={(event) => onTolerance(Number(event.target.value))}
          />
          <div className="row">
            <button type="button" className="ghost" onClick={() => setShowKey((open) => !open)}>
              {showKey ? "Hide Stage 1 answer key" : "Reveal Stage 1 answer key"}
            </button>
            <button type="button" className="ghost" onClick={() => setShowMap(true)}>Reveal completed map</button>
            <button type="button" className="ghost" onClick={() => { onSkip(); onClose(); }}>Skip directly to Stage 2</button>
            <button type="button" className="ghost" onClick={() => setConfirmReset(true)}>Reset the game</button>
            <button type="button" className="primary" onClick={onClose}>Close</button>
          </div>
          {showKey && (
            <table className="key-table">
              <thead>
                <tr>
                  <th>Volcano</th>
                  <th>Type</th>
                  <th>Tectonic setting</th>
                </tr>
              </thead>
              <tbody>
                {VOLCANOES.map((volcano) => (
                  <tr key={volcano.id}>
                    <td>
                      {volcano.name}
                      {volcano.teacherNote && <span className="teacher-note">{volcano.teacherNote}</span>}
                    </td>
                    <td>{typeLabel(volcano.volcanoType)}</td>
                    <td>{settingLabel(volcano.tectonicSetting)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {showMap && (
            <div className="map-frame teacher-map">
              <WorldMap />
              {VOLCANOES.map((volcano) => {
                const spot = answerPin(volcano);
                return (
                  <p key={volcano.id} className="done-label" style={{ left: `${(spot.x / MAP_W) * 100}%`, top: `${(spot.y / MAP_H) * 100}%` }}>
                    {volcano.name}
                  </p>
                );
              })}
            </div>
          )}
          {confirmReset && (
            <div className="confirm-box">
              <p>Reset the game? This deletes saved student work on this browser.</p>
              <div className="row">
                <button type="button" className="primary" onClick={() => { onReset(); onClose(); }}>Reset the game</button>
                <button type="button" className="ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
