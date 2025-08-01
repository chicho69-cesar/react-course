import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
    isForUpdate: false,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
    onSetIsForUpdate: (state, { payload }) => {
      state.isForUpdate = payload
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload)
      state.activeEvent = null
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload
        }

        return event
      })
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event.id !== state.activeEvent.id)
        state.activeEvent = null
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false

      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id)

        if (!exists) {
          state.events.push(event)
        }
      })
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true
      state.events = []
      state.activeEvent = null
      state.isForUpdate = false
    }
  }
})

export const {
  onSetActiveEvent,
  onSetIsForUpdate,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar
} = calendarSlice.actions
