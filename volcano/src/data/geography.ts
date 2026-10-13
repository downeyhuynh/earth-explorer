import type { PreviewRegion } from "./volcanoes";
import { project } from "../utils/mapProjection";

function ring(points: Array<[number, number]>): string {
  return points
    .map(([lon, lat]) => {
      const point = project(lat, lon);
      return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
    })
    .join(" ");
}

export const CONTINENTS: { id: string; points: string }[] = [
  {
    id: "north-america",
    points: ring([
      [-168, 71], [-156, 71], [-140, 70], [-128, 56], [-124, 49], [-124, 40],
      [-118, 34], [-114, 32], [-110, 24], [-105, 21], [-97, 16], [-91, 15],
      [-87, 13], [-83, 9], [-80, 8], [-87, 14], [-91, 17], [-97, 18], [-97, 26],
      [-93, 29], [-89, 29], [-84, 30], [-82, 26], [-80, 25], [-81, 31], [-76, 35],
      [-74, 40], [-70, 42], [-67, 45], [-60, 47], [-56, 52], [-64, 60], [-78, 63],
      [-88, 66], [-95, 72], [-112, 74], [-140, 72], [-162, 68], [-168, 71],
    ]),
  },
  {
    id: "greenland",
    points: ring([
      [-68, 76], [-62, 82], [-40, 83], [-20, 80], [-20, 70], [-44, 60], [-50, 62], [-68, 76],
    ]),
  },
  {
    id: "south-america",
    points: ring([
      [-80, 8], [-77, 7], [-71, 12], [-60, 8], [-50, 0], [-35, -5], [-35, -8],
      [-39, -16], [-40, -22], [-48, -28], [-52, -34], [-58, -52], [-68, -56],
      [-74, -52], [-74, -46], [-72, -30], [-71, -18], [-76, -15], [-81, -5], [-80, 1], [-80, 8],
    ]),
  },
  {
    id: "africa",
    points: ring([
      [-10, 35], [-6, 36], [10, 37], [11, 33], [25, 32], [32, 31], [43, 12],
      [51, 12], [43, 2], [42, -2], [40, -15], [35, -26], [32, -29], [26, -34],
      [18, -35], [17, -28], [12, -17], [13, -8], [9, 4], [-5, 5], [-10, 6],
      [-16, 12], [-17, 15], [-16, 21], [-10, 32], [-10, 35],
    ]),
  },
  {
    id: "europe",
    points: ring([
      [-9, 37], [-9, 43], [-2, 43], [-8, 44], [-5, 48], [-5, 52], [-1, 49],
      [2, 51], [5, 53], [8, 56], [5, 58], [5, 62], [12, 66], [20, 70], [28, 71],
      [30, 70], [28, 60], [24, 55], [30, 46], [28, 41], [19, 40], [16, 41],
      [12, 42], [10, 44], [15, 41], [18, 40], [16, 38], [8, 38], [3, 36], [-6, 36], [-9, 37],
    ]),
  },
  {
    id: "asia",
    points: ring([
      [28, 41], [36, 36], [44, 38], [48, 30], [56, 27], [62, 25], [68, 25],
      [72, 22], [77, 8], [80, 6], [80, 15], [88, 22], [92, 22], [97, 16],
      [100, 6], [104, 1], [109, 14], [109, 18], [106, 21], [108, 22], [120, 22],
      [122, 30], [122, 38], [128, 42], [132, 43], [135, 48], [140, 50], [142, 47],
      [156, 60], [162, 60], [170, 62], [178, 66], [180, 68], [140, 72], [80, 74],
      [60, 70], [40, 68], [30, 70], [30, 60], [40, 50], [50, 42], [40, 40], [28, 41],
    ]),
  },
  {
    id: "australia",
    points: ring([
      [113, -22], [124, -16], [132, -12], [142, -11], [146, -17], [153, -26],
      [150, -38], [146, -39], [138, -38], [128, -32], [115, -34], [114, -26], [113, -22],
    ]),
  },
  {
    id: "japan",
    points: ring([
      [131, 31], [131, 34], [136, 35], [140, 35], [141, 39], [141, 43], [145, 43],
      [145, 41], [140, 38], [138, 34], [134, 33], [131, 31],
    ]),
  },
  {
    id: "philippines",
    points: ring([
      [120, 6], [120, 18], [122, 19], [126, 18], [126, 8], [124, 6], [120, 6],
    ]),
  },
  {
    id: "indonesia",
    points: ring([
      [95, 5], [105, 6], [115, 0], [120, -3], [130, -3], [135, -2], [140, -6],
      [138, -8], [120, -9], [114, -8], [106, -6], [95, -5], [95, 5],
    ]),
  },
  {
    id: "hawaii",
    points: ring([
      [-160, 19], [-158, 22], [-155, 22], [-154, 19.5], [-155, 18.4], [-159, 18.6], [-160, 19],
    ]),
  },
  {
    id: "galapagos",
    points: ring([
      [-92, -0.2], [-91.4, 0.6], [-89.8, 0.4], [-89.3, -0.6], [-90.6, -1.2], [-92, -0.2],
    ]),
  },
  {
    id: "iceland",
    points: ring([
      [-24, 64], [-22, 66], [-14, 66], [-13, 64], [-18, 63], [-24, 64],
    ]),
  },
  {
    id: "new-zealand",
    points: ring([
      [166, -46], [168, -41], [175, -37], [178, -38], [178, -46], [172, -47], [166, -46],
    ]),
  },
  {
    id: "uk",
    points: ring([
      [-5, 50], [-5, 58], [-2, 59], [1, 53], [1, 51], [-5, 50],
    ]),
  },
  {
    id: "madagascar",
    points: ring([
      [43, -12], [44, -16], [47, -25], [44, -25], [43, -16], [43, -12],
    ]),
  },
];

