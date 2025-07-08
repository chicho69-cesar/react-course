import { useState } from 'react'
import { type Product, type ProductInCard } from '../interfaces/interfaces'

export default function useShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState<{
    [key: string]: ProductInCard
  }>({})

  const onProductCountChange = ({ product, count }: { product: Product, count: number }) => {
    setShoppingCart((current) => {
      if (count === 0) {
        return Object.fromEntries(
          Object.entries(current).filter(([key]) => key !== product.id)
        )
      }

      return {
        ...current,
        [product.id]: { ...product, count }
      }
    })
  }

  return {
    shoppingCart,
    onProductCountChange
  }
}
