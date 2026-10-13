import { TECTONIC_SETTINGS, VOLCANO_TYPES, settingLabel, typeLabel } from "../data/volcanoes";
import type { Volcano } from "../data/volcanoes";
import type { Classification, TectonicSetting, VolcanoType } from "../types";
import { Modal } from "./Modal";
import { WorldMap } from "./WorldMap";

interface InvestigationPanelProps {
  volcano: Volcano;
  answer: Classification;
  status: string;
  revealSelections: boolean;
  onChange: (patch: Partial<Classification>) => void;
  onSave: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
  notice?: string;
  readOnly?: boolean;
}

export function InvestigationPanel({
  volcano,
  answer,
  status,
  revealSelections,
  onChange,
  onSave,
  onPrevious,
  onNext,
  onClose,
  notice,
  readOnly = false,
}: InvestigationPanelProps) {
  return (
    <Modal title={volcano.name} onClose={onClose} wide>
      <p className="place-line">{volcano.location}</p>
      <p className="status-line">Status: {status}</p>
      <div className="preview-map" aria-hidden="true">
        <WorldMap preview={volcano.previewRegion} />
        <p>Region preview. This circle is much larger than the real location.</p>
      </div>
      <h3>Clues</h3>
      <ul className="clues">
        {volcano.clues.map((clue) => <li key={clue}>{clue}</li>)}
      </ul>
      <p className="fact"><strong>Fun fact: </strong>{volcano.funFact}</p>
      {!readOnly && (
      <>
      <fieldset>
        <legend>Volcano type</legend>
        {VOLCANO_TYPES.map((item) => (
          <label key={item.id} className="choice">
            <input
              type="radio"
              name={`type-${volcano.id}`}
              checked={answer.volcanoType === item.id}
              onChange={() => onChange({ volcanoType: item.id as VolcanoType })}
            />
            {item.label}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Tectonic setting</legend>
        {TECTONIC_SETTINGS.map((item) => (
          <label key={item.id} className="choice">
            <input
              type="radio"
              name={`setting-${volcano.id}`}
              checked={answer.tectonicSetting === item.id}
              onChange={() => onChange({ tectonicSetting: item.id as TectonicSetting })}
            />
            {item.label}
          </label>
        ))}
      </fieldset>
      </>
      )}
      {revealSelections && (
        <p className="saved-line">
          Your selection: {answer.volcanoType ? typeLabel(answer.volcanoType) : "type not chosen"}
          {" · "}
          {answer.tectonicSetting ? settingLabel(answer.tectonicSetting) : "setting not chosen"}
        </p>
      )}
      {notice && <p className="saved-line" aria-live="polite">{notice}</p>}
      <div className="row">
        {!readOnly && <button type="button" className="primary" onClick={onSave}>Save Answer</button>}
        <button type="button" className="ghost" onClick={onPrevious}>Previous Volcano</button>
        <button type="button" className="ghost" onClick={onNext}>Next Volcano</button>
        <button type="button" className="ghost" onClick={onClose}>Return to All Volcanoes</button>
      </div>
    </Modal>
  );
}
