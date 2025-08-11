import { LOCAL_STORAGE_KEY } from '../../../constants/keys';
import type { Book } from '../../../domain/entities/book.entity';
import type { ReadingState } from './reading-provider';

export type Action =
  | { type: '[READING] - ADD', payload: Book }
  | { type: '[READING] - REMOVE', payload: string }

const REDUCER_ACTIONS = {
  ['[READING] - ADD']: (state: ReadingState, action: Action): ReadingState => {
    const book = action.payload as Book

    if (state.reading.some((b) => b.ISBN === book.ISBN)) {
      return state
    }

    const newState = {
      reading: [...state.reading, action.payload as Book]
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState.reading))
    return newState
  },

  ['[READING] - REMOVE']: (state: ReadingState, action: Action): ReadingState => {
    const newState = {
      reading: state.reading.filter((book) => book.ISBN !== action.payload)
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState.reading))
    return newState
  }
}

export function readingReducer(state: ReadingState, action: Action) {
  const { type } = action
  const reducerAction = REDUCER_ACTIONS[type]
  return reducerAction ? reducerAction(state, action) : state
}
