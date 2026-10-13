import { useState } from "react";
import { PHOTO_CREDITS } from "../data/photoCredits";
import { TECTONIC_SETTINGS, VOLCANOES, VOLCANO_TYPES } from "../data/volcanoes";
import type { GameState } from "../types";
import { playTone } from "../utils/sound";
import { Lives } from "./Lives";

function VolcanoPhoto({ id, name }: { id: string; name: string }) {
  return (
    <figure className="volcano-photo">
      <img src={`${import.meta.env.BASE_URL}photos/${id}.jpg`} alt={`Photograph of ${name}`} />
      <figcaption>Photo: {PHOTO_CREDITS[id]}</figcaption>
    </figure>
  );
}

interface ClassificationStageProps {
  state: GameState;
  onChange: (id: string, patch: Partial<GameState["classifications"][string]>) => void;
  onCheckOne: (id: string) => { grade: "correct" | "type" | "setting" | "both" | "incomplete"; wiped: boolean; bonus: number };
  onContinue: () => void;
  onReset: () => void;
  onTeacher: () => void;
}

export function ClassificationStage({ state, onChange, onCheckOne, onContinue, onReset, onTeacher }: ClassificationStageProps) {
  const [holdingId, setHoldingId] = useState<string | null>(null);
  const [lifeNote, setLifeNote] = useState("");
  const [loss, setLoss] = useState(0);
  const [gainTick, setGainTick] = useState(0);
  const [gainAmount, setGainAmount] = useState(0);
  const [wipe, setWipe] = useState(0);
  const correctCount = VOLCANOES.filter((volcano) => state.checkResults[volcano.id] === "correct").length;
  const pending = VOLCANOES.find((volcano) => state.checkResults[volcano.id] !== "correct") ?? null;
  const volcano = VOLCANOES.find((item) => item.id === holdingId) ?? pending;
  const answer = volcano ? state.classifications[volcano.id] : null;
  const result = volcano ? state.checkResults[volcano.id] : null;
  const ready = Boolean(answer?.volcanoType && answer?.tectonicSetting);

  function check() {
    if (!volcano) return;
    const outcome = onCheckOne(volcano.id);
    if (outcome.wiped) {
      setHoldingId(null);
      setWipe((value) => value + 1);
      setLifeNote("You lost. Start Stage 1 over.");
      playTone(state.sound, 140, 0.2);
      return;
    }
    if (outcome.grade === "correct") {
      setHoldingId(volcano.id);
      setGainAmount(outcome.bonus);
      setGainTick((value) => value + 1);
      setLifeNote(outcome.bonus === 2 ? "You gained 2 lives." : "You gained a life.");
      playTone(state.sound, 620, 0.1);
      return;
    }
    setLoss((value) => value + 1);
    setLifeNote("You lost a life.");
    playTone(state.sound, 180, 0.12);
  }

  function feedback(): string | null {
    if (result === "type") return "Check your volcano type.";
    if (result === "setting") return "Check your boundary type.";
    if (result === "both") return "Both answers need another look.";
    return null;
  }

  return (
    <main className="stage">
      <header className="topbar">
        <div>
          <p className="eyebrow">Ring of Fire</p>
          <h1>STAGE 1: ONE VOLCANO</h1>
        </div>
        <div className="row">
          <button type="button" className="gear small" onClick={onTeacher} aria-label="Teacher menu">⚙</button>
          <button type="button" className="ghost" onClick={onReset}>RESET PROGRESS</button>
        </div>
      </header>
      <p className="directions">Read the clues. Choose the volcano type and the boundary type. You start with 5 lives. A wrong answer costs a life. A correct answer gives 1 life. The first try gives 2 lives. Lose every life and this stage starts over.</p>
      <Lives count={state.classLives} loss={loss} gainTick={gainTick} gainAmount={gainAmount} wipe={wipe} wipeMessage="Start Stage 1 over." />
      {lifeNote && <p className="warn" role="alert">{lifeNote}</p>}
      <p className="progress" aria-live="polite">Correct: {correctCount} / 12</p>
      <p className="progress">Classification attempts: {state.classAttempts}</p>
      {!volcano && (
        <section className="ask-card">
          <h2>STAGE 1 COMPLETE!</h2>
          <p>You correctly classified all 12 volcanoes.</p>
          <button type="button" className="primary" onClick={onContinue}>CONTINUE TO THE MAP</button>
        </section>
      )}
      {volcano && answer && result === "correct" && (
        <section className="ask-card">
          <p className="progress">Volcano {correctCount} of 12</p>
          <VolcanoPhoto id={volcano.id} name={volcano.name} />
          <h2>{volcano.name}</h2>
          <p className="good-line" role="status">Correct!</p>
          {pending ? (
            <button type="button" className="primary" onClick={() => { setLifeNote(""); setHoldingId(null); }}>NEXT VOLCANO</button>
          ) : (
            <button type="button" className="primary" onClick={onContinue}>CONTINUE TO THE MAP</button>
          )}
        </section>
      )}
      {volcano && answer && result !== "correct" && (
        <section className="ask-card">
          <p className="progress">Volcano {correctCount + 1} of 12</p>
          <VolcanoPhoto id={volcano.id} name={volcano.name} />
          <h2>{volcano.name}</h2>
          <p className="place-line">{volcano.location}</p>
          <h3>Clues</h3>
          <ul className="clues">
            {volcano.clues.map((clue) => <li key={clue}>{clue}</li>)}
          </ul>
          <p className="fact">{volcano.funFact}</p>
          <h3>What type of volcano is this?</h3>
          <div className="choice-grid" role="group" aria-label="Volcano type">
            {VOLCANO_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                className={answer.volcanoType === type.id ? "choice-btn picked" : "choice-btn"}
                aria-pressed={answer.volcanoType === type.id}
                onClick={() => onChange(volcano.id, { volcanoType: type.id })}
              >
                {type.label}
              </button>
            ))}
          </div>
          <h3>What boundary type is this?</h3>
          <div className="choice-grid" role="group" aria-label="Boundary type">
            {TECTONIC_SETTINGS.map((setting) => (
              <button
                key={setting.id}
                type="button"
                className={answer.tectonicSetting === setting.id ? "choice-btn picked" : "choice-btn"}
                aria-pressed={answer.tectonicSetting === setting.id}
                onClick={() => onChange(volcano.id, { tectonicSetting: setting.id })}
              >
                {setting.label}
              </button>
            ))}
          </div>
          {feedback() && <p className="warn" role="alert">{feedback()}</p>}
          <div className="row">
            <button type="button" className="primary" disabled={!ready} onClick={check}>CHECK ANSWER</button>
          </div>
        </section>
      )}
    </main>
  );
}
