/* eslint-disable no-undef */
import { configureStore } from '@reduxjs/toolkit'
import { act, renderHook, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { calendarApi } from '../../src/api'
import { useAuthStore } from '../../src/hooks'
import { authSlice } from '../../src/store'
import { initialState, notAuthenticatedState } from '../fixtures/authStates'
import { testUserCredentials } from '../fixtures/testUser'

/* Creamos un mock para crear una store con un cierto valor del estado */
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
    /* Creamos nuestra store mockeada */
    const mockStore = getMockStore({ ...initialState })

    /* Hacemos un render del hook useAuthStore con un wrapper para envolver el render
    con el provider de redux con la store mockeada */
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>
          {children}
        </Provider>
      )
    })

    /* Comprobamos que el resultado del hook es el esperado */
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

    /* Ejecutamos la función startLogin del hook con las credenciales */
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

    /* Ejecutamos la función startLogin del hook con las credenciales incorrectas */
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

    /* Nos esperamos a que el errorMessage cambie por que cambia con una callback */
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

    /* Mockeamos la llamada a la API para crear un usuario */
    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: '123456789',
        name: newUser.name,
        token: 'ABC-123-XYZ'
      }
    })

    /* Ejecutamos la función startRegister del hook con los datos del nuevo usuario */
    await act(async () => {
      await result.current.startRegister(newUser)
    })

    const { user, status, errorMessage } = result.current

    expect({ user, status, errorMessage }).toEqual({
      user: { name: newUser.name, uid: '123456789' },
      status: 'authenticated',
      errorMessage: undefined
    })

    /* Hacemos un restore del spy de la llamada a la API */
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
