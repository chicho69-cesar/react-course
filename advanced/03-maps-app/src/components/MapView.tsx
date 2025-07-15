import { Map } from 'mapbox-gl'
import { useLayoutEffect, useRef } from 'react'

import useMap from '../context/map/useMap'
import usePlaces from '../context/places/usePlaces'
import Loading from './Loading'

export default function MapView() {
  const { isLoading, userLocation } = usePlaces()
  const { setMap } = useMap()

  const mapDiv = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/light-v10',
        center: userLocation,
        zoom: 14
      })

      setMap(map)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  if (isLoading) {
    return (<Loading />)
  }

  return (
    <div ref={mapDiv}
      style={{
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100vw',
      }}
    >
      {userLocation?.join(',')}
    </div>
  )
}
