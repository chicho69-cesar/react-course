import useCounter from "@/hooks/use-counter"
import usePokemon from "@/hooks/use-pokemon"

export default function PokemonPage() {
  const { count, decrement, increment } = useCounter(1)
  const { pokemon, isLoading, formattedId } = usePokemon({ id: count })

  if (isLoading) {
    return (
      <div className="bg-gradient flex flex-col items-center">
        <h1 className="text-2xl font-thin text-white">Pokémon</h1>
        <h3 className="text-xl font-bold text-white">Cargando...</h3>
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="bg-gradient flex flex-col items-center">
        <h1 className="text-2xl font-thin text-white">Pokémon</h1>
        <h3 className="text-xl font-bold text-white">Pokémon no encontrado</h3>
      </div>
    )
  }

  return (
    <div className="bg-gradient flex flex-col items-center">
      <h2 className="text-2xl font-thin text-white">
        Pokémon
      </h2>

      <h3 className="text-2xl font-thin text-white">
        #{formattedId} - {pokemon.name}
      </h3>

      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`}
        alt={pokemon.name}
      />

      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={decrement}
          disabled={count <= 1}
        >
          Anterior
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={increment}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
