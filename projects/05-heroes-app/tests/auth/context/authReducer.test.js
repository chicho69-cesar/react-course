import { authReducer } from '../../../src/auth/context'
import { AUTH_TYPES } from '../../../src/auth/types'

/* eslint-disable no-undef */
describe('Test on authReducer.js', () => {
  test('Should return the initial state', () => {
    const state = authReducer({ logged: false }, {})
    expect(state).toEqual({ logged: false })
  })

  test('Should login the user', () => {
    const action = {
      type: AUTH_TYPES.login,
      payload: {
        user: { id: '123', name: 'John Doe' }
      }
    }

    const state = authReducer({ logged: false }, action)
    expect(state).toEqual({
      logged: true,
      user: action.payload.user
    })
  })

  test('Should logout the user', () => {
    const initialState = {
      logged: true,
      user: { id: '123', name: 'John Doe' }
    }

    const action = {
      type: AUTH_TYPES.logout
    }

    const state = authReducer(initialState, action)
    expect(state).toEqual({
      logged: false,
      user: null
    })
  })
})
