/* eslint-disable no-undef */
import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice'
import { authenticatedState, demoUser, initialState, noAuthenticatedState } from '../../fixtures/authFixtures.test'

describe('Tests in authSlice', () => {
  test('Should return the initial state', () => {
    /* Obtenemos el state actual del authSlice, mandando como parámetros el valor
    del estado que queremos que tenga y la acción que queremos ejecutar para cambiar
    dicho estado */
    const state = authSlice.reducer(initialState, {})

    expect(state).toEqual(initialState)
    expect(authSlice.name).toBe('auth')
  })

  test('Should make the authentication', () => {
    const state = authSlice.reducer(initialState, login(demoUser))
    expect(state).toEqual(authenticatedState)
  })

  test('Should make the logout', () => {
    const state = authSlice.reducer(authenticatedState, logout())
    expect(state).toEqual(noAuthenticatedState)
  })

  test('Should make the logout and error message', () => {
    const errorMessage = 'Invalid credentials'

    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }))
    expect(state).toEqual({
      ...noAuthenticatedState,
      errorMessage
    })
  })

  test('Should change the status to checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials())
    expect(state.status).toBe('checking')
  })
})
