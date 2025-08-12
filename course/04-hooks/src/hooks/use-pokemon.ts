import { useEffect, useState } from "react"

interface Pokemon {
  id: number
  name: string
  imageUrl: string
}

interface UsePokemonProps {
  id: number
}

export default function usePokemon({ id }: UsePokemonProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getPokemonById = async (pokemonId: number) => {
    setIsLoading(true)

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      const data = await response.json()

      setPokemon({
        id: pokemonId,
        name: data.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
      })
    } catch (error) {
      console.error("Error fetching Pokémon:", error)
      setPokemon(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPokemonById(id)
  }, [id])

  return {
    pokemon,
    isLoading,
    formattedId: id.toString().padStart(3, '0'),
  }
}