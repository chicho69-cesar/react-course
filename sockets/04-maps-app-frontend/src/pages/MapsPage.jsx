import { useEffect } from 'react'
import { useSocket } from '../context/sockets/useSocket'
import { useMapbox } from '../hooks/useMapbox'

const initialPoint = {
  lng: -74.0060,
  lat: 40.7128,
  zoom: 12
}

export default function MapsPage() {
  const {
    addMarker,
    updatePosition,
    setRef,
    coords,
    newMarker$,
    markerMovement$
  } = useMapbox(initialPoint)

  const { socket } = useSocket()

  useEffect(() => {
    socket.on('active-markers', (activeMarkers) => {
      for (const key of Object.keys(activeMarkers)) {
        addMarker(activeMarkers[key], key)
      }
    })
  }, [socket, addMarker])

  // Nuevo marcador
  useEffect(() => {
    newMarker$.subscribe((marker) => {
      socket.emit('add-marker', marker);
    });
  }, [newMarker$, socket]);

  // Movimiento de Marcador
  useEffect(() => {
    markerMovement$.subscribe((marker) => {
      socket.emit('update-marker', marker);
    });
  }, [socket, markerMovement$]);

  // Mover marcador mediante sockets
  useEffect(() => {
    socket.on('update-marker', (marker) => {
      updatePosition(marker);
    })
  }, [socket, updatePosition])

  // Escuchar nuevos marcadores
  useEffect(() => {
    socket.on('add-marker', (marker) => {
      addMarker(marker, marker.id);
    });
  }, [socket, addMarker])

  return (
    <>
      <div className='info'>
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>

      <div
        ref={setRef}
        className='mapContainer'
      />
    </>
  )
}
