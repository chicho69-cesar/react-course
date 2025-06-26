import { useEffect, useState } from 'react'
import { useSocket } from '../context/useSocket'

export default function BandList() {
  const { socket } = useSocket()
  const [bands, setBands] = useState([])

  useEffect(() => {
    socket.on('current-bands', setBands)
    return () => socket.off('current-bands')
  }, [socket])

  const handleEmitVote = (bandId) => {
    socket.emit('vote-for-band', bandId)
  }

  const handleChangeName = (event, bandId) => {
    const newName = event.target.value

    setBands((prev) => prev.map((band) => {
      if (band.id === bandId) {
        return {
          ...band,
          name: newName
        }
      }

      return band
    }))
  }

  const handleLostFocus = (bandId, newName) => {
    socket.emit('update-band', {
      id: bandId,
      newName
    })
  }

  const handleDelete = (bandId) => {
    socket.emit('remove-band', bandId)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>

        <tbody>
          {bands.map((band) => (
            <tr key={band.id}>
              <td>
                <button
                  className='btn btn-primary'
                  onClick={() => handleEmitVote(band.id)}
                >
                  +1
                </button>
              </td>

              <td>
                <input
                  className='form-control'
                  value={band.name}
                  onChange={(event) => handleChangeName(event, band.id)}
                  onBlur={() => handleLostFocus(band.id, band.name)}
                />
              </td>

              <td>
                <h3>
                  {band.votes}
                </h3>
              </td>
              
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDelete(band.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
