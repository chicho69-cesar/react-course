import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'

import { AuthContext } from '../auth/context'

export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext)
  const { pathname, search } = useLocation()

  const lastPath = pathname + search
  localStorage.setItem('lastPath', lastPath)

  if (logged) {
    return (
      <>{children}</>
    )
  }

  return (
    <Navigate to="/login" replace />
  )
}
