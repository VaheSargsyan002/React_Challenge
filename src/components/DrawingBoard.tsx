import { DrawingCanvas } from './DrawingCanvas'
import { DrawingStats } from './DrawingStats'
import { Toolbar } from './Toolbar'
import { useDrawingHistory } from '../hooks/useDrawingHistory'

export function DrawingBoard() {
  const {
    addPoint,
    futureCount,
    historyCount,
    points,
    redo,
    undo,
  } = useDrawingHistory()

  return (
    <>
      <Toolbar
        undoCount={points.length}
        redoCount={futureCount}
        onUndo={undo}
        onRedo={redo}
      />

      <DrawingCanvas points={points} onAddPoint={addPoint} />

      <DrawingStats
        pointCount={points.length}
        historyCount={historyCount}
        futureCount={futureCount}
      />
    </>
  )
}
