import { useContext } from 'react'
import { Navigate } from 'react-router'

import { AuthContext } from '../auth/context'

export const PublicRoute = ({ children }) => {
  const { logged } = useContext(AuthContext)

  if (!logged) {
    return (
      <>{children}</>
    )
  }

  return (
    <Navigate to="/marvel" />
  )
}
