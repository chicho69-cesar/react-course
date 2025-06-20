/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'

import { AuthContext } from '../../src/auth/context'
import { PublicRoute } from '../../src/router/PublicRoute'

describe('Tests on <PublicRoute />', () => {
  test('Should show children if it\'s not authenticated', () => {
    const contextValue = {
      logged: false
    }

    render(
      <AuthContext value={contextValue}>
        <PublicRoute>
          <h1>Public Route</h1>
        </PublicRoute>
      </AuthContext>
    )

    expect(screen.getByText('Public Route')).toBeTruthy()
  })

  test('Should navigate if it\'s authenticated', () => {
    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'John Doe',
      },
    }

    render(
      <AuthContext value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path='login'
              element={
                <PublicRoute>
                  <h1>Public Route</h1>
                </PublicRoute>
              }
            />

            <Route
              path='marvel'
              element={
                <>
                  <h1>Marvel Page</h1>
                </>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext>
    )

    expect(screen.queryByText('Public Route')).toBeNull()
    expect(screen.getByText('Marvel Page')).toBeTruthy()
  })
})
