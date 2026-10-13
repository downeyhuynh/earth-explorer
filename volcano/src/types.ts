export type VolcanoType = "shield" | "composite" | "cinder";
export type TectonicSetting = "convergent" | "divergent" | "hotspot";
export type Stage = "start" | "classify" | "map" | "complete";
export type Mistake = "correct" | "type" | "setting" | "both";

export interface Classification {
  volcanoType: VolcanoType | null;
  tectonicSetting: TectonicSetting | null;
}

export interface Placement {
  x: number;
  y: number;
}

export interface GameState {
  stage: Stage;
  classifications: Record<string, Classification>;
  checkResults: Record<string, Mistake | null>;
  classAttempts: number;
  classLives: number;
  classTried: Record<string, boolean>;
  stage1Complete: boolean;
  placements: Record<string, Placement | null>;
  mapAttempts: number;
  mapLives: number;
  mapTried: Record<string, boolean>;
  mapComplete: boolean;
  sound: boolean;
  tolerance: number;
}
