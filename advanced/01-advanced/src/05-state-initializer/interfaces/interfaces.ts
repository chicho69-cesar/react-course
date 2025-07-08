import type { ReactNode } from 'react'

import { type Props as ProductButtonsProps } from '../components/ProductButtons'
import { type Props as ProductCardProps } from '../components/ProductCard'
import { type Props as ProductImageProps } from '../components/ProductImage'
import { type Props as ProductTitleProps } from '../components/ProductTitle'

export interface Product {
  id: string
  title: string
  img?: string
}

export interface ProductContextProps {
  counter: number
  product: Product
  maxCount?: number
  increaseBy: (value: number) => void
}

export interface onChangeArgs {
  product: Product
  count: number
}

export interface ProductInCard extends Product {
  count: number
}

export interface InitialValues {
  count?: number
  maxCount?: number
}

export interface ProductCardHandlers {
  count: number
  isMaxCountReached: boolean
  maxCount?: number
  product: Product

  increaseBy: (value: number) => void
  reset: () => void
}

export interface ProductCardHOCProps {
  ({ product, children, className, style }: ProductCardProps): ReactNode | ReactNode[]
  Title: (props: ProductTitleProps) => ReactNode | ReactNode[]
  Image: (props: ProductImageProps) => ReactNode | ReactNode[]
  Buttons: (props: ProductButtonsProps) => ReactNode | ReactNode[]
}
