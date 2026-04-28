type ToolbarProps = {
  undoCount: number
  redoCount: number
  onUndo: () => void
  onRedo: () => void
}

export function Toolbar({
  undoCount,
  redoCount,
  onUndo,
  onRedo,
}: ToolbarProps) {
  return (
    <div className="toolbar" aria-label="Drawing history controls">
      <button type="button" onClick={onUndo} disabled={undoCount === 0}>
        Undo ({undoCount})
      </button>
      <button type="button" onClick={onRedo} disabled={redoCount === 0}>
        Redo ({redoCount})
      </button>
    </div>
  )
}
