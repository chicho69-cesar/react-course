import '../css/login-register.css'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Swal from 'sweetalert2'

import { useAuth } from '../context/auth/use-auth'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  useEffect(() => {
    const email = localStorage.getItem('email')

    if (email) {
      setForm((form) => ({
        ...form,
        email,
        rememberMe: true,
      }))
    }
  }, [setForm])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleToggleCheck = () => {
    setForm({
      ...form,
      rememberMe: !form.rememberMe,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    form.rememberMe
      ? localStorage.setItem('email', form.email)
      : localStorage.removeItem('email')

    const { email, password } = form
    const ok = await login(email, password)

    if (!ok) {
      Swal.fire('Error', 'Verifique el usuario y contraseña', 'error')
    } else {
      navigate('/')
    }
  }

  const itIsOk = () => {
    return (form.email.length > 0 && form.password.length > 0) ? true : false
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
              Chat - Ingreso
            </span>

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
              <div
                className='col'
                onClick={() => handleToggleCheck()}
              >
                <input
                  className='input-checkbox100'
                  id='ckb1'
                  type='checkbox'
                  name='rememberMe'
                  checked={form.rememberMe}
                  readOnly
                />

                <label className='label-checkbox100'>
                  Recuerdame
                </label>
              </div>

              <div className='col text-right'>
                <Link to='/auth/register' className='txt1'>
                  Nueva cuenta?
                </Link>
              </div>
            </div>

            <div className='container-login100-form-btn m-t-17'>
              <button
                type='submit'
                className='login100-form-btn'
                disabled={!itIsOk()}
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
