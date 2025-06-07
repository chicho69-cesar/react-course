/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null
  })

  const fetchData = async () => {
    setState({
      ...state,
      isLoading: true,
    })

    try {
      const resp = await fetch(url)
      const data = await resp.json()

      setState({
        data,
        isLoading: false,
        hasError: null
      })
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        hasError: error.message
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    refetch: fetchData
  }
}
