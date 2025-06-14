import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { AuthPage } from '../auth/pages/AuthPage'
import { CalendarPage } from '../calendar'
import { useAuthStore } from '../hooks'

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === 'checking') {
    return (
      <div className='loading-screen'>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path='/auth/*' element={<AuthPage />} />
          <Route path='/*' element={<Navigate to='/auth/login' />} />
        </>
      ) : (
        <>
          <Route path='/' element={<CalendarPage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </>
      )}
    </Routes>
  )
}
