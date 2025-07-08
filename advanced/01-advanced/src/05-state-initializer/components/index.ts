import type { ProductCardHOCProps } from '../interfaces/interfaces'
import { default as ProductCardHOC } from './ProductCard'

import ProductButtons from './ProductButtons'
import ProductImage from './ProductImage'
import ProductTitle from './ProductTitle'

export { default as ProductButtons } from './ProductButtons'
export { default as ProductImage } from './ProductImage'
export { default as ProductTitle } from './ProductTitle'

export const ProductCard: ProductCardHOCProps = Object.assign(
  ProductCardHOC,
  {
    Image: ProductImage,
    Title: ProductTitle,
    Buttons: ProductButtons,
  }
)

export default ProductCard
