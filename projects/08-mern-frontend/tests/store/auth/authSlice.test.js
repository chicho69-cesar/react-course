/* eslint-disable no-undef */
import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice'
import { authenticatedState, initialState } from '../../fixtures/authStates'
import { testUserCredentials } from '../../fixtures/testUser'

describe('Tests on authSlice', () => {
  test('Should return the initial state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState)
  })

  test('Should make the login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials))

    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined
    })
  })

  test('Should make the logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout())

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined
    })
  })

  test('Should make the logout with error', () => {
    const errorMessage = 'Invalid credentials'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: errorMessage
    })
  })

  test('Should clear the error message', () => {
    const errorMessage = 'Invalid credentials'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
    const newState = authSlice.reducer(state, clearErrorMessage())

    expect(newState.errorMessage).toBeUndefined()
  })
})
