type DrawingStatsProps = {
  pointCount: number
  historyCount: number
  futureCount: number
}

export function DrawingStats({
  pointCount,
  historyCount,
  futureCount,
}: DrawingStatsProps) {
  return (
    <dl className="stats">
      <div>
        <dt>Points on canvas:</dt>
        <dd>{pointCount}</dd>
      </div>
      <div>
        <dt>History states:</dt>
        <dd>{historyCount}</dd>
      </div>
      <div>
        <dt>Future states:</dt>
        <dd>{futureCount}</dd>
      </div>
    </dl>
  )
}
