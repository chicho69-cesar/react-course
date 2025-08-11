import styles from './library.module.css'

import useReading from '../../context/reading/use-reading'
import useBooks from '../../hooks/use-books'
import Book from '../book/book'
import Filters from '../filters/filters'
import ReadingList from '../reading/reading'

export default function Library() {
  const { reading, onAddBook } = useReading()
  const { books } = useBooks()

  return (
    <div className={styles.main}>
      <header>
        <h1>
          Library
        </h1>
      </header>

      <main className={styles.container}>
        <section className={styles['book-container']}>
          <h2>
            {books.length} libros disponibles
          </h2>

          <p>
            {reading.length} en la lista de lectura
          </p>

          <Filters />

          <div className={styles['book-grid']}>
            {books.map((book) => (
              <Book
                key={book.ISBN}
                book={book}
                onAddBook={onAddBook}
              />
            ))}
          </div>
        </section>

        <aside className={styles['reading-container']}>
          <ReadingList />
        </aside>
      </main>
    </div>
  )
}
