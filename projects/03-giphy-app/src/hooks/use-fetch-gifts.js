import { useEffect, useState } from 'react'
import { getGifts as getItems } from '../helpers/get-gifts'

export const useFetchGifts = (category) => {
  const [gifts, setGifts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // const abortController = new AbortController()
    // const { signal } = abortController

    const getGifts = async () => {
      // const data = await getItems(category, signal)
      const data = await getItems(category)

      setGifts(data)
      setIsLoading(false)
    }

    getGifts()

    // return () => {
    //   abortController.abort()
    // }
  }, [category])

  /* const getGifts = useCallback(async () => {
    const data = await getItems(category)

    setGifts(data)
    setIsLoading(false)
  }, [category])

  useEffect(() => {
    getGifts()
  }, [getGifts]) */

  return {
    gifts,
    isLoading
  }
}