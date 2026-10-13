import { VOLCANOES, settingLabel, typeLabel } from "../src/data/volcanoes.ts";
import { allAnswerPins, correctPlacementIds, gradeClassification, mistakeSentence, separatePlacement } from "../src/utils/answerChecking.ts";
import { project } from "../src/utils/mapProjection.ts";
import type { Classification } from "../src/types.ts";

const errors: string[] = [];
const forbidden = ["Shield volcano", "Composite volcano", "Cinder-cone volcano", "Convergent boundary", "Divergent boundary", "Hotspot"];

for (const volcano of VOLCANOES) {
  const perfect: Classification = { volcanoType: volcano.volcanoType, tectonicSetting: volcano.tectonicSetting };
  if (gradeClassification(volcano, perfect) !== "correct") errors.push(`${volcano.name} should grade correct`);
  const wrongType: Classification = {
    volcanoType: volcano.volcanoType === "shield" ? "composite" : "shield",
    tectonicSetting: volcano.tectonicSetting,
  };
  if (gradeClassification(volcano, wrongType) !== "type") errors.push(`${volcano.name} type miss`);
  const wrongSetting: Classification = {
    volcanoType: volcano.volcanoType,
    tectonicSetting: volcano.tectonicSetting === "hotspot" ? "convergent" : "hotspot",
  };
  if (gradeClassification(volcano, wrongSetting) !== "setting") errors.push(`${volcano.name} setting miss`);
  const both: Classification = {
    volcanoType: volcano.volcanoType === "cinder" ? "shield" : "cinder",
    tectonicSetting: volcano.tectonicSetting === "divergent" ? "hotspot" : "divergent",
  };
  if (gradeClassification(volcano, both) !== "both") errors.push(`${volcano.name} both miss`);
  const point = project(volcano.latitude, volcano.longitude);
  if (point.x < 0 || point.x > 360 || point.y < 0 || point.y > 180) errors.push(`${volcano.name} projects off the map`);
}

for (const mistake of ["type", "setting", "both"] as const) {
  const line = mistakeSentence("Mount Fuji", mistake);
  for (const word of forbidden) {
    if (line.includes(word)) errors.push(`Feedback leaked ${word}`);
  }
}

const exact = allAnswerPins();
if (correctPlacementIds(VOLCANOES, exact, 1).length !== 12) errors.push("Exact pins should all be correct");

const swapped = { ...exact, "mauna-loa": exact["kilauea"], kilauea: exact["mauna-loa"] };
const hawaii = correctPlacementIds(VOLCANOES, swapped, 1);
if (!hawaii.includes("mauna-loa") || !hawaii.includes("kilauea")) errors.push("Hawaii targets should be interchangeable");

const real: Record<string, { x: number; y: number } | null> = {};
for (const volcano of VOLCANOES) real[volcano.id] = project(volcano.latitude, volcano.longitude);
if (correctPlacementIds(VOLCANOES, real, 1).length !== 12) errors.push("Real coordinates should all fall inside a target");

const far: Record<string, { x: number; y: number } | null> = {};
for (const volcano of VOLCANOES) far[volcano.id] = { x: 10, y: 10 };
if (correctPlacementIds(VOLCANOES, far, 1).length !== 0) errors.push("A corner pile should not count");

const fujiOnItaly = { ...exact, "mount-fuji": exact["mount-vesuvius"], "mount-vesuvius": null };
const moved = correctPlacementIds(VOLCANOES, fujiOnItaly, 1);
if (moved.includes("mount-fuji") || moved.includes("mount-vesuvius")) errors.push("Fuji on Italy should not count for either");

if (typeLabel("shield") !== "Shield volcano" || settingLabel("hotspot") !== "Hotspot") errors.push("Labels changed");

const packed: Record<string, { x: number; y: number } | null> = {};
for (const volcano of VOLCANOES) {
  const raw = exact[volcano.id];
  const others = Object.values(packed).filter((spot): spot is { x: number; y: number } => Boolean(spot));
  packed[volcano.id] = separatePlacement(raw, others, 14, 9);
}
if (correctPlacementIds(VOLCANOES, packed, 1).length !== 12) {
  errors.push(`Packed answer pins should stay correct, got ${correctPlacementIds(VOLCANOES, packed, 1).length}`);
}

const island = project(19.5, -155.5);
const hawaiiPacked: Record<string, { x: number; y: number } | null> = { ...exact };
const others = VOLCANOES.filter((volcano) => volcano.id !== "mauna-loa" && volcano.id !== "kilauea")
  .map((volcano) => hawaiiPacked[volcano.id]!);
hawaiiPacked["mauna-loa"] = separatePlacement(island, others, 14, 9);
hawaiiPacked.kilauea = separatePlacement(island, [...others, hawaiiPacked["mauna-loa"]!], 14, 9);
const hawaiiNear = correctPlacementIds(VOLCANOES, hawaiiPacked, 1);
if (!hawaiiNear.includes("mauna-loa") || !hawaiiNear.includes("kilauea")) errors.push("Both Hawaiian volcanoes should count near the islands");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Checked ${VOLCANOES.length} volcanoes, Hawaii swap, and map targets.`);
