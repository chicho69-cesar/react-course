import { useEffect, useMemo, useState } from 'react'
import type { Book } from '../../domain/entities/book.entity'
import { getBooks } from '../../domain/actions/get-books.action'
import useFilters from '../context/filters/use-filters'
import useReading from '../context/reading/use-reading'

export default function useBooks() {
  const { reading } = useReading()
  const { genre, pages } = useFilters()

  const [books, setBooks] = useState<Book[]>([])
  
  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch((error) => {
        console.log('Error obteniendo los libros: ', error)
      })
  }, [])

  const booksFiltered = useMemo(() => {
    if (!genre) {
      return books
        .filter((b) => !reading.some((r) => r.ISBN === b.ISBN))
        .filter((b) => b.pages >= pages)
    }

    return books
      .filter((b) => !reading.some((r) => r.ISBN === b.ISBN))
      .filter((b) => genre && b.genre === genre)
      .filter((b) => b.pages >= pages)
  }, [genre, pages, books, reading])

  return {
    books: booksFiltered
  }
}