import { useState } from 'react'

import { useAuth } from '../context/auth/use-auth'
import { useChat } from '../context/chat/use-chat'
import { useSocket } from '../context/sockets/use-socket'

export function SendMessage() {
  const [message, setMessage] = useState('')

  const { auth } = useAuth()
  const { chatState } = useChat()
  const { socket } = useSocket()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (message.trim().length === 0) return

    socket.emit('message', {
      from: auth.uid,
      to: chatState.activeChat,
      message: message.trim(),
    })

    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='type_msg row'>
        <div className='input_msg_write col-sm-9'>
          <input
            type='text'
            className='write_msg'
            placeholder='Mensaje...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className='col-sm-3 text-center'>
          <button className='msg_send_btn mt-3' type='submit'>
            Enviar
          </button>
        </div>
      </div>
    </form>
  )
}
