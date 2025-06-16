import { useState } from 'react'

export const useCounter = (initialValue = 10) => {
  const [counter, setCounter] = useState(initialValue)

  const increment = (value = 1) => {
    // setCounter(counter + value) // <- No funciona bien en los tests
    setCounter((prevCounter) => prevCounter + value)
  }

  const decrement = (value = 1) => {
    // setCounter(counter - value) // <- No funciona bien en los tests
    setCounter((prevCounter) => prevCounter - value)
  }

  const reset = () => {
    setCounter(initialValue)
  }

  return {
    counter,
    increment,
    decrement,
    reset
  }
}
