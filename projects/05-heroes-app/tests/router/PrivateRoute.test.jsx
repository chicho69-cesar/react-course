/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AuthContext } from '../../src/auth/context'
import { PrivateRoute } from '../../src/router/PrivateRoute'

describe('Tests on <PrivateRoute />', () => {
  test('Should show children if it\'s authenticated', () => {
    Storage.prototype.setItem = jest.fn()

    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'John Doe',
      },
    }

    render(
      <AuthContext value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Private Route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext>
    )

    expect(screen.getByText('Private Route')).toBeTruthy()
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman')
  })
})
