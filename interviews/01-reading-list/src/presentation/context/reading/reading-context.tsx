import { createContext } from 'react'
import type { ReadingState } from './reading-provider'
import type { Book } from '../../../domain/entities/book.entity'

interface ReadingContextType extends ReadingState {
  onAddBook: (book: Book) => void
  onRemoveBook: (isb: string) => void
}

export const ReadingContext = createContext({} as ReadingContextType)
