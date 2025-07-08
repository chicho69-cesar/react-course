import type { CSSProperties, ReactNode } from 'react'
import { ProductContext } from '../context/ProductContext'
import useProduct from '../hooks/useProduct'
import type { InitialValues, Product, ProductCardHandlers, onChangeArgs } from '../interfaces/interfaces'

import styles from '../styles/styles.module.css'

export interface Props {
  product: Product
  className?: string
  style?: CSSProperties
  value?: number
  initialValues?: InitialValues
  // children?: ReactNode | ReactNode[]
  children: (args: ProductCardHandlers) => ReactNode | ReactNode[]
  onChange?: (args: onChangeArgs) => void
}

export default function ProductCard({
  product,
  className,
  style,
  value,
  initialValues,
  children,
  onChange,
}: Props) {
  const { counter, increaseBy, maxCount, isMaxCountReached, reset } = useProduct({ onChange, product, value, initialValues })

  return (
    <ProductContext.Provider
      value={{
        counter,
        increaseBy,
        product,
        maxCount,
      }}
    >
      <div
        className={`${styles.productCard} ${className}`}
        style={style}
      >
        {children({
          count: counter,
          isMaxCountReached,
          maxCount: initialValues?.maxCount,
          product, 
          reset,
          increaseBy,
        })}
      </div>
    </ProductContext.Provider>
  )
}
