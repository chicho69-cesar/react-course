import { useCounter } from '../hooks'

export const CounterWithCustomHook = () => {
  const { counter, increment, decrement, reset } = useCounter(100)

  return (
    <>
      <h1>
        Counter with Custom Hook: {counter}
      </h1>

      <hr />

      <button
        className='btn btn-primary'
        onClick={() => increment()}
      >
        +1
      </button>

      <button
        className='btn btn-secondary'
        onClick={() => decrement()}
      >
        -1
      </button>

      <button
        className='btn btn-danger'
        onClick={reset}
      >
        Reset
      </button>
    </>
  )
}
