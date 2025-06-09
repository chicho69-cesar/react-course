import { useReducer } from 'react'

import { AUTH_TYPES } from '../types'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

const initState = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  return {
    logged: !!user,
    user,
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {}, initState)

  const login = (name = '') => {
    const user = { id: 'ABC', name }
    const action = { type: AUTH_TYPES.login, payload: { user } }

    localStorage.setItem('user', JSON.stringify(user))

    dispatch(action)
  }

  const logout = () => {
    const action = { type: AUTH_TYPES.logout }
    localStorage.removeItem('user')
    dispatch(action)
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