export const DIVERGENT: Array<[number, number][]> = [
  [
    [-30, 66], [-28, 58], [-32, 50], [-30, 40], [-28, 30], [-32, 15], [-20, 0],
    [-14, -10], [-14, -30], [-12, -45], [-2, -55],
  ],
  [
    [32, 28], [36, 20], [38, 14], [40, 10], [36, 2], [34, -6], [36, -14],
  ],
  [
    [-116, 40], [-114, 37], [-110, 35], [-106, 34], [-104, 36], [-106, 38],
  ],
  [
    [-110, 0], [-104, -10], [-102, -20], [-110, -30], [-112, -40], [-80, -55],
  ],
];

export const CONVERGENT: Array<[number, number][]> = [
  [
    [-76, -48], [-74, -30], [-72, -16], [-80, -4], [-82, 2], [-86, 8], [-92, 14],
    [-100, 16], [-104, 20], [-106, 24],
  ],
  [
    [-128, 50], [-126, 46], [-124, 42], [-122, 40],
  ],
  [
    [-165, 54], [170, 52], [160, 54], [150, 52], [145, 50], [142, 42], [140, 36],
    [142, 28], [142, 18], [128, 8], [122, 6], [120, 0],
  ],
  [
    [100, -2], [110, -6], [120, -8], [130, -6], [145, -6],
  ],
  [
    [8, 38], [12, 38], [16, 38], [20, 36], [28, 35],
  ],
];

export const RING_OF_FIRE: Array<[number, number][]> = [
  [
    [-72, -52], [-74, -28], [-78, -8], [-86, 6], [-98, 16], [-116, 32], [-136, 50],
    [-158, 58], [-176, 54],
  ],
  [
    [164, 54], [150, 50], [144, 40], [140, 30], [138, 18], [126, 8], [118, -2],
    [128, -8], [150, -16], [172, -28],
  ],
];

export const HOTSPOTS: { id: string; lon: number; lat: number }[] = [
  { id: "hawaii", lon: -155.5, lat: 19.5 },
  { id: "galapagos", lon: -91.2, lat: -0.6 },
  { id: "iceland", lon: -17, lat: 64.5 },
  { id: "yellowstone", lon: -110.6, lat: 44.4 },
  { id: "reunion", lon: 55.5, lat: -21.1 },
];

export const MAP_LABELS: { text: string; lon: number; lat: number }[] = [
  { text: "Pacific Ocean", lon: -168, lat: 2 },
  { text: "Atlantic Ocean", lon: -30, lat: 20 },
  { text: "Indian Ocean", lon: 75, lat: -20 },
  { text: "United States", lon: -100, lat: 40 },
  { text: "Mexico", lon: -102, lat: 24 },
  { text: "Nicaragua", lon: -85, lat: 13 },
  { text: "Ecuador", lon: -78, lat: -2 },
  { text: "Galapagos", lon: -91, lat: 2.2 },
  { text: "Hawaii", lon: -155, lat: 24 },
  { text: "Japan", lon: 138, lat: 32 },
  { text: "Philippines", lon: 123, lat: 12 },
  { text: "Italy", lon: 13, lat: 43 },
  { text: "Ethiopia", lon: 40, lat: 9 },
  { text: "Brazil", lon: -52, lat: -8 },
  { text: "Australia", lon: 134, lat: -25 },
];

export const PREVIEW_REGIONS: Record<PreviewRegion, { lon: number; lat: number; radius: number }> = {
  "north-pacific": { lon: -160, lat: 28, radius: 36 },
  "east-pacific": { lon: -100, lat: 0, radius: 32 },
  "east-africa": { lon: 38, lat: 8, radius: 28 },
  "pacific-northwest": { lon: -122, lat: 46, radius: 26 },
  "east-asia": { lon: 138, lat: 36, radius: 28 },
  mediterranean: { lon: 15, lat: 40, radius: 24 },
  "southeast-asia": { lon: 122, lat: 12, radius: 28 },
  mexico: { lon: -102, lat: 22, radius: 22 },
  "central-america": { lon: -86, lat: 12, radius: 20 },
  "southwest-us": { lon: -108, lat: 36, radius: 24 },
};

export function splitDateLine(points: Array<[number, number]>): Array<[number, number][]> {
  const parts: Array<[number, number][]> = [[points[0]]];
  for (let i = 1; i < points.length; i += 1) {
    if (Math.abs(points[i][0] - points[i - 1][0]) > 180) parts.push([points[i]]);
    else parts[parts.length - 1].push(points[i]);
  }
  return parts.filter((part) => part.length > 1);
}

export function linePath(points: Array<[number, number]>): string {
  return points
    .map(([lon, lat], index) => {
      const point = project(lat, lon);
      const cmd = index === 0 ? "M" : "L";
      return `${cmd}${point.x.toFixed(2)},${point.y.toFixed(2)}`;
    })
    .join(" ");
}

export function starPoints(lon: number, lat: number, radius: number): string {
  const center = project(lat, lon);
  const parts: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const arm = i % 2 === 0 ? radius : radius * 0.42;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    parts.push(`${(center.x + Math.cos(angle) * arm).toFixed(2)},${(center.y + Math.sin(angle) * arm).toFixed(2)}`);
  }
  return parts.join(" ");
}
