import '../styles/styles.css'

import type { FormEvent } from 'react'
import useForm from '../hooks/useForm'

export default function AuthPage() {
  const {
    username,
    email,
    password,
    confirmPassword,
    formData,
    handleChange,
    handleResetForm,
    handleValidateEmail,
  } = useForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted', { formData })
  }

  return (
    <div>
      <h1>Auth Page</h1>

      <form noValidate onSubmit={handleSubmit}>
        <>
          <input
            type='text'
            placeholder='Name'
            name='username'
            value={username}
            onChange={handleChange}
            className={`${username.trim().length <= 0 && 'has-error'}`}
          />
  
          {username.trim().length <= 0 && <span>Este campo es necesario</span>}
        </>

        <>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleChange}
            className={`${!handleValidateEmail(email) && 'has-error'}`}
          />
          
          {!handleValidateEmail(email) && <span>Email no es válido</span>}
        </>

        <>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
          />
          
          {password.trim().length <= 0 && <span>Este campo es necesario</span>}
          {password.trim().length < 6 && password.trim().length > 0 && <span>La contraseña tiene que tener 6 letras</span>}
        </>

        <>
          <input
            type='password'
            placeholder='Repeat Password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
          />
          
          {confirmPassword.trim().length <= 0 && <span>Este campo es necesario</span>}
          {confirmPassword.trim().length > 0 && password !== confirmPassword && <span>Las contraseñas deben de ser iguales</span>}
        </>

        <div>
          <button type='submit'>
            Create
          </button>
          
          <button type='button' onClick={handleResetForm}>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  )
}
