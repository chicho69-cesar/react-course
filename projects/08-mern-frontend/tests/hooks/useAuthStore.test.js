/* eslint-disable no-undef */
import { configureStore } from '@reduxjs/toolkit'
import { act, renderHook, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { calendarApi } from '../../src/api'
import { useAuthStore } from '../../src/hooks'
import { authSlice } from '../../src/store'
import { initialState, notAuthenticatedState } from '../fixtures/authStates'
import { testUserCredentials } from '../fixtures/testUser'

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: { ...initialState }
    }
  })
}

describe('Tests on useAuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return the default values', () => {
    const mockStore = getMockStore({ ...initialState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    expect(result.current).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    })
  })

  test('Should startLogin make the login successfully', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    await act(async () => {
      await result.current.startLogin(testUserCredentials)
    })

    const { user, status, errorMessage } = result.current

    expect({ user, status, errorMessage }).toEqual({
      user: { name: testUserCredentials.name, uid: testUserCredentials.uid },
      status: 'authenticated',
      errorMessage: undefined
    })

    expect(localStorage.getItem('token')).toEqual(expect.any(String))
  })

  test('Should startLogin fail with wrong credentials', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    await act(async () => {
      await result.current.startLogin({
        email: 'failed@google.com',
        password: 'wrong-password',
      })
    })

    const { user, status, errorMessage } = result.current

    expect({ user, status, errorMessage }).toEqual({
      user: {},
      status: 'not-authenticated',
      errorMessage: 'Credenciales incorrectas'
    })

    await waitFor(() => {
      expect(result.current.errorMessage).toBeUndefined()
    })
  })

  test('Should startRegister create a user successfully', async () => {
    const newUser = { email: 'algo@google.com', password: '123456789', name: 'Test User 2' }
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: '123456789',
        name: newUser.name,
        token: 'ABC-123-XYZ'
      }
    })

    await act(async () => {
      await result.current.startRegister(newUser)
    })

    const { user, status, errorMessage } = result.current

    expect({ user, status, errorMessage }).toEqual({
      user: { name: newUser.name, uid: '123456789' },
      status: 'authenticated',
      errorMessage: undefined
    })

    spy.mockRestore()
  })

  test('Should startRegister failed creating an user account', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    await act(async () => {
      await result.current.startRegister(testUserCredentials)
    })

    const { user, status, errorMessage } = result.current

    expect({ user, status, errorMessage }).toEqual({
      user: {},
      status: 'not-authenticated',
      errorMessage: 'Email already exists'
    })
  })

  test('Should checkAuthToken failed if there isn\'t a token', async () => {
    const mockStore = getMockStore({ ...initialState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    await act(async () => {
      await result.current.checkAuthToken()
    })

    const { user, status, errorMessage } = result.current

    expect({ user, status, errorMessage }).toEqual({
      user: {},
      status: 'not-authenticated',
      errorMessage: undefined
    })
  })

  test('Should checkAuthToken authenticate the user if exists a token', async () => {
    const { data } = await calendarApi.post('/auth/login', testUserCredentials)
    localStorage.setItem('token', data.token)

    const mockStore = getMockStore({ ...initialState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    await act(async () => {
      await result.current.checkAuthToken()
    })

    const { user, status, errorMessage } = result.current

    expect({ user, status, errorMessage }).toEqual({
      user: { name: testUserCredentials.name, uid: testUserCredentials.uid },
      status: 'authenticated',
      errorMessage: undefined
    })
  })
})
