import { useId } from "react";
import {
  CONTINENTS,
  CONVERGENT,
  DIVERGENT,
  HOTSPOTS,
  MAP_LABELS,
  PREVIEW_REGIONS,
  RING_OF_FIRE,
  linePath,
  splitDateLine,
  starPoints,
} from "../data/geography";
import type { PreviewRegion } from "../data/volcanoes";
import { RING_VIEW, project, toRing } from "../utils/mapProjection";

interface WorldMapProps {
  preview?: PreviewRegion | null;
  zoom?: "world" | "ring";
}

function shiftPairs(points: string): string[] {
  const pairs = points.trim().split(/\s+/).map((pair) => {
    const [x, y] = pair.split(",").map(Number);
    const shifted = toRing({ x, y });
    return shifted;
  });
  if (pairs.length === 0) return [];
  const parts: { x: number; y: number }[][] = [[pairs[0]]];
  for (let i = 1; i < pairs.length; i += 1) {
    if (Math.abs(pairs[i].x - pairs[i - 1].x) > 180) parts.push([pairs[i]]);
    else parts[parts.length - 1].push(pairs[i]);
  }
  return parts
    .filter((part) => part.length >= 3)
    .map((part) => part.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" "));
}

function shiftPath(d: string): string[] {
  const pairs = [...d.matchAll(/[ML](-?\d+\.?\d*),(-?\d+\.?\d*)/g)].map((match) => toRing({
    x: Number(match[1]),
    y: Number(match[2]),
  }));
  if (pairs.length === 0) return [];
  const parts: { x: number; y: number }[][] = [[pairs[0]]];
  for (let i = 1; i < pairs.length; i += 1) {
    if (Math.abs(pairs[i].x - pairs[i - 1].x) > 180) parts.push([pairs[i]]);
    else parts[parts.length - 1].push(pairs[i]);
  }
  return parts
    .filter((part) => part.length > 1)
    .map((part) => part.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" "));
}

export function WorldMap({ preview = null, zoom = "world" }: WorldMapProps) {
  const quiet = Boolean(preview);
  const ring = zoom === "ring" && !quiet;
  const zone = preview ? PREVIEW_REGIONS[preview] : null;
  const zonePoint = zone ? project(zone.lat, zone.lon) : null;
  const toothId = useId().replace(/:/g, "");
  const view = ring ? `${RING_VIEW.x} ${RING_VIEW.y} ${RING_VIEW.w} ${RING_VIEW.h}` : "0 0 360 180";

  return (
    <svg className={ring ? "world-map zoomed" : "world-map"} viewBox={view} role="img" aria-label="World map with continents, oceans, plate boundaries, hotspots, and the Pacific Ring of Fire">
      <defs>
        <marker id={toothId} markerUnits="userSpaceOnUse" markerWidth="4.2" markerHeight="4.2" refX="2.1" refY="2.1" orient="auto">
          <path d="M0.4,3.8 L2.1,0.3 L3.8,3.8 Z" className="tooth" />
        </marker>
      </defs>
      <rect className="ocean" x="0" y="0" width="360" height="180" />
      {!quiet && RING_OF_FIRE.flatMap((line) => splitDateLine(line)).flatMap((line) => (ring ? shiftPath(linePath(line)) : [linePath(line)])).map((d, index) => (
        <path key={`ring-${index}`} className="ring" d={d} />
      ))}
      {CONTINENTS.flatMap((land) => {
        const shapes = ring ? shiftPairs(land.points) : [land.points];
        return shapes.map((points, index) => (
          <polygon key={`${land.id}-${index}`} className="land" points={points} />
        ));
      })}
      {!quiet && DIVERGENT.flatMap((line) => splitDateLine(line)).flatMap((line) => (ring ? shiftPath(linePath(line)) : [linePath(line)])).map((d, index) => (
        <path key={`div-${index}`} className="boundary divergent" d={d} />
      ))}
      {!quiet && CONVERGENT.flatMap((line) => splitDateLine(line)).flatMap((line) => (ring ? shiftPath(linePath(line)) : [linePath(line)])).map((d, index) => (
        <path key={`con-${index}`} className="boundary convergent" markerMid={`url(#${toothId})`} d={d} />
      ))}
      {!quiet && HOTSPOTS.map((spot) => {
        const points = starPoints(spot.lon, spot.lat, ring ? 3.2 : 2.2);
        const shapes = ring ? shiftPairs(points) : [points];
        return shapes.map((shape, index) => (
          <polygon key={`${spot.id}-${index}`} className="hotspot" points={shape} />
        ));
      })}
      {MAP_LABELS.filter((label) => !ring || label.text.endsWith("Ocean")).map((label) => {
        const point = ring ? toRing(project(label.lat, label.lon)) : project(label.lat, label.lon);
        return (
          <text key={label.text} className="map-label" x={point.x} y={point.y}>
            {label.text}
          </text>
        );
      })}
      {zonePoint && zone && (
        <circle className="preview-zone" cx={zonePoint.x} cy={zonePoint.y} r={zone.radius} />
      )}
    </svg>
  );
}
