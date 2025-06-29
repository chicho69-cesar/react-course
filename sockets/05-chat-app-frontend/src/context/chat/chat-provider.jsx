import { useReducer } from 'react'

import { ChatContext } from './chat-context'
import { chatReducer } from './chat-reducer'

const initialState = {
  uid: '',
  activeChat: null,
  users: [],
  messages: [],
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  return (
    <ChatContext.Provider
      value={{
        chatState: state,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
