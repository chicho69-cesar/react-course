import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { useAuth } from '../context/auth/use-auth'
import ChatPage from '../pages/ChatPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import { PrivateRoute } from './PrivateRoute'

export default function Router() {
  const { auth, verifyToken } = useAuth()

  useEffect(() => {
    verifyToken()
  }, [verifyToken])

  if (auth.checking) {
    return (
      <p>
        Loading...
      </p>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/auth/login'
          element={<LoginPage />}
        />

        <Route
          path='/auth/register'
          element={<RegisterPage />}
        />

        <Route
          path='/'
          element={
            <PrivateRoute isAuthenticated={auth.logged}>
              <ChatPage />
            </PrivateRoute>
          }
        />

        <Route
          path='/*'
          element={<Navigate to='/' />}
        />
      </Routes>
    </BrowserRouter>
  )
}
