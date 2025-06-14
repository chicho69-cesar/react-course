import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../'
import { getMessagesES, localizer } from '../../helpers'
import { useAuthStore, useCalendarStore, useUIStore } from '../../hooks'

export const CalendarPage = () => {
  const { user } = useAuthStore()
  const { openDateModal } = useUIStore()
  const { events, setActiveEvent, setIsForUpdate, startLoadingEvents } = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  useEffect(() => {
    startLoadingEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line no-unused-vars
  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style,
    }
  }

  const handleDoubleClick = () => {
    openDateModal()
  }

  const handleSelect = (event) => {
    setActiveEvent(event)
    setIsForUpdate(true)
    openDateModal()
  }

  const handleViewChange = (view) => {
    setLastView(view)
    localStorage.setItem('lastView', view)
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={handleDoubleClick}
        onSelectEvent={handleSelect}
        onView={handleViewChange}
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  )
}
