import 'react-datepicker/dist/react-datepicker.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import { addHours, differenceInSeconds } from 'date-fns'
import { es } from 'date-fns/locale'
import { useEffect, useMemo, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import Modal from 'react-modal'
import Swal from 'sweetalert2'

import { getEnvVariables } from '../../helpers'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUIStore } from '../../hooks/useUIStore'

registerLocale('es', es)

if (getEnvVariables().VITE_MODE !== 'test') {
  Modal.setAppElement('#root')
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUIStore()
  const { activeEvent, isForUpdate, setIsForUpdate, startSavingEvent, startDeletingEvent } = useCalendarStore()

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  })

  const titleClass = useMemo(() => {
    if (!formSubmitted) return ''

    return formValues.title.length > 0 ? 'is-valid' : 'is-invalid'
  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent })
    }
  }, [activeEvent])

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const handleDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    })
  }

  const handleCloseModal = () => {
    closeDateModal()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormSubmitted(true)

    const difference = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
      return
    }

    if (formValues.title.length <= 0) {
      Swal.fire('Título incorrecto', 'El título es obligatorio', 'error')
      return
    }

    await startSavingEvent(formValues)

    setFormSubmitted(false)
    setIsForUpdate(false)
    closeDateModal()
  }

  const handleDeleteEvent = async () => {
    if (!activeEvent) return

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
      closeDateModal()
    }
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />

      <form className='container' onSubmit={handleSubmit}>
        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>

          <DatePicker
            selected={formValues.start}
            onChange={(event) => handleDateChange(event, 'start')}
            className='form-control'
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>

          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => handleDateChange(event, 'end')}
            className='form-control'
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <hr />

        <div className='form-group mb-2'>
          <label>Titulo y notas</label>

          <input
            type='text'
            className={`form-control ${titleClass}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={formValues.title}
            onChange={handleInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>Una descripción corta</small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={formValues.notes}
            onChange={handleInputChange}
          ></textarea>

          <small id='emailHelp' className='form-text text-muted'>Información adicional</small>
        </div>

        <div className='d-flex justify-content-center align-items-center gap-4 mt-4'>
          <button
            type='submit'
            className='btn btn-outline-primary btn-block'
          >
            <i className='far fa-save'></i>
            <span> Guardar</span>
          </button>
          
          {isForUpdate && (
            <button
              type='button'
              className='btn btn-outline-danger btn-block'
              onClick={handleDeleteEvent}
            >
              <i className='far fa-trash-alt'></i>
              <span> Eliminar</span>
            </button>
          )}
        </div>
      </form>
    </Modal>
  )
}
