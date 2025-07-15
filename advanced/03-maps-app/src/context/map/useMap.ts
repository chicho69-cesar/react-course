import { useContext } from 'react'
import { MapContext } from './MapContext'

export default function useMap() {
  return useContext(MapContext)
}
