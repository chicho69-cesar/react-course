import { useEffect, useState } from "react"
import useDebounce from "../hooks/use-debounce"

interface SearchBarProps {
  placeholder?: string
  onQuery: (query: string) => void
}

export default function SearchBar({ onQuery, placeholder = 'Buscar' }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    onQuery(debouncedQuery)
  }, [debouncedQuery, onQuery])

  const handleSearch = () => {
    onQuery(query)
    setQuery("")
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch}>
        Buscar
      </button>
    </div>
  )
}
