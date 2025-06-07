import { useCallback, useState } from 'react'
import { MemoSon } from './MemoSon'

const NUMBERS = [1, 2, 3, 4, 5]

export const MemoFather = () => {
  const [value, setValue] = useState(0)

  const increment = useCallback((num) => {
    setValue((v) => v + num)
  }, [])

  return (
    <div>
      <h1>
        MemoFather
      </h1>

      <p>
        Total: <strong>{value}</strong>
      </p>

      <hr />

      <section>
        {NUMBERS.map((num) => (
          <MemoSon
            key={num}
            number={num}
            increment={increment}
          />
        ))}
      </section>
    </div>
  )
}
