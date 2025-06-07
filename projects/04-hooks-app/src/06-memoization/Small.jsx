import { memo } from 'react'

export const Small = memo(({ value }) => {
  console.log('Me volví a generar :(, Small')

  return (
    <small>{value}</small>
  )
})
