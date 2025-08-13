import { useRef, useState } from "react"
import type { Gif } from "../interfaces/gif.interface"
import { getGifsByQuery } from "../actions/get-gifs-by-query.action"

export default function useGifs() {
  const [gifs, setGifs] = useState<Gif[]>([])
  const [previousTerms, setPreviosTerms] = useState<string[]>([])

  const gifsCache = useRef<Record<string, Gif[]>>({})

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term])
      return
    }

    const gifs = await getGifsByQuery(term)
    setGifs(gifs)
    gifsCache.current[term] = gifs
  }

  const handleSearch = async (query: string) => {
    const trimmedQuery = query.trim().toLowerCase()

    if (trimmedQuery.length === 0) return
    if (previousTerms.includes(trimmedQuery)) return

    setPreviosTerms([trimmedQuery, ...previousTerms].slice(0, 8))

    const gifs = await getGifsByQuery(trimmedQuery)
    setGifs(gifs)
    gifsCache.current[trimmedQuery] = gifs
  }

  return {
    gifs,
    previousTerms,

    handleTermClicked,
    handleSearch,
  }
}
