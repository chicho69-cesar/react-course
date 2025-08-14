import type { Hero } from "@/heroes/types/hero.interface"
import { useEffect, useState, type PropsWithChildren } from "react"
import { FavoritesContext } from "./favorites-context"

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem("favorites")
  return favorites ? JSON.parse(favorites) : []
}

export default function FavoritesProvider({ children }: PropsWithChildren) {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage()
  )

  const toggleFavorite = (hero: Hero) => {
    const heroExists = favorites.find((h) => h.id === hero.id)

    if (heroExists) {
      const newFavorites = favorites.filter((h) => h.id !== hero.id)
      setFavorites(newFavorites)
      return
    }

    setFavorites((prev) => [...prev, hero])
  }

  const isFavorite = (hero: Hero) => {
    return favorites.some((h) => h.id === hero.id)
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  return (
    <FavoritesContext
      value={{
        favorites,
        favoriteCount: favorites.length,

        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext>
  )
}
