import { useCalendarStore } from '../../hooks/useCalendarStore'
import Swal from 'sweetalert2'

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore()

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (result.isConfirmed) {
      await startDeletingEvent()
    }
  }

  return (
    <button
      aria-label='btn-delete'
      className='btn btn-danger fab-danger'
      onClick={handleDelete}
      style={{
        display: hasEventSelected ? '' : 'none',
      }}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  )
}
