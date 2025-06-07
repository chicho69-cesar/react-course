import { useEffect, useState } from 'react'

export const Coords = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = ({ x, y }) => {
      setCoords({ x, y })
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <h1>
        Coordinates: {coords.x}, {coords.y}
      </h1>
    </>
  )
}
