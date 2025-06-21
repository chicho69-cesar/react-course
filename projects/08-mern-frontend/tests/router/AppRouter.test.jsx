/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import { useAuthStore } from '../../src/hooks'
import { AppRouter } from '../../src/router'

jest.mock('../../src/hooks/useAuthStore')

jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}))

describe('Tests on <AppRouter />', () => {
  const mockCheckAuthToken = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should show loading screen and call check auth token', () => {
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken
    })

    render(
      <AppRouter />
    )

    expect(screen.getByText('Loading...')).toBeTruthy()
    expect(mockCheckAuthToken).toHaveBeenCalled()
  })

  test('Should show auth page if it\'s not authenticated', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken
    })

    const { container } = render(
      <MemoryRouter initialEntries={['/auth/test/other-screen']}>
        <AppRouter />
      </MemoryRouter>
    )

    expect(screen.getAllByText('Iniciar Sesión').length).toBeGreaterThan(0)
    expect(container).toMatchSnapshot()
  })
})
