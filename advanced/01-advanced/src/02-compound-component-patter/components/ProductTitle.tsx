import useProductContext from '../context/useProductContext'
import styles from '../styles/styles.module.css'

export default function ProductTitle({ title }: { title?: string }) {
  const { product } = useProductContext()

  return (
    <span className={styles.productDescription}>
      {title ? title : product.title}
    </span>
  )
}
