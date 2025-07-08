import type { CSSProperties, ReactNode } from 'react'
import { ProductContext } from '../context/ProductContext'
import useProduct from '../hooks/useProduct'
import type { Product, onChangeArgs } from '../interfaces/interfaces'

import styles from '../styles/styles.module.css'

export interface Props {
  product: Product
  children?: ReactNode | ReactNode[]
  className?: string
  style?: CSSProperties
  onChange?: (args: onChangeArgs) => void
  value?: number
}

export default function ProductCard({
  product,
  children,
  className,
  style,
  onChange,
  value
}: Props) {
  const { counter, increaseBy } = useProduct({ onChange, product, value })

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
