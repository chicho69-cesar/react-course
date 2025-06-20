/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import { AuthContext } from '../../../src/auth/context'
import { AppRouter } from '../../../src/router/AppRouter'

const mockNavigate = jest.fn()

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}))

describe('Tests on <Navbar />', () => {
  test('Should show name of user', () => {
    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'John Doe',
      },
    }

    render(
      <AuthContext value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext>
    )

    const userName = screen.getByLabelText('user-name')
    expect(userName).toBeTruthy()
    expect(userName.innerHTML).toBe(contextValue.user.name)
  })

  test('Should call logout and navigate when the button is clicked', () => {
    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'John Doe',
      },
      logout: jest.fn(),
    }

    render(
      <AuthContext value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext>
    )

    const logoutButton = screen.getByRole('button', { name: 'logout-button' })
    fireEvent.click(logoutButton)

    expect(contextValue.logout).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })
})
