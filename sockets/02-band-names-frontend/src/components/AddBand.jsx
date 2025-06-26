import { useState } from 'react'
import { useSocket } from '../context/useSocket'

export default function AddBand() {
  const [name, setName] = useState('')
  const { socket } = useSocket()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name.trim().length > 0) {
      socket.emit('add-band', name)
      setName('')
    }
  }

  return (
    <>
      <h3>
        Agregar banda
      </h3>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Nuevo nombre de banda'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </>
  )
}
