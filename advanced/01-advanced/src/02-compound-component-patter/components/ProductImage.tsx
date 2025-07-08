import useProductContext from '../context/useProductContext'
import styles from '../styles/styles.module.css'

import noImage from '../../../public/no-image.jpg'

export default function ProductImage({ img = '' }: { img?: string }) {
  const { product } = useProductContext()

  const imageToShow = img
    ? img
    : product.img
      ? product.img
      : noImage

  return (
    <img
      className={styles.productImg}
      src={imageToShow}
      alt='Product'
    />
  )
}
