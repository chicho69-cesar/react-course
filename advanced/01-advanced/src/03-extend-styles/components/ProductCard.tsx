import type { CSSProperties, ReactNode } from 'react'
import { ProductContext } from '../context/ProductContext'
import useProduct from '../hooks/useProduct'
import type { Product } from '../interfaces/interfaces'

import styles from '../styles/styles.module.css'

export interface Props {
  product: Product
  children?: ReactNode | ReactNode[]
  className?: string
  style?: CSSProperties
}

export default function ProductCard({ product, children, className, style }: Props) {
  const { counter, increaseBy } = useProduct()

  return (
    <ProductContext.Provider
      value={{
        counter,
        increaseBy,
        product,
      }}
    >
      <div
        className={`${styles.productCard} ${className}`}
        style={style}
      >
        {children}
      </div>
    </ProductContext.Provider>
  )
}
