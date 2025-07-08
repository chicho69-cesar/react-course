import type { CSSProperties } from 'react'
import useProductContext from '../context/useProductContext'
import styles from '../styles/styles.module.css'

import noImage from '../../../public/no-image.jpg'

export interface Props {
  img?: string
  className?: string
  style?: CSSProperties
}

export default function ProductImage({ img = '', className, style }: Props) {
  const { product } = useProductContext()

  const imageToShow = img
    ? img
    : product.img
      ? product.img
      : noImage

  return (
    <img
      className={`${styles.productImg} ${className}`}
      style={style}
      src={imageToShow}
      alt='Product'
    />
  )
}
