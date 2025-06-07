import { useCallback, useEffect, useState } from 'react'
import { Small } from './Small'
import { ShowIncrement } from './ShowIncrement'

export const CallbackHook = () => {
  const [counter, setCounter] = useState(0)

  // const handleIncrement = (value) => {
  //   setCounter((c) => c + value)
  // }
  
  const handleIncrement = useCallback((value) => {
    setCounter((c) => c + value)
  }, [])

  useEffect(() => {
    handleIncrement(1)
  }, [handleIncrement])

  return (
    <>
      <h1>
        Callback Hook: <Small value={counter} />
      </h1>

      <hr />

      <ShowIncrement increment={handleIncrement} />
    </>
  )
}
