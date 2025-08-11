import type { Book } from '../entities/book.entity'
import data from '../../data/mocks/books.json'

export async function getBooks(): Promise<Book[]> {
  return data.library.map((lib) => lib.book)
}
