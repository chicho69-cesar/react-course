import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import calendarApi from '../api/calendarApi'
import { convertEventsToDateEvents } from '../helpers'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onSetIsForUpdate, onUpdateEvent } from '../store/calendar/calendarSlice'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent, isForUpdate } = useSelector((state) => state.calendar)
  const { user } = useSelector((state) => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }
  
  const setIsForUpdate = (isForUpdate) => {
    dispatch(onSetIsForUpdate(isForUpdate))
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDateEvents(data.events)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.error('Error loading events:', error)
      Swal.fire('Error al cargar eventos', 'Hubo un error al cargar los eventos', 'error')
    }
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))

        return
      }

      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
    } catch (error) {
      console.error('Error saving event:', error)
      Swal.fire('Error al guardar', 'Hubo un error al guardar el evento', 'error')
    }
  }

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
    } catch (error) {
      console.error('Error deleting event:', error)
      Swal.fire('Error al eliminar', 'Hubo un error al eliminar el evento', 'error')
    }
  }

  return {
    events,
    activeEvent,
    isForUpdate,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    setIsForUpdate,
    startLoadingEvents,
    startSavingEvent,
    startDeletingEvent
  }
}
