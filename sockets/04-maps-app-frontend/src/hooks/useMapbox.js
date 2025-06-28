import mapboxgl from 'mapbox-gl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Subject } from 'rxjs'
import { v4 as uuid } from 'uuid'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export const useMapbox = (initialPoint) => {
  const markers = useRef({})
  const mapDiv = useRef()
  const map = useRef()

  const [coords, setCoords] = useState(initialPoint)

  const markerMovement$ = useRef(new Subject())
  const newMarker$ = useRef(new Subject())

  const setRef = useCallback((node) => {
    mapDiv.current = node
  }, [])

  const addMarker = useCallback((ev, id) => {
    const { lng, lat } = ev.lngLat || ev

    const marker = new mapboxgl.Marker()
    marker.id = id ?? uuid()

    marker
      .setLngLat([lng, lat])
      .addTo(map.current)
      .setDraggable(true)

    markers.current[marker.id] = marker

    if (!id) {
      newMarker$.current.next({
        id: marker.id,
        lng,
        lat
      })
    }

    marker.on('drag', (event) => {
      const { id } = event.target
      const { lng, lat } = event.target.getLngLat()

      markerMovement$.current.next({
        id,
        lng,
        lat
      })
    })
  }, [])

  const updatePosition = useCallback(({ id, lng, lat }) => {
    markers.current[id].setLngLat([lng, lat])
  }, [])

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialPoint.lng, initialPoint.lat],
      zoom: initialPoint.zoom || 15
    })

    map.current = newMap
  }, [initialPoint])

  useEffect(() => {
    map.current?.on('move', () => {
      const { lng, lat } = map.current.getCenter()

      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.current.getZoom().toFixed(2)
      })
    })
  }, [])

  useEffect(() => {
    map.current?.on('click', addMarker)

    return () => {
      map.current?.off('click', addMarker)
    }
  }, [addMarker])

  return {
    addMarker,
    updatePosition,
    setRef,
    coords,
    markers,
    newMarker$: newMarker$.current,
    markerMovement$: markerMovement$.current,
  }
}
