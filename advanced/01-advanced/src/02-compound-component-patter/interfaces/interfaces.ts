import type { ReactNode } from 'react'

export interface ProductCardProps {
  product: Product
  children?: ReactNode | ReactNode[]
}

export interface Product {
  id: string
  title: string
  img?: string
}

export interface ProductContextProps {
  counter: number
  increaseBy: (value: number) => void
  product: Product
}

export interface ProductCardHOCProps {
  ({ product, children }: ProductCardProps): ReactNode | ReactNode[]
  Title: ({ title }: { title?: string }) => ReactNode | ReactNode[]
  Image: ({ img }: { img?: string }) => ReactNode | ReactNode[]
  Buttons: () => ReactNode | ReactNode[]
}
