import { useState } from "react";
import { ClassificationStage } from "./components/ClassificationStage";
import { CompletionScreen } from "./components/CompletionScreen";
import { InstructionsModal } from "./components/InstructionsModal";
import { MapStage } from "./components/MapStage";
import { Modal } from "./components/Modal";
import { StartScreen } from "./components/StartScreen";
import { TeacherPanel } from "./components/TeacherPanel";
import { classifiedCount, useGameState } from "./hooks/useGameState";

export default function App() {
  const game = useGameState();
  const [helpOpen, setHelpOpen] = useState(false);
  const [teacherOpen, setTeacherOpen] = useState(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const { state } = game;
  const classified = classifiedCount(state);
  const hasWork = state.stage !== "start" || state.classAttempts > 0 || state.mapAttempts > 0 || classified > 0;

  function resetGame() {
    game.reset();
    setConfirmReset(false);
    setTeacherOpen(false);
  }

  return (
    <div className="app">
      {state.stage === "start" && (
        <StartScreen
          onStart={() => game.goToStage("classify")}
          onHelp={() => setHelpOpen(true)}
          onTeacher={() => setTeacherOpen(true)}
          onReset={() => setConfirmReset(true)}
          showReset={hasWork}
        />
      )}
      {state.stage === "classify" && (
        <ClassificationStage
          state={state}
          onChange={game.updateClassification}
          onCheckOne={game.checkOne}
          onContinue={() => game.goToStage("map")}
          onReset={() => setConfirmReset(true)}
          onTeacher={() => setTeacherOpen(true)}
        />
      )}
      {state.stage === "map" && (
        <MapStage
          state={state}
          onMiss={game.noteMapMiss}
          onPlaceInBox={game.placeInBox}
          onBack={() => game.goToStage("classify")}
          onReset={() => setConfirmReset(true)}
          onTeacher={() => setTeacherOpen(true)}
        />
      )}
      {state.stage === "complete" && (
        <CompletionScreen
          state={state}
          onAgain={resetGame}
          onReset={() => setConfirmReset(true)}
        />
      )}
      {helpOpen && <InstructionsModal onClose={() => setHelpOpen(false)} />}
      {teacherOpen && (
        <TeacherPanel
          unlocked={teacherUnlocked}
          onUnlock={() => setTeacherUnlocked(true)}
          state={state}
          onClose={() => setTeacherOpen(false)}
          onReset={resetGame}
          onSkip={game.skipToMap}
          onSound={game.setSound}
          onTolerance={game.setTolerance}
        />
      )}
      {confirmReset && (
        <Modal title="Reset progress?" onClose={() => setConfirmReset(false)}>
          <p>This deletes the saved volcano work on this browser.</p>
          <div className="row">
            <button type="button" className="primary" onClick={resetGame}>RESET PROGRESS</button>
            <button type="button" className="ghost" onClick={() => setConfirmReset(false)}>Keep working</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
