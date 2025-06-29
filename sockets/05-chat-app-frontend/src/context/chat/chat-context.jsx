import { createContext } from 'react'

export const ChatContext = createContext({
  chatState: {
    uid: '',
    activeChat: null,
    users: [],
    messages: [],
  },
  dispatch: () => {},
})
