import { CHAT_ACTION_TYPES } from '../context/chat/chat-reducer'
import { useChat } from '../context/chat/use-chat'
import { fetchWithAuth } from '../helpers/fetch'
import { scrollToBottom } from '../helpers/scroll-to-bottom'

export function SidebarChatItem({ user }) {
  const { chatState, dispatch } = useChat()
  const { activeChat } = chatState

  const handleClick = async () => {
    dispatch({
      type: CHAT_ACTION_TYPES.ACTIVE_CHAT,
      payload: user.uid
    })

    const resp = await fetchWithAuth(`messages/${user.uid}`)

    dispatch({
      type: CHAT_ACTION_TYPES.LOAD_MESSAGES,
      payload: resp.messages
    })

    scrollToBottom('messages')
  }

  return (
    <article
      className={`chat_list ${(user.uid === activeChat) && 'active_chat'}`}
      onClick={handleClick}
    >
      <div className='chat_people'>
        <div className='chat_img'>
          <img src='https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png' alt='sunil' />
        </div>

        <div className='chat_ib'>
          <h5> {user.name} </h5>

          {user.online ? (
            <span className='text-success'>Online</span>
          ) : (
            <span className='text-danger'>Offline</span>
          )}
        </div>
      </div>
    </article>
  )
}
