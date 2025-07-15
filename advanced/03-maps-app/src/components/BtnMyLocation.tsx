import useMap from '../context/map/useMap'
import usePlaces from '../context/places/usePlaces'

export default function BtnMyLocation() {
  const { isMapReady, map } = useMap()
  const { userLocation } = usePlaces()

  const onClick = () => {
    if (!isMapReady) throw new Error('Mapa no está listo')
    if (!userLocation) throw new Error('No hay ubicación de usuario')

    map?.flyTo({
      zoom: 14,
      center: userLocation
    })
  }

  return (
    <button
      className='btn btn-primary'
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 999
      }}
    >
      Mi Ubicación
    </button>
  )
}
