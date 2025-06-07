import { useEffect, useState } from 'react'

export default function SimpleForm() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
  })

  const { username, email } = formState

  const onInputChange = ({ target }) => {
    const { name, value } = target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  useEffect(() => {
    console.log('useEffect called')
  }, [])
  
  useEffect(() => {
    console.log('formState changed:', formState)
  }, [formState])
  
  useEffect(() => {
    console.log('email changed:', email)
  }, [email])

  return (
    <>
      <h1>
        Simple Form
      </h1>

      <hr />

      <input
        type="text"
        className="form-control"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />

      <input
        type="email"
        className="form-control mt-2"
        placeholder="user@google.com"
        name="email"
        value={email}
        onChange={onInputChange}
      />

      {username === 'chicho' && (
        <div className="alert alert-danger mt-2">
          Chicho is not allowed
        </div>
      )}
    </>
  )
}
