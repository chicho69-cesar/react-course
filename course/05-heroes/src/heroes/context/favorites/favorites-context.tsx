import type { Hero } from "@/heroes/types/hero.interface"
import { createContext } from "react"

interface FavoritesContextType {
  // State
  favorites: Hero[]
  favoriteCount: number

  // Methods
  isFavorite: (hero: Hero) => boolean
  toggleFavorite: (hero: Hero) => void
}

export const FavoritesContext = createContext({} as FavoritesContextType)
