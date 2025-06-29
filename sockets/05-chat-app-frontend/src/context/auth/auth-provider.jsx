import { useCallback, useState } from 'react'

import { fetchWithAuth, fetchWithoutAuth } from '../../helpers/fetch'
import { AuthContext } from './auth-context'

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(initialState)

  const login = async (email, password) => {
    const resp = await fetchWithoutAuth(
      'auth/login',
      { email, password },
      'POST'
    )

    if (resp.ok) {
      localStorage.setItem('token', resp.token)
      const { user } = resp

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      })
    }

    return resp.ok
  }

  const register = async (name, email, password) => {
    const resp = await fetchWithoutAuth(
      'auth/register',
      { name, email, password },
      'POST'
    )

    if (resp.ok) {
      localStorage.setItem('token', resp.token)
      const { user } = resp

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      })

      return true
    }

    return resp.msg
  }

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setAuth({
        ...initialState,
        checking: false,
      })

      return false
    }

    const resp = await fetchWithAuth('auth/renew')

    if (resp.ok) {
      localStorage.setItem('token', resp.token)
      const { user } = resp

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      })

      return true
    } else {
      setAuth({
        ...initialState,
        checking: false,
      })

      localStorage.removeItem('token')
      return false
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')

    setAuth({
      ...initialState,
      checking: false,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        register,
        verifyToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
