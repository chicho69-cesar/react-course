import { ImageList, ImageListItem, Typography } from '@mui/material'

export const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 2 }}>
        No hay imágenes disponibles.
      </Typography>
    )
  }

  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='Imagen de la nota'
            loading='lazy'
            decoding='async'
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
