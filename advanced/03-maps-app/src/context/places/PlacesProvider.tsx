import { useEffect, useReducer } from 'react'

import searchApi from '../../api/search-api'
import { getUserLocation } from '../../helpers/get-user-location'
import type { Feature, PlacesResponse } from '../../interfaces/places'
import { PlacesContext } from './PlacesContext'
import { placesReducer } from './placesReducer'

export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number]
  isLoadingPlaces: boolean
  places: Feature[]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
}

interface PlacesProviderProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function PlacesProvider({ children }: PlacesProviderProps) {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

  useEffect(() => {
    getUserLocation()
      .then(lngLat => dispatch({ type: 'SET_USER_LOCATION', payload: lngLat }))
  }, [])

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: 'SET_PLACES', payload: [] })
      return []
    }
    
    if (!state.userLocation) throw new Error('No hay ubicación del usuario')

    dispatch({ type: 'SET_LOADING_PLACES' })

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    })

    dispatch({ type: 'SET_PLACES', payload: resp.data.features })
    return resp.data.features
  }

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}
