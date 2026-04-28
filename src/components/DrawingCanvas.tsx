import type { MouseEvent } from "react";
import type { Point } from "../drawingReducer";

type DrawingCanvasProps = {
  points: Point[];
  onAddPoint: (event: MouseEvent<HTMLDivElement>) => void;
};

export function DrawingCanvas({ points, onAddPoint }: DrawingCanvasProps) {
  return (
    <div
      className="canvas"
      role="button"
      tabIndex={0}
      aria-label="Drawing canvas"
      onClick={onAddPoint}
    >
      <span className="canvas-hint">Click anywhere to add a point</span>

      {points.map((point) => (
        <span
          aria-label={`Point ${point.id}`}
          className="point"
          key={point.id}
          style={{
            backgroundColor: point.color,
            left: point.x,
            top: point.y,
          }}
        />
      ))}
    </div>
  );
}
