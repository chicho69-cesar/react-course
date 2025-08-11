import useReading from '../../context/reading/use-reading'
import styles from './reading.module.css'

export default function ReadingList() {
  const { reading, onRemoveBook } = useReading()

  return (
    <>
      <h2 className={styles.title}>
        Lista de lectura
      </h2>

      <section className={styles.container}>
        {reading.map((book) => (
          <article key={book.ISBN} className={styles.book}>
            <img
              src={book.cover}
              alt={book.title}
              className={styles.image}
            />

            <h3 className={styles['book-title']}>
              {book.title}
            </h3>

            <button className={styles['remove-btn']} onClick={() => onRemoveBook(book.ISBN)}>
              x
            </button>
          </article>
        ))}
      </section>
    </>
  )
}
