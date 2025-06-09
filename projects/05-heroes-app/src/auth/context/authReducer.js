import { AUTH_TYPES } from '../types'

const AUTH_REDUCER_ACTIONS = {
  [AUTH_TYPES.login]: (state, payload) => {
    return {
      ...state,
      user: payload.user,
      logged: true,
    }
  },
  [AUTH_TYPES.logout]: (state) => {
    return {
      ...state,
      user: null,
      logged: false,
    }
  },
}

export const authReducer = (state, action) => {
  const { type, payload } = action
  const actionHandler = AUTH_REDUCER_ACTIONS[type]
  return actionHandler ? actionHandler(state, payload) : state
}
