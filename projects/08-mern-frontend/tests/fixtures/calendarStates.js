export const events = [
  {
    id: '1',
    start: new Date('2025-06-21 13:00:00'),
    end: new Date('2025-06-21 15:00:00'),
    title: 'Cumpleaños de Cesar',
    notes: 'Alguna nota'
  },
  {
    id: '2',
    start: new Date('2025-06-29 13:00:00'),
    end: new Date('2025-06-29 15:00:00'),
    title: 'Cumpleaños de Fer',
    notes: 'Alguna nota de Fer'
  },
]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
  isForUpdate: false,
}

export const calendarWithEventsState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: null,
  isForUpdate: false,
}

export const calendarWithActiveEventState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: {
    ...events[0]
  },
  isForUpdate: true,
}
