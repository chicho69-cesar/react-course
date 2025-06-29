import '../css/chat.css'

import { ChatSelect } from '../components/ChatSelect'
import { InboxPeople } from '../components/InboxPeople'
import { Messages } from '../components/Messages'
import { useChat } from '../context/chat/use-chat'

export default function ChatPage() {
  const { chatState } = useChat()

  return (
    <div className='messaging'>
      <div className='inbox_msg'>
        <InboxPeople />
        {(chatState.activeChat) ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  )
}
