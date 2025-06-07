/* eslint-disable no-undef */
import { renderHook, waitFor } from '@testing-library/react'
import { useFetchGifts } from '../../src/hooks/use-fetch-gifts'

describe('Test on hook useFetchGifts', () => {
  test('should return the initial state', () => {
    const { result } = renderHook(() => useFetchGifts('Dragon Ball'))
    const { gifts, isLoading } = result.current

    expect(gifts).toEqual([])
    expect(gifts.length).toBe(0)
    expect(isLoading).toBeTruthy()
  })

  test('should return an array of gifts and isLoading as false', async () => {
    const { result } = renderHook(() => useFetchGifts('Dragon Ball'))

    await waitFor(() => {
      return expect(result.current.gifts.length).toBeGreaterThan(0)
    })

    const { gifts, isLoading } = result.current

    expect(gifts.length).toBeGreaterThan(0)
    expect(isLoading).toBeFalsy()
  })
})
