/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react'
import { UserContext } from '../../src/09-use-context/context/UserContext'
import { LoginPage } from '../../src/09-use-context/LoginPage'

describe('Test on <LoginPage />', () => {
  test('Should show the component without user', () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <LoginPage />
      </UserContext.Provider>
    )

    const preTag = screen.getByLabelText('pre')
    expect(preTag.innerHTML).toBe('null')
  })

  test('Should call setUser when button is clicked', () => {
    const setUserMock = jest.fn()

    render(
      <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
        <LoginPage />
      </UserContext.Provider>
    )

    const button = screen.getByRole('button', { name: 'Establecer usuario' })
    fireEvent.click(button)

    expect(setUserMock).toHaveBeenCalledWith({ id: 123, name: 'Juan', email: 'juan@google.com' })
  })
})
