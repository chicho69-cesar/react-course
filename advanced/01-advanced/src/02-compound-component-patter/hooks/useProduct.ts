import { useState } from 'react'

export default function useProduct() {
  const [counter, setCounter] = useState(0)

  const increaseBy = (value: number) => {
    setCounter((current) => Math.max(current + value, 0))
  }

  return {
    counter,
    increaseBy,
  }
}
