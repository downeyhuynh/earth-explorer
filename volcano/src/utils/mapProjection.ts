/** Equirectangular map: 360 wide, 180 tall. x grows east, y grows south. */
export const MAP_W = 360;
export const MAP_H = 180;

export function project(latitude: number, longitude: number): { x: number; y: number } {
  return {
    x: longitude + 180,
    y: 90 - latitude,
  };
}

export function clampToMap(point: { x: number; y: number }): { x: number; y: number } {
  return {
    x: Math.min(MAP_W - 6, Math.max(6, point.x)),
    y: Math.min(MAP_H - 5, Math.max(5, point.y)),
  };
}

/** Crop that puts the Pacific Ring of Fire in the middle of the map. */
export const RING_VIEW = { x: 0, y: 28, w: 300, h: 112 };

export function toRing(point: { x: number; y: number }): { x: number; y: number } {
  return { x: (point.x + 180) % 360, y: point.y };
}
