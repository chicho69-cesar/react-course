import type { CSSProperties } from 'react'
import useProductContext from '../context/useProductContext'
import styles from '../styles/styles.module.css'

export interface Props {
  title?: string
  className?: string
  style?: CSSProperties
}

export default function ProductTitle({ title, className, style }: Props) {
  const { product } = useProductContext()

  return (
    <span
      className={`${styles.productDescription} ${className}`}
      style={style}
    >
      {title ? title : product.title}
    </span>
  )
}
