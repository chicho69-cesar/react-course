import { useEffect, useReducer, type PropsWithChildren } from 'react'
import { LOCAL_STORAGE_KEY } from '../../../constants/keys'
import type { Book } from '../../../domain/entities/book.entity'
import { useBroadcast } from '../../hooks/use-broadcast'
import { ReadingContext } from './reading-context'
import { readingReducer } from './reading-reducer'

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
  const { listen, send } = useBroadcast('reading-list')

  useEffect(() => {
    const handleBroadcastMessage = (event: MessageEvent) => {
      const { type, data } = event.data

      if (type === 'READING_UPDATED') {
        dispatch({
          type: '[READING] - SYNC',
          payload: data
        })
      }
    }

    listen(handleBroadcastMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onAddBook = (book: Book) => {
    dispatch({
      type: '[READING] - ADD',
      payload: book
    })

    send('READING_UPDATED', [...state.reading, book])
  }

  const onRemoveBook = (isb: string) => {
    const updatedReading = state.reading.filter((book) => book.ISBN !== isb)

    dispatch({
      type: '[READING] - REMOVE',
      payload: isb
    })

    send('READING_UPDATED', updatedReading)
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
