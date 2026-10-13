import { answerPin } from "../utils/answerChecking";
import { VOLCANOES } from "./volcanoes";

export interface PlaceBox {
  id: string;
  label: string;
  accepts: string[];
  x: number;
  y: number;
  left: number;
  top: number;
}

function pin(id: string): { x: number; y: number } {
  const volcano = VOLCANOES.find((item) => item.id === id);
  if (!volcano) return { x: 0, y: 0 };
  return answerPin(volcano);
}

/** Visible drop boxes on the zoomed Ring of Fire map. Positions are spread so the labels stay readable. */
export const PLACE_BOXES: PlaceBox[] = [
  { id: "italy", label: "Italy", accepts: ["mount-vesuvius"], ...pin("mount-vesuvius"), left: 14, top: 20 },
  { id: "ethiopia", label: "Ethiopia", accepts: ["erta-ale"], ...pin("erta-ale"), left: 24, top: 54 },
  { id: "japan", label: "Japan", accepts: ["mount-fuji"], ...pin("mount-fuji"), left: 40, top: 20 },
  { id: "philippines", label: "Philippines", accepts: ["mount-pinatubo"], ...pin("mount-pinatubo"), left: 40, top: 56 },
  { id: "hawaii-a", label: "Hawaii", accepts: ["mauna-loa", "kilauea"], ...pin("mauna-loa"), left: 62, top: 32 },
  { id: "hawaii-b", label: "Hawaii", accepts: ["mauna-loa", "kilauea"], ...pin("kilauea"), left: 62, top: 64 },
  { id: "washington", label: "Washington", accepts: ["mount-st-helens"], ...pin("mount-st-helens"), left: 78, top: 14 },
  { id: "arizona", label: "Arizona", accepts: ["sunset-crater"], ...pin("sunset-crater"), left: 92, top: 14 },
  { id: "new-mexico", label: "New Mexico", accepts: ["capulin"], ...pin("capulin"), left: 78, top: 42 },
  { id: "mexico", label: "Mexico", accepts: ["paricutin"], ...pin("paricutin"), left: 92, top: 42 },
  { id: "nicaragua", label: "Nicaragua", accepts: ["cerro-negro"], ...pin("cerro-negro"), left: 92, top: 70 },
  { id: "galapagos", label: "Galapagos", accepts: ["sierra-negra"], ...pin("sierra-negra"), left: 78, top: 70 },
];

export function boxForPlacement(point: { x: number; y: number } | null): PlaceBox | undefined {
  if (!point) return undefined;
  return PLACE_BOXES.find((box) => Math.hypot(box.x - point.x, box.y - point.y) < 1);
}
