import { ProductContext } from '../context/ProductContext'
import useProduct from '../hooks/useProduct'
import type { ProductCardProps } from '../interfaces/interfaces'

import styles from '../styles/styles.module.css'

export default function ProductCard({ product, children }: ProductCardProps) {
  const { counter, increaseBy } = useProduct()

  return (
    <ProductContext.Provider
      value={{
        counter,
        increaseBy,
        product,
      }}
    >
      <div className={styles.productCard}>
        {children}
      </div>
    </ProductContext.Provider>
  )
}
