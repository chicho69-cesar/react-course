/* eslint-disable no-undef */
import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice'
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarStates'

describe('Tests on calendarSlice', () => {
  test('Should return the initial state', () => {
    const state = calendarSlice.getInitialState()
    expect(state).toEqual(initialState)
  })

  test('Should onSetActiveEvent set active event', () => {
    const state = calendarSlice.reducer(initialState, onSetActiveEvent(events[0]))
    expect(state.activeEvent).toEqual(events[0])
  })

  test('Should onAddNewEvent add a new event', () => {
    const newEvent = {
      id: '3',
      start: new Date('2025-06-21 13:00:00'),
      end: new Date('2025-06-21 15:00:00'),
      title: 'Cumpleaños de Cesar!!',
      notes: 'Alguna nota!!'
    }

    const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
    expect(state.events).toEqual([...events, newEvent])
  })

  test('Should onUpdateEvent update an event', () => {
    const eventToUpdate = {
      id: '1',
      start: new Date('2025-06-21 13:00:00'),
      end: new Date('2025-06-21 15:00:00'),
      title: 'Cumpleaños de Cesar actualizado!!',
      notes: 'Alguna nota actualizado!!'
    }

    const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(eventToUpdate))
    expect(state.events).toContain(eventToUpdate)
  })

  test('Should onDeleteEvent delete an event', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent())
    expect(state.activeEvent).toBeNull()
    expect(state.events).not.toContain(events[0])
  })

  test('Should onLoadEvents load events', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events))

    expect(state.isLoadingEvents).toBeFalsy()
    expect(state.events).toEqual(events)

    const newState = calendarSlice.reducer(state, onLoadEvents(events))
    expect(newState.events.length).toBe(events.length)
  })

  test('Should onLogoutCalendar reset the state', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar())
    expect(state).toEqual(initialState)
  })
})
