import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { VolcanoIcon } from "./VolcanoCard";

interface DraggableVolcanoProps {
  name: string;
  location: string;
  placed: boolean;
  style?: { left: string; top: string };
  ariaLabel?: string;
  onOpen: () => void;
  onDrop: (clientX: number, clientY: number) => void;
  onNudge: (dx: number, dy: number) => void;
}

export function DraggableVolcano({ name, location, placed, style, ariaLabel, onOpen, onDrop, onNudge }: DraggableVolcanoProps) {
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null);
  const moved = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const dragging = useRef<number | null>(null);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    moved.current = false;
    origin.current = { x: event.clientX, y: event.clientY };
    dragging.current = event.pointerId;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* Pointer capture is optional. The pointer id still tracks the drag. */
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragging.current !== event.pointerId) return;
    if (Math.hypot(event.clientX - origin.current.x, event.clientY - origin.current.y) > 6) {
      moved.current = true;
      setGhost({ x: event.clientX, y: event.clientY });
    }
  }

  function finishDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragging.current !== event.pointerId) return;
    dragging.current = null;
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      /* Already released. */
    }
    setGhost(null);
    if (moved.current) onDrop(event.clientX, event.clientY);
    else onOpen();
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 8 : 4;
    if (event.key === "ArrowUp") { event.preventDefault(); onNudge(0, -step); }
    else if (event.key === "ArrowDown") { event.preventDefault(); onNudge(0, step); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); onNudge(-step, 0); }
    else if (event.key === "ArrowRight") { event.preventDefault(); onNudge(step, 0); }
    else if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(); }
  }

  return (
    <>
      <div
        className={placed ? "map-token" : "tray-token"}
        style={style}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel ?? `${name}, ${location}. Drag onto the map, or use arrow keys to move it. Press Enter to read the clues.`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={onKeyDown}
      >
        <VolcanoIcon />
        <span>
          <strong>{name}</strong>
          <small>{location}</small>
        </span>
      </div>
      {ghost && (
        <div className="drag-ghost" style={{ left: ghost.x, top: ghost.y }}>
          <VolcanoIcon />
          <strong>{name}</strong>
        </div>
      )}
    </>
  );
}
