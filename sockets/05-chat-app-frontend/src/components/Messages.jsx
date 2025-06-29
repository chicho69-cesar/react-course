import { useAuth } from '../context/auth/use-auth'
import { useChat } from '../context/chat/use-chat'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { SendMessage } from './SendMessage'

export function Messages() {
  const { auth } = useAuth()
  const { chatState } = useChat()

  return (
    <div className='mesgs'>
      <div
        id='mensajes'
        className='msg_history'
      >
        {chatState.messages.map((msg) => (
          (msg.to === auth.uid)
            ? <IncomingMessage key={msg.uid} msg={msg} />
            : <OutgoingMessage key={msg.uid} msg={msg} />
        ))}
      </div>

      <SendMessage />
    </div>
  )
}
