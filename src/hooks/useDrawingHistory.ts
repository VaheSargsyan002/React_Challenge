import { useReducer } from "react";
import type { MouseEvent } from "react";
import {
  drawingReducer,
  getCurrentPoints,
  initialDrawingState,
} from "../drawingReducer";

const pointColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export function useDrawingHistory() {
  const [state, dispatch] = useReducer(drawingReducer, initialDrawingState);
  const points = getCurrentPoints(state);

  function addPoint(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const id = points.length + state.history.length + state.future.length;

    dispatch({
      type: "ADD_POINT",
      point: {
        id,
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        color: pointColors[id % pointColors.length],
      },
    });
  }

  function undo() {
    dispatch({ type: "UNDO" });
  }

  function redo() {
    dispatch({ type: "REDO" });
  }

  return {
    addPoint,
    futureCount: state.future.length,
    historyCount: state.history.length,
    points,
    redo,
    undo,
  };
}
