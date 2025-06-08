import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getPokemons } from './store/slices/pokemon'

export default function PokemonApp() {
  const { isLoading, pokemons = [], page } = useSelector((state) => state.pokemons)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch])

  return (
    <>
      <h1>
        Pokemon App
      </h1>

      <hr />

      {isLoading && (<span>Loading...</span>)}

      <ul>
        {pokemons.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button
        disabled={isLoading}
        onClick={() => dispatch(getPokemons(page))}
      >
        Load more
      </button>
    </>
  )
}
