import { useState } from "react"

export default function useCounter(initialValue: number = 1) {
  const [count, setCount] = useState(initialValue)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count <= 1) return
    setCount(count - 1)
  }

  return {
    count,
    increment,
    decrement,
  }
}
