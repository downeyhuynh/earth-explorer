import { Modal } from "./Modal";

interface InstructionsModalProps {
  onClose: () => void;
}

export function InstructionsModal({ onClose }: InstructionsModalProps) {
  return (
    <Modal title="How to play" onClose={onClose}>
      <ol className="steps">
        <li>Read the clues for one volcano.</li>
        <li>Choose its volcano type.</li>
        <li>Choose its boundary type.</li>
        <li>Check that volcano, then fix it if it is wrong.</li>
        <li>Go on to the next volcano.</li>
        <li>On the zoomed Ring of Fire map, drag the volcano onto an empty spot.</li>
        <li>A wrong spot tells you to try another spot.</li>
        <li>Each stage starts with 5 lives. A wrong answer costs a life. A correct answer gives 1 life. A correct answer on the first try gives 2 lives. At zero lives, a popup says you lost. Click Continue to start that stage over.</li>
      </ol>
      <button type="button" className="primary" onClick={onClose}>Close</button>
    </Modal>
  );
}
