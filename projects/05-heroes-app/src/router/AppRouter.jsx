import { Route, Routes } from 'react-router'

import { LoginPage } from '../auth/pages'
import { HeroesRoutes } from '../heroes/routes/HeroesRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path='/login/*'
          element={
            <PublicRoute>
              <Routes>
                <Route
                  path='/*'
                  element={<LoginPage />}
                />
              </Routes>
            </PublicRoute>
          }
        />

        <Route
          path='/*'
          element={
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}
