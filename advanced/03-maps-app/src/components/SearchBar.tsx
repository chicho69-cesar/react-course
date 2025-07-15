import { useRef } from 'react'
import usePlaces from '../context/places/usePlaces'
import SearchResults from './SearchResults'

export default function SearchBar() {
  const { searchPlacesByTerm } = usePlaces()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      const query = e.target.value.trim()
      searchPlacesByTerm(query)
    }, 350)
  }

  return (
    <div className='search-container'>
      <input
        type='text'
        className='form-control'
        placeholder='Buscar lugar...'
        onChange={onQueryChanged}
      />

      <SearchResults />
    </div>
  )
}
