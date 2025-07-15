import type { Map, Marker } from 'mapbox-gl'
import type { MapState } from './MapProvider'

type MapAction =
  | { type: 'SET_MAP', payload: Map }
  | { type: 'SET_MARKERS', payload: Marker[] }

export function mapReducer(state: MapState, action: MapAction): MapState {
  const { payload, type } = action

  switch (type) {
    case 'SET_MAP':
      return {
        ...state,
        isMapReady: true,
        map: payload
      }

    case 'SET_MARKERS':
      return {
        ...state,
        markers: payload
      }

    default:
      return state
  }
}