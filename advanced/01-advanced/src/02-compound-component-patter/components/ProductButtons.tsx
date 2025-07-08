import useProductContext from '../context/useProductContext'
import styles from '../styles/styles.module.css'

export default function ProductButtons() {
  const { counter, increaseBy } = useProductContext()

  return (
    <div className={styles.buttonsContainer}>
      <button
        className={styles.buttonMinus}
        onClick={() => increaseBy(-1)}
      > - </button>

      <div className={styles.countLabel}>
        {' '}{counter}{' '}
      </div>

      <button
        className={styles.buttonAdd}
        onClick={() => increaseBy(+1)}
      > + </button>
    </div>
  )
}
