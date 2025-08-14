import { use } from 'react'
import { FavoritesContext } from './favorites-context'

export default function useFavorites() {
  return use(FavoritesContext)
}
