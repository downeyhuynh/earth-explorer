import type { TectonicSetting, VolcanoType } from "../types";

export type PreviewRegion =
  | "north-pacific"
  | "east-pacific"
  | "east-africa"
  | "pacific-northwest"
  | "east-asia"
  | "mediterranean"
  | "southeast-asia"
  | "mexico"
  | "central-america"
  | "southwest-us";

export interface Volcano {
  id: string;
  name: string;
  location: string;
  country: string;
  latitude: number;
  longitude: number;
  volcanoType: VolcanoType;
  tectonicSetting: TectonicSetting;
  clues: string[];
  funFact: string;
  /** Shown only in the teacher menu and the teacher README. */
  teacherNote?: string;
  acceptableMapRadius: number;
  interchangeableTargetGroup?: "hawaii";
  previewRegion: PreviewRegion;
}

export const VOLCANO_TYPES: { id: VolcanoType; label: string }[] = [
  { id: "shield", label: "Shield volcano" },
  { id: "composite", label: "Composite volcano" },
  { id: "cinder", label: "Cinder-cone volcano" },
];

export const TECTONIC_SETTINGS: { id: TectonicSetting; label: string }[] = [
  { id: "convergent", label: "Convergent boundary" },
  { id: "divergent", label: "Divergent boundary" },
  { id: "hotspot", label: "Hotspot" },
];

