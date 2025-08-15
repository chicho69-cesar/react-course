import { useAuthStore } from '@/auth/store/auth.store'
import type { PropsWithChildren } from "react"
import { Navigate } from 'react-router'

export function AuthenticatedRoute({ children }: PropsWithChildren) {
  const { authStatus } = useAuthStore()

  if (authStatus === 'checking') return null
  if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" replace />

  return <>{children}</>
}

export function NotAuthenticatedRoute({ children }: PropsWithChildren) {
  const { authStatus } = useAuthStore()

  if (authStatus === 'checking') return null
  if (authStatus === 'authenticated') return <Navigate to="/" replace />

  return <>{children}</>
}

export function AdminRoute({ children }: PropsWithChildren) {
  const { authStatus, isAdmin } = useAuthStore()

  if (authStatus === 'checking') return null
  if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" replace />
  if (!isAdmin()) return <Navigate to="/" replace />

  return <>{children}</>
}
