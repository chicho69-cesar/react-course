import { useContext } from 'react'
import { ReadingContext } from './reading-context'

export default function useReading() {
  return useContext(ReadingContext)
}
