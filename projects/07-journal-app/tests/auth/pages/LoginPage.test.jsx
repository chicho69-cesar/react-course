/* eslint-disable no-undef */
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'

import { LoginPage } from '../../../src/auth/pages'
import { authSlice } from '../../../src/store'
import { noAuthenticatedState } from '../../fixtures/authFixtures.test'

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password })
  }
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}))

const storeForTesting = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: noAuthenticatedState
  }
})

describe('Tests on <LoginPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should show the component correctly', () => {
    render(
      <Provider store={storeForTesting}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getAllByAltText('Login').length).toBeGreaterThanOrEqual(1)
  })

  test('Should call startGoogleSignIn when clicking the Google button', () => {
    render(
      <Provider store={storeForTesting}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const googleButton = screen.getByLabelText('google-btn')
    fireEvent.click(googleButton)

    expect(mockStartGoogleSignIn).toHaveBeenCalled()
  })

  test('Should call startLoginWithEmailPassword with form data', () => {
    const email = 'cesar@google.com'
    const password = '123456'

    render(
      <Provider store={storeForTesting}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const emailField = screen.getByRole('textbox', { name: 'email' })
    fireEvent.change(emailField, { target: { value: email, name: 'email' } })

    const passwordField = screen.getByRole('textbox', { name: 'password' })
    fireEvent.change(passwordField, { target: { value: password, name: 'password' } })

    const loginForm = screen.getByLabelText('submit-form')
    fireEvent.submit(loginForm)

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password
    })
  })
})
