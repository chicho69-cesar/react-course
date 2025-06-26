import { createContext } from 'react'

export const SocketsContext = createContext({
  socket: null,
  online: false
})
