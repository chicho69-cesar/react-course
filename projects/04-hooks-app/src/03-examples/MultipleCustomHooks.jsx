import { useCounter, useFetch } from '../hooks'
import { LoadingMessage } from './LoadingMessage'
import { LoadingQuote } from './LoadingQuote'
import { PokemonCard } from './PokemonCard'
import { Quote } from './Quote'

export const MultipleCustomHooks = () => {
  const { counter, decrement, increment } = useCounter(1)
  const { data, isLoading, hasError } = useFetch(`https://pokeapi.co/api/v2/pokemon/${counter}`)

  return (
    <>
      <h1>
        PokeApi <small>Pokemon: {counter}</small>
      </h1>

      <hr />

      {isLoading && !hasError ? (
        <LoadingMessage />
      ) : !isLoading && hasError ? (
        <div className="alert alert-danger text-center">
          {hasError}
        </div>
      ) : (
        <PokemonCard
          id={counter}
          name={data.name}
          sprites={[
            data.sprites.front_default,
            data.sprites.front_shiny,
            data.sprites.back_default,
            data.sprites.back_shiny,
          ]}
        />
      )}

      <div className='d-flex justify-content-start mt-3 align-items-center gap-2'>
        <button
          className="btn btn-secondary"
          onClick={() => decrement()}
          disabled={isLoading || counter === 1}
        >
          Previous Quote
        </button>

        <button
          className="btn btn-primary"
          onClick={() => increment()}
          disabled={isLoading}
        >
          Next Quote
        </button>
      </div>
    </>
  )
}
