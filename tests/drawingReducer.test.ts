import { describe, expect, it } from 'vitest'
import {
  drawingReducer,
  getCurrentPoints,
  initialDrawingState,
} from '../src/drawingReducer'
import type { Point } from '../src/drawingReducer'

const firstPoint: Point = { id: 1, x: 20, y: 30, color: '#3b82f6' }
const secondPoint: Point = { id: 2, x: 40, y: 50, color: '#10b981' }

describe('drawingReducer', () => {
  it('adds points immutably and clears future states', () => {
    const stateWithFuture = {
      history: [[], [firstPoint]],
      future: [[firstPoint, secondPoint]],
    }

    const nextState = drawingReducer(stateWithFuture, {
      type: 'ADD_POINT',
      point: secondPoint,
    })

    expect(nextState).not.toBe(stateWithFuture)
    expect(nextState.history).toHaveLength(3)
    expect(getCurrentPoints(nextState)).toEqual([firstPoint, secondPoint])
    expect(nextState.future).toEqual([])
    expect(getCurrentPoints(stateWithFuture)).toEqual([firstPoint])
  })

  it('moves the current state from history to future on undo', () => {
    const state = drawingReducer(
      drawingReducer(initialDrawingState, {
        type: 'ADD_POINT',
        point: firstPoint,
      }),
      { type: 'ADD_POINT', point: secondPoint },
    )

    const nextState = drawingReducer(state, { type: 'UNDO' })

    expect(getCurrentPoints(nextState)).toEqual([firstPoint])
    expect(nextState.history).toHaveLength(2)
    expect(nextState.future).toEqual([[firstPoint, secondPoint]])
  })

  it('moves the latest future state back to history on redo', () => {
    const undoneState = {
      history: [[], [firstPoint]],
      future: [[firstPoint, secondPoint]],
    }

    const nextState = drawingReducer(undoneState, { type: 'REDO' })

    expect(getCurrentPoints(nextState)).toEqual([firstPoint, secondPoint])
    expect(nextState.history).toHaveLength(3)
    expect(nextState.future).toEqual([])
  })

  it('does nothing when undo or redo is unavailable', () => {
    expect(drawingReducer(initialDrawingState, { type: 'UNDO' })).toBe(
      initialDrawingState,
    )
    expect(drawingReducer(initialDrawingState, { type: 'REDO' })).toBe(
      initialDrawingState,
    )
  })
})
