import { useState } from "react"

export default function useCounter(initialValue: number = 0) {
  const [counter, setCounter] = useState(initialValue)

  const handleAdd = () => {
    setCounter((prev) => prev + 1)
  }

  const handleSubtract = () => {
    setCounter((prev) => prev - 1)
  }

  const handleReset = () => {
    setCounter(initialValue)
  }

  return {
    counter,
    handleAdd,
    handleSubtract,
    handleReset,
  }
}
