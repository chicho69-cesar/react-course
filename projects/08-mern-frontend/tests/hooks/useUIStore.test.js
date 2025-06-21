/* eslint-disable no-undef */
import { configureStore } from '@reduxjs/toolkit'
import { act, renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'

import { useUIStore } from '../../src/hooks/useUIStore'
import { uiSlice } from '../../src/store'

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: initialState
    }
  })
}

describe('Tests on useUIStore', () => {
  test('Should return the initial state default values', () => {
    const mockStore = getMockStore({ isDateModalOpen: false })

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function)
    })
  })

  test('Should open the date modal', () => {
    const mockStore = getMockStore({ isDateModalOpen: false })

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    const { openDateModal } = result.current

    act(() => {
      openDateModal()
    })

    expect(result.current.isDateModalOpen).toBeTruthy()
  })

  test('Should close the date modal', () => {
    const mockStore = getMockStore({ isDateModalOpen: true })

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    const { closeDateModal } = result.current

    act(() => {
      closeDateModal()
    })

    expect(result.current.isDateModalOpen).toBeFalsy()
  })

  test('Should toggle the date modal', () => {
    const mockStore = getMockStore({ isDateModalOpen: true })

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    act(() => {
      result.current.toggleDateModal()
    })

    expect(result.current.isDateModalOpen).toBeFalsy()

    act(() => {
      result.current.toggleDateModal()
    })

    expect(result.current.isDateModalOpen).toBeTruthy()
  })
})
