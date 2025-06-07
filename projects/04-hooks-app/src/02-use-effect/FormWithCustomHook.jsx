import { useForm } from '../hooks'

export const FormWithCustomHook = () => {
  const { email, username, password, onInputChange, onResetForm } = useForm({
    email: '',
    username: '',
    password: '',
  })

  return (
    <>
      <h1>
        Form with Custom Hook
      </h1>

      <hr />

      <input
        type="email"
        className="form-control mt-2"
        placeholder="user@google.com"
        name="email"
        value={email}
        onChange={onInputChange}
      />

      <input
        type="text"
        className="form-control mt-2"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />

      <input
        type="password"
        className="form-control mt-2"
        placeholder="*********"
        name="password"
        value={password}
        onChange={onInputChange}
      />

      <div className='mt-2 d justify-content-start align-items-center gap-2'>
        <button
          className="btn btn-primary"
          onClick={onResetForm}
        >
          Reset
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => console.log({ email, username, password })}
        >
          Submit
        </button>
      </div>
    </>
  )
}
