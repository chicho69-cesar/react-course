import { LngLatBounds, Marker, Popup, type Map, type AnySourceData } from 'mapbox-gl'
import { useEffect, useReducer } from 'react'

import directionsApi from '../../api/directions-api'
import type { DirectionsResponse } from '../../interfaces/directions'
import usePlaces from '../places/usePlaces'
import { MapContext } from './MapContext'
import { mapReducer } from './mapReducer'

export interface MapState {
  isMapReady: boolean
  map?: Map
  markers: Marker[]
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: []
}

interface MapProviderProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function MapProvider({ children }: MapProviderProps) {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)
  const { places } = usePlaces()

  useEffect(() => {
    state.markers.forEach(marker => marker.remove())
    const newMarkers: Marker[] = []

    for (const place of places) {
      const [lng, lat] = place.center
      const popup = new Popup()
        .setHTML(`
          <h6>${place.text_es}</h6>
          <p>${place.place_name_es}</p>
        `)

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!)

      newMarkers.push(newMarker)
    }

    dispatch({ type: 'SET_MARKERS', payload: newMarkers })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places])


  const setMap = (map: Map) => {
    const myLocationPopup = new Popup()
      .setHTML(`
          <h4>Aquí estoy</h4>
          <p>En algún lugar del mundo</p>
        `)

    new Marker({
      color: '#61DAFB'
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map)

    dispatch({ type: 'SET_MAP', payload: map })
  }

  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')}${end.join(',')}`)
    const { distance, duration, geometry } = resp.data.routes[0]
    const { coordinates: coords } = geometry

    let kms = distance / 1000
    kms = Math.round(kms * 100)
    kms /= 100

    const minutes = Math.floor(duration / 60)
    console.log({ kms, minutes })

    const bounds = new LngLatBounds(
      start,
      start
    )

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    state.map?.fitBounds(bounds, {
      padding: 200
    })

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }

    state.map?.addSource('RouteString', sourceData)

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    })
  }

  return (
    <MapContext.Provider
      value={{
        ...state,

        setMap,
        getRouteBetweenPoints
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
