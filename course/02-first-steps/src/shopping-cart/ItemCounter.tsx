import { useState } from 'react'
import styles from './ItemCounter.module.css'

interface ItemCounterProps {
  name: string
  quantity?: number
}

export default function ItemCounter({ name, quantity }: ItemCounterProps) {
  const [count, setCount] = useState(quantity || 0)

  const handleAdd = () => {
    setCount((c) => c + 1)
  }

  const handleSubtract = () => {
    if (count === 0) return
    setCount((c) => c - 1)
  }

  return (
    <section
      // style={{
      //   display: 'flex',
      //   alignItems: 'center',
      //   gap: 10,
      //   marginTop: 10,
      // }}
      className={styles.itemRow}
    >
      <span
        className={styles['item-text']}
        style={{
          color: quantity === 0 ? 'red' : 'black',
        }}
      >
        {name}
      </span>

      <button onClick={handleAdd}>+1</button>
      <span>{count}</span>
      <button onClick={handleSubtract}>-1</button>
    </section>
  )
}
