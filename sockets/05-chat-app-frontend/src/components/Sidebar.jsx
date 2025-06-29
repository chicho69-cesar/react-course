import { useAuth } from '../context/auth/use-auth'
import { useChat } from '../context/chat/use-chat'
import { SidebarChatItem } from './SidebarChatItem'

export function Sidebar() {
  const { auth } = useAuth()
  const { chatState } = useChat()

  const { uid } = auth

  return (
    <div className='inbox_chat'>
      {chatState.users
        .filter((user) => user.uid !== uid)
        .map((user) => (
          <SidebarChatItem
            key={user.uid}
            user={user}
          />
        ))
      }

      <div className='extra_space'></div>
    </div>
  )
}
