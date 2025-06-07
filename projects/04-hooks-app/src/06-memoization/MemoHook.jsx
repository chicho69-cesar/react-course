import { useMemo, useState } from 'react'
import { useCounter } from '../hooks'
import { Small } from './Small'

const heavyStuff = (iterationNumber = 100) => {
  for (let i = 1; i <= iterationNumber; i++) {
    console.log('Imprimimos...')
  }

  return `${iterationNumber} iteraciones`
}

export const MemoHook = () => {
  const { counter, increment } = useCounter(4000)
  const [show, setShow] = useState(true)

  const memoizedValue = useMemo(() => {
    return heavyStuff(counter)
  }, [counter])

  // const memoizedValue = heavyStuff(counter)

  return (
    <>
      <h1>
        Memo hook: <Small value={counter} />
      </h1>

      <hr />

      <h4>
        {memoizedValue}
      </h4>

      <hr />

      <div className='d-flex justify-content-start align-items-center gap-2'>
        <button
          className='btn btn-primary'
          onClick={() => increment(1)}
        >
          Incrementar
        </button>

        <button
          className='btn btn-outline-primary'
          onClick={() => setShow(!show)}
        >
          Show/Hide {JSON.stringify(show)}
        </button>
      </div>
    </>
  )
}
