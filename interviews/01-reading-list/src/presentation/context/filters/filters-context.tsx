import { createContext } from 'react'

interface FiltersContextType {
  genre: string | null
  pages: number

  setGenre: (genre: string | null) => void
  setPages: (pages: number) => void
  onReset: () => void
}

export const FiltersContext = createContext({} as FiltersContextType)
