import { useContext } from 'react'
import { ProductContext } from './ProductContext'

export default function useProductContext() {
  return useContext(ProductContext)
}
