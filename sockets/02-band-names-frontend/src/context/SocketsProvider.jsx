import { useSockets } from '../hooks/useSockets'
import { SocketsContext } from './SocketsContext'

export function SocketsProvider({ children }) {
  const { online, socket } = useSockets('http://localhost:8080')

  return (
    <SocketsContext.Provider value={{ socket, online }}>
      {children}
    </SocketsContext.Provider>
  )
}