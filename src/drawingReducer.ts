export type Point = {
  id: number
  x: number
  y: number
  color: string
}

export type DrawingState = {
  history: Point[][]
  future: Point[][]
}

export type DrawingAction =
  | { type: 'ADD_POINT'; point: Point }
  | { type: 'UNDO' }
  | { type: 'REDO' }

export const initialDrawingState: DrawingState = {
  history: [[]],
  future: [],
}

export function getCurrentPoints(state: DrawingState) {
  return state.history[state.history.length - 1] ?? []
}

export function drawingReducer(
  state: DrawingState,
  action: DrawingAction,
): DrawingState {
  switch (action.type) {
    case 'ADD_POINT': {
      const currentPoints = getCurrentPoints(state)

      return {
        history: [...state.history, [...currentPoints, action.point]],
        future: [],
      }
    }

    case 'UNDO': {
      if (state.history.length <= 1) {
        return state
      }

      const previousHistory = state.history.slice(0, -1)
      const undoneState = state.history[state.history.length - 1]

      return {
        history: previousHistory,
        future: [...state.future, undoneState],
      }
    }

    case 'REDO': {
      if (state.future.length === 0) {
        return state
      }

      const nextState = state.future[state.future.length - 1]

      return {
        history: [...state.history, nextState],
        future: state.future.slice(0, -1),
      }
    }

    default:
      return state
  }
}
