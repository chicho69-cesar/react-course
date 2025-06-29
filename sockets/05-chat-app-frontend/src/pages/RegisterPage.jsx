import '../css/login-register.css'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Swal from 'sweetalert2'

import { useAuth } from '../context/auth/use-auth'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { email, password, name } = form
    const ok = await register(name, email, password)

    if (ok !== true) {
      Swal.fire('Error', ok, 'error')
    } else {
      navigate('/')
    }
  }

  const itIsOk = () => {
    return (
      form.email.length > 0 &&
      form.password.length > 0 &&
      form.name.length > 0
    ) ? true : false
  }

  return (
    <div className='limiter'>
      <div className='container-login100'>
        <div className='wrap-login100 p-t-50 p-b-90'>
          <form
            className='login100-form validate-form flex-sb flex-w'
            onSubmit={handleSubmit}
          >
            <span className='login100-form-title mb-3'>
              Chat - Registro
            </span>

            <div className='wrap-input100 validate-input mb-3'>
              <input
                className='input100'
                type='text'
                name='name'
                placeholder='Nombre'
                value={form.name}
                onChange={handleChange}
              />

              <span className='focus-input100'></span>
            </div>

            <div className='wrap-input100 validate-input mb-3'>
              <input
                className='input100'
                type='email'
                name='email'
                placeholder='Email'
                value={form.email}
                onChange={handleChange}
              />

              <span className='focus-input100'></span>
            </div>

            <div className='wrap-input100 validate-input mb-3'>
              <input
                className='input100'
                type='password'
                name='password'
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
              />

              <span className='focus-input100'></span>
            </div>

            <div className='row mb-3'>
              <div className='col text-right'>
                <Link to='/auth/login' className='txt1'>
                  Ya tienes cuenta?
                </Link>
              </div>
            </div>

            <div className='container-login100-form-btn m-t-17'>
              <button
                type='submit'
                className='login100-form-btn'
                disabled={!itIsOk()}
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
