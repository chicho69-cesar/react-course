/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import { AuthContext } from '../../src/auth/context'
import { AppRouter } from '../../src/router/AppRouter'

describe('Tests on <AppRouter />', () => {
  test('Should show login if it\'s not authenticated', () => {
    const contextValue = {
      logged: false,
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext value={contextValue}>
          <AppRouter />
        </AuthContext>
      </MemoryRouter>
    )

    const title = screen.getByRole('heading', { level: 1, name: 'title' })
    expect(title).toBeTruthy()
    expect(title.innerHTML).toBe('Login')
  })

  test('Should show Marvel page if it\'s authenticated', () => {
    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'John Doe',
      },
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext value={contextValue}>
          <AppRouter />
        </AuthContext>
      </MemoryRouter>
    )

    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1)
  })
})
