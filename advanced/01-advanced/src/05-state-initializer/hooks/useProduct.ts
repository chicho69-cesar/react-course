import { useEffect, useRef, useState } from 'react'
import type { InitialValues, onChangeArgs, Product } from '../interfaces/interfaces'

interface useProductArgs {
  product: Product
  onChange?: (args: onChangeArgs) => void
  value?: number
  initialValues?: InitialValues
}

export default function useProduct({ product, onChange, value = 0, initialValues }: useProductArgs) {
  const [counter, setCounter] = useState<number>(initialValues?.count || value)
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) return
    setCounter(value)
  }, [value])

  useEffect(() => {
    isMounted.current = true
  }, [])

  const increaseBy = (value: number) => {
    let newValue = Math.max(counter + value, 0)

    if (initialValues?.maxCount) {
      newValue = Math.min(newValue, initialValues.maxCount)
    }

    setCounter(newValue)

    if (onChange) {
      onChange({ count: newValue, product })
    }
  }

  const reset = () => {
    setCounter(initialValues?.count || value)
  }

  return {
    counter,
    isMaxCountReached: !!initialValues?.maxCount && counter === initialValues.maxCount,
    maxCount: initialValues?.maxCount,
    increaseBy,
    reset,
  }
}
