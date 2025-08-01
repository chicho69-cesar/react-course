import { useState } from 'react'

import useMap from '../context/map/useMap'
import usePlaces from '../context/places/usePlaces'
import type { Feature } from '../interfaces/places'
import LoadingPlaces from './LoadingPlaces'

export default function SearchResults() {
  const { places, isLoadingPlaces, userLocation } = usePlaces()
  const { map, getRouteBetweenPoints } = useMap()

  const [activeId, setActiveId] = useState('')

  const onPlaceClicked = (place: Feature) => {
    setActiveId(place.id)
    const [lng, lat] = place.center
    map?.flyTo({
      zoom: 14,
      center: [lng, lat]
    })
  }

  const getRoute = (place: Feature) => {
    if (!userLocation) return
    const [lng, lat] = place.center

    getRouteBetweenPoints(userLocation, [lng, lat])
  }

  if (isLoadingPlaces) {
    return <LoadingPlaces />
  }

  if (places.length === 0) {
    return <></>
  }

  return (
    <ul className='list-group mt-3'>
      {places.map((place) => (
        <li
          key={place.id}
          className={`list-group-item list-group-item-action pointer ${(activeId === place.id) ? 'active' : ''}`}
          onClick={() => onPlaceClicked(place)}
        >
          <h6>
            {place.text_es}
          </h6>

          <p
            style={{
              fontSize: '12px'
            }}
          >
            {place.place_name}
          </p>

          <button
            onClick={() => getRoute(place)}
            className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'} `}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  )
}
