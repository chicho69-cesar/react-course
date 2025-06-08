import { pokeApi } from '../../../api/pokemonApi'
import { setPokemons, startLoadingPokemons } from './pokemonSlice'

export const getPokemons = (page = 0) => {
  return async (dispatch, getState) => {
    console.log('getPokemons called', getState())

    dispatch(startLoadingPokemons())

    // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`)
    // const data = await resp.json()

    const { data } = await pokeApi.get(`/pokemon?limit=10&offset=${page * 10}`)

    dispatch(setPokemons({
      pokemons: data.results,
      page: page + 1
    }))
  }
}
