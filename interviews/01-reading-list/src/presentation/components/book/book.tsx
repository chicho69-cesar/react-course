import type { Book } from '../../../domain/entities/book.entity'
import styles from './book.module.css'

interface BookProps {
  book: Book
  onAddBook: (book: Book) => void
}

export default function Book({ book, onAddBook }: BookProps) {
  return (
    <article key={book.ISBN} className={styles.book}>
      <div>
        <img
          src={book.cover}
          alt={book.title}
          className={styles.image}
        />
        
        <h3 className={styles.title}>
          {book.title}
        </h3>
  
        <p className={styles.text}>
          {book.synopsis}
        </p>
  
        <p>
          {book.author.name} - {book.year}
        </p>
  
        <p>
          {book.pages} paginas
        </p>
      </div>

      <button onClick={() => onAddBook(book)} className={styles.button}>
        Agregar
      </button>
    </article>
  )
}
