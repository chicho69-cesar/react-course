import type { Book } from '../../domain/entities/book.entity'

export interface Library {
  library: LibraryElement[]
}

export interface LibraryElement {
  book: Book
}
