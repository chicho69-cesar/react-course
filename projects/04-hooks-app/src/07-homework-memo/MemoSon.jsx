import { memo } from 'react'

export const MemoSon = memo(({ number, increment }) => {
  console.log('Me volví a generar :(, ShowIncrement')

  return (
    <button
      className='btn btn-primary'
      onClick={() => {
        increment(number)
      }}
    >
      {number}
    </button>
  )
})
