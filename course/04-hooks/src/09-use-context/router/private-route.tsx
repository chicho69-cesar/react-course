import { type PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { useUser } from '../context/use-user'

export default function PrivateRoute({ children }: PropsWithChildren) {
  const { authStatus } = useUser()

  if (authStatus === 'checking') {
    return null
  }

  if (authStatus === 'authenticated') {
    return <>{children}</>
  }

  return (
    <Navigate to="/login" replace />
  )
}