export const VOLCANOES: Volcano[] = [
  {
    id: "mauna-loa",
    name: "Mauna Loa",
    location: "Hawaii, United States",
    country: "United States",
    latitude: 19.48,
    longitude: -155.61,
    volcanoType: "shield",
    tectonicSetting: "hotspot",
    clues: [
      "It has been built by many thin lava flows.",
      "Its lava can travel a long distance before cooling.",
      "It formed far from a plate boundary.",
      "It is part of the Hawaiian Islands.",
    ],
    funFact: "Mauna Loa is one of the largest active volcanoes on Earth.",
    acceptableMapRadius: 14,
    interchangeableTargetGroup: "hawaii",
    previewRegion: "north-pacific",
  },
  {
    id: "kilauea",
    name: "Kilauea",
    location: "Hawaii, United States",
    country: "United States",
    latitude: 19.42,
    longitude: -155.29,
    volcanoType: "shield",
    tectonicSetting: "hotspot",
    clues: [
      "Its lava usually flows easily.",
      "It is located in the middle of the Pacific Plate.",
      "It was formed above a very hot area beneath the plate.",
      "Repeated eruptions have added new land to Hawaii.",
    ],
    funFact: "Kilauea is one of the world’s most active volcanoes.",
    acceptableMapRadius: 14,
    interchangeableTargetGroup: "hawaii",
    previewRegion: "north-pacific",
  },
  {
    id: "sierra-negra",
    name: "Sierra Negra",
    location: "Galapagos Islands, Ecuador",
    country: "Ecuador",
    latitude: -0.83,
    longitude: -91.17,
    volcanoType: "shield",
    tectonicSetting: "hotspot",
    clues: [
      "It has a very large summit crater.",
      "Thin lava has spread across a large area.",
      "It formed above an area of rising hot material.",
      "It is located away from a major plate boundary.",
    ],
    funFact: "Sierra Negra has one of the largest volcanic craters in the Galapagos.",
    acceptableMapRadius: 14,
    previewRegion: "east-pacific",
  },
  {
    id: "erta-ale",
    name: "Erta Ale",
    location: "Ethiopia",
    country: "Ethiopia",
    latitude: 13.6,
    longitude: 40.67,
    volcanoType: "shield",
    tectonicSetting: "divergent",
    clues: [
      "It is located where Earth’s crust is being pulled apart.",
      "Magma rises through cracks created by separating land.",
      "Its lava is thin and moves easily.",
      "It is famous for a long-lasting lava lake.",
    ],
    funFact: "Erta Ale’s name is sometimes translated as “smoking mountain.”",
    acceptableMapRadius: 14,
    previewRegion: "east-africa",
  },
  {
    id: "mount-st-helens",
    name: "Mount St. Helens",
    location: "Washington, United States",
    country: "United States",
    latitude: 46.2,
    longitude: -122.18,
    volcanoType: "composite",
    tectonicSetting: "convergent",
    clues: [
      "One tectonic plate is sinking beneath another nearby.",
      "Its magma can be thick and trap gases.",
      "It can produce ash and pyroclastic flows.",
      "Its 1980 eruption removed part of its summit.",
    ],
    funFact: "The 1980 eruption caused the largest landslide in recorded history.",
    acceptableMapRadius: 14,
    previewRegion: "pacific-northwest",
  },
  {
    id: "mount-fuji",
    name: "Mount Fuji",
    location: "Japan",
    country: "Japan",
    latitude: 35.36,
    longitude: 138.73,
    volcanoType: "composite",
    tectonicSetting: "convergent",
    clues: [
      "It was built by many eruptions involving lava and ash.",
      "It is located where tectonic plates interact.",
      "Its magma can trap gas and create explosive eruptions.",
      "It is part of the Pacific Ring of Fire.",
    ],
    funFact: "Mount Fuji is the tallest mountain in Japan.",
    acceptableMapRadius: 14,
    previewRegion: "east-asia",
  },
  {
    id: "mount-vesuvius",
    name: "Mount Vesuvius",
    location: "Italy",
    country: "Italy",
    latitude: 40.82,
    longitude: 14.43,
    volcanoType: "composite",
    tectonicSetting: "convergent",
    clues: [
      "It can produce ash, rock, and pyroclastic flows.",
      "It formed where tectonic plates push toward each other.",
      "Its magma can be thick and gas-rich.",
      "A famous eruption buried the city of Pompeii.",
    ],
    funFact: "Mount Vesuvius erupted in AD 79 and buried Pompeii.",
    acceptableMapRadius: 14,
    previewRegion: "mediterranean",
  },
  {
    id: "mount-pinatubo",
    name: "Mount Pinatubo",
    location: "Philippines",
    country: "Philippines",
    latitude: 15.14,
    longitude: 120.35,
    volcanoType: "composite",
    tectonicSetting: "convergent",
    clues: [
      "It is located where one plate moves beneath another.",
      "It can remain quiet before erupting explosively.",
      "Its eruption released a huge amount of ash.",
      "It is part of the Pacific Ring of Fire.",
    ],
    funFact: "Its 1991 eruption temporarily cooled global temperatures.",
    acceptableMapRadius: 14,
    previewRegion: "southeast-asia",
  },
  {
    id: "paricutin",
    name: "Paricutin",
    location: "Mexico",
    country: "Mexico",
    latitude: 19.49,
    longitude: -102.25,
    volcanoType: "cinder",
    tectonicSetting: "convergent",
    clues: [
      "It began forming in a farmer’s field.",
      "Loose volcanic fragments collected around one vent.",
      "It formed quickly compared with most large volcanoes.",
      "It is located in a volcanic region connected to subduction.",
    ],
    funFact: "Scientists and local residents watched Paricutin grow from nearly the beginning.",
    acceptableMapRadius: 14,
    previewRegion: "mexico",
  },
  {
    id: "cerro-negro",
    name: "Cerro Negro",
    location: "Nicaragua",
    country: "Nicaragua",
    latitude: 12.51,
    longitude: -86.7,
    volcanoType: "cinder",
    tectonicSetting: "convergent",
    clues: [
      "It is a relatively small, dark volcanic cone.",
      "Its surface contains loose pieces of volcanic rock.",
      "It formed near a subduction zone.",
      "Its eruptions can throw cinders and ash into the air.",
    ],
    funFact: "Visitors sometimes ride boards down Cerro Negro’s loose volcanic slopes.",
    acceptableMapRadius: 14,
    previewRegion: "central-america",
  },
  {
    id: "sunset-crater",
    name: "Sunset Crater",
    location: "Arizona, United States",
    country: "United States",
    latitude: 35.37,
    longitude: -111.5,
    volcanoType: "cinder",
    tectonicSetting: "divergent",
    clues: [
      "It formed in an area where Earth’s crust has been stretched and fractured.",
      "Pieces of lava collected around one central vent.",
      "Its surface contains loose cinders and volcanic rock.",
      "It formed much more quickly than a large mountain volcano.",
    ],
    funFact: "Its reddish summit reminded people of the colors of a sunset.",
    teacherNote:
      "For this simplified middle-school game, classify the tectonic setting as divergent because the regional volcanism is related to crustal extension. Do not show this teacher note to students.",
    acceptableMapRadius: 12,
    previewRegion: "southwest-us",
  },
  {
    id: "capulin",
    name: "Capulin Volcano",
    location: "New Mexico, United States",
    country: "United States",
    latitude: 36.78,
    longitude: -103.97,
    volcanoType: "cinder",
    tectonicSetting: "divergent",
    clues: [
      "It formed in a region where the crust has experienced stretching.",
      "Loose volcanic pieces built up around one opening.",
      "It has a noticeable crater at its summit.",
      "It is smaller than most large composite volcanoes.",
    ],
    funFact: "A trail allows visitors to walk around the rim of its crater.",
    teacherNote:
      "For this simplified middle-school classification, use divergent because the region experienced crustal extension. Do not show this note to students.",
    acceptableMapRadius: 12,
    previewRegion: "southwest-us",
  },
];

export function typeLabel(id: VolcanoType): string {
  return VOLCANO_TYPES.find((item) => item.id === id)?.label ?? id;
}

export function settingLabel(id: TectonicSetting): string {
  return TECTONIC_SETTINGS.find((item) => item.id === id)?.label ?? id;
}
