import { Navigate } from 'react-router'

export function PrivateRoute({ isAuthenticated, children }) {
  if (isAuthenticated) {
    return children
  } else {
    return <Navigate to='/auth/login' replace />
  }
}
