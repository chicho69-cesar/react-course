import { useContext } from 'react'
import { FiltersContext } from './filters-context'

export default function useFilters() {
  return useContext(FiltersContext)
}
