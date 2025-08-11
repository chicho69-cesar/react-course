import { useReducer, type PropsWithChildren } from 'react'
import type { Book } from '../../../domain/entities/book.entity'
import { ReadingContext } from './reading-context'
import { readingReducer } from './reading-reducer'
import { LOCAL_STORAGE_KEY } from '../../../constants/keys'

export interface ReadingState {
  reading: Book[]
}

const INITIAL_STATE: ReadingState = {
  reading: []
}

const init = (): ReadingState => {
  const readingSaved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') as Book[]
  
  return {
    reading: readingSaved
  }
}

export default function ReadingProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(readingReducer, INITIAL_STATE, init)

  const onAddBook = (book: Book) => {
    dispatch({
      type: '[READING] - ADD',
      payload: book
    })
  }

  const onRemoveBook = (isb: string) => {
    dispatch({
      type: '[READING] - REMOVE',
      payload: isb
    })
  }

  return (
    <ReadingContext.Provider
      value={{
        reading: state.reading,

        onAddBook,
        onRemoveBook
      }}
    >
      {children}
    </ReadingContext.Provider>
  )
}
