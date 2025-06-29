import { useEffect } from 'react'

import { SERVER_URL } from '../../constants/server'
import { scrollToBottomAnimated } from '../../helpers/scroll-to-bottom'
import { useSockets } from '../../hooks/use-sockets'
import { useAuth } from '../auth/use-auth'
import { CHAT_ACTION_TYPES } from '../chat/chat-reducer'
import { useChat } from '../chat/use-chat'
import { SocketContext } from './socket-context'

export function SocketProvider({ children }) {
  const { connectSocket, disconnectSocket, online, socket } = useSockets(SERVER_URL)
  const { auth } = useAuth()
  const { dispatch } = useChat()

  useEffect(() => {
    if (auth.logged) {
      connectSocket()
    }
  }, [auth, connectSocket])

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket()
    }
  }, [auth, disconnectSocket])

  useEffect(() => {
    socket?.on('users-list', (users) => {
      dispatch({
        type: CHAT_ACTION_TYPES.USERS_LOAD,
        payload: users
      })
    })

  }, [socket, dispatch])

  useEffect(() => {
    socket?.on('message', (message) => {
      dispatch({
        type: CHAT_ACTION_TYPES.NEW_MESSAGE,
        payload: message
      })

      scrollToBottomAnimated('mensajes')
    })
  }, [socket, dispatch])

  return (
    <SocketContext.Provider
      value={{
        socket,
        online,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
