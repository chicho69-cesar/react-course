/* eslint-disable no-undef */
import { renderHook, waitFor } from '@testing-library/react'
import { useFetchGifts } from '../../src/hooks/use-fetch-gifts'

describe('Test on hook useFetchGifts', () => {
  test('should return the initial state', () => {
    /* La función render hook es una función que nos ayuda a
    ejecutar nuestros custom hooks como se llamaran dentro de un
    componente/hook */
    const { result } = renderHook(() => useFetchGifts('Dragon Ball'))
    /* Destructuramos del resultado las variables que regresa nuestro custom
    hook, en este caso un objeto con dos valores */
    const { gifts, isLoading } = result.current

    expect(gifts).toEqual([])
    expect(gifts.length).toBe(0)
    expect(isLoading).toBeTruthy()
  })

  test('should return an array of gifts and isLoading as false', async () => {
    const { result } = renderHook(() => useFetchGifts('Dragon Ball'))

    /* Cuando dentro de nuestro custom hook se hacen procesos como efectos
    que realizan peticiones asíncronas u otro tipo de operaciones,
    podemos hacer un waitFor para esperar a que dichas operaciones se realicen
    y poder hacer testing del resultado */
    await waitFor(() => {
      return expect(result.current.gifts.length).toBeGreaterThan(0)
    })

    const { gifts, isLoading } = result.current

    expect(gifts.length).toBeGreaterThan(0)
    expect(isLoading).toBeFalsy()
  })
})
