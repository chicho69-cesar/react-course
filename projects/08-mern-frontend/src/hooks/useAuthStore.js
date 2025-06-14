import { useDispatch, useSelector } from 'react-redux'

import calendarApi from '../api/calendarApi'
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice'
import { onLogoutCalendar } from '../store/calendar/calendarSlice'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post('/auth/login', { email, password })

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      console.error('Error during login:', error)
      dispatch(onLogout('Credenciales incorrectas'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 100)
    }
  }

  const startRegister = async ({ email, password, name }) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post('/auth/register', { email, password, name })

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      console.error('Error during login:', error)
      dispatch(onLogout(error.response.data?.msg || 'Error al registrar usuario'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 100)
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) return dispatch(onLogout())

    try {
      const { data } = await calendarApi.get('/auth/renew')

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      console.error('Error checking auth token:', error)

      localStorage.clear()
      dispatch(onLogout())

      return
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogoutCalendar())
    dispatch(onLogout())
  }

  return {
    status,
    user,
    errorMessage,

    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  }
}
