import type { CSSProperties } from 'react'
import useProductContext from '../context/useProductContext'
import styles from '../styles/styles.module.css'

export interface Props {
  className?: string
  style?: CSSProperties
}

export default function ProductButtons({ className, style }: Props) {
  const { counter, increaseBy } = useProductContext()

  return (
    <div
      className={`${styles.buttonsContainer} ${className}`}
      style={style}
    >
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
