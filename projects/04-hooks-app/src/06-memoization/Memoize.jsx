import { useState } from 'react'
import { useCounter } from '../hooks'
import { Small } from './Small'

export const Memoize = () => {
  const { counter, increment } = useCounter(1)
  const [show, setShow] = useState(true)

  return (
    <>
      <h1>
        Counter: <Small value={counter} />
      </h1>

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
