import './AuthPage.css'

import { useEffect } from 'react'
import Swal from 'sweetalert2'

import { useAuthStore } from '../../hooks/useAuthStore'
import { useForm } from '../../hooks/useForm'

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
}

export const AuthPage = () => {
  const { errorMessage, startLogin, startRegister } = useAuthStore()
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields)
  const { registerName, registerEmail, registerPassword, registerConfirmPassword, onInputChange: onRegisterInputChange } = useForm(registerFormFields)

  useEffect(() => {
    Swal.fire('Error', errorMessage, 'error')
  }, [errorMessage])

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    startLogin({ email: loginEmail, password: loginPassword })
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    if (registerPassword !== registerConfirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error')
      return
    }

    startRegister({ email: registerEmail, password: registerPassword, name: registerName })
  }

  return (
    <div className='container login-container'>
      <div className='row'>
        <section className='col-md-6 login-form-1'>
          <h3>
            Iniciar Sesión
          </h3>

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="email"
                className='form-control'
                placeholder='Correo'
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className='form-control'
                placeholder='Contraseña'
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>

            <div className='d-grid gap-2'>
              <button type='submit' className='btnSubmit'>
                Iniciar Sesión
              </button>
            </div>
          </form>
        </section>

        <section className='col-md-6 login-form-2'>
          <h3>
            Registrarse
          </h3>

          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className='form-control'
                placeholder='Nombre'
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="email"
                className='form-control'
                placeholder='Correo'
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className='form-control'
                placeholder='Contraseña'
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className='form-control'
                placeholder='Confirmar Contraseña'
                name='registerConfirmPassword'
                value={registerConfirmPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='d-grid gap-2'>
              <button type='submit' className='btnSubmit'>
                Registrarse
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
