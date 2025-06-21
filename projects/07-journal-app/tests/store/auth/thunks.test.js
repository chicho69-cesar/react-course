/* eslint-disable no-undef */
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers'
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice'
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks'
import { clearNotesLogout } from '../../../src/store/journal/journalSlice'
import { demoUser } from '../../fixtures/authFixtures.test'

jest.mock('../../../src/firebase/providers.js')

describe('Tests on auth thunks', () => {
  const dispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should invoke checkingCredentials', async () => {
    await checkingAuthentication()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test('Should startGoogleSignIn call checkingCredentials and login successfully', async () => {
    /* Hacemos mock del valor que nos regresa la función signInWithGoogle */
    const loginData = { ok: true, ...demoUser }
    await signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('Should startGoogleSignIn call checkingCredentials and login with error', async () => {
    const loginData = { ok: false, errorMessage: 'Google sign-in failed' }
    await signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('Should startLoginWithEmailAndPassword call checkingCredentials and login successfully', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('Should startGoogleSignIn call checkingCredentials and login with error', async () => {
    const loginData = { ok: false, errorMessage: 'Invalid credentials' }
    const formData = { email: demoUser.email, password: 'incorrect' }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('Should startLogout call logoutFirebase, clearNotesLogout and logout', async () => {
    await startLogout()(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})
