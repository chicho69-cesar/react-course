import { Route, Routes, Navigate } from 'react-router'

import { useCheckAuth } from '../hooks/useCheckAuth'
import { CheckingAuth } from '../ui'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { AuthRoutes } from '../auth/routes/AuthRoutes'

export const AppRouter = () => {
  const status = useCheckAuth()

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route path='/*' element={<JournalRoutes />} />
      ) : (
        <Route path='/auth/*' element={<AuthRoutes />} />
      )}

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
