import { createContext } from 'react'
import type { Feature } from '../../interfaces/places'

export interface PlacesContextProps {
  isLoading: boolean
  userLocation?: [number, number]
  isLoadingPlaces: boolean
  places: Feature[]

  searchPlacesByTerm: (query: string) => Promise<Feature[]>
}

export const PlacesContext = createContext({} as PlacesContextProps)
