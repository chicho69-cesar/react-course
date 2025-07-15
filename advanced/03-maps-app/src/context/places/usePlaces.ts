import { useContext } from 'react'
import { PlacesContext } from './PlacesContext'

export default function usePlaces() {
  return useContext(PlacesContext)
}
