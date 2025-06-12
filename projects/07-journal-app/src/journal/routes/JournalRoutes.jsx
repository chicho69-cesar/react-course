import { Routes, Route, Navigate } from 'react-router'
import { JournalPage } from '../pages/JournalPage'

export const JournalRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<JournalPage />} />
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  )
}
