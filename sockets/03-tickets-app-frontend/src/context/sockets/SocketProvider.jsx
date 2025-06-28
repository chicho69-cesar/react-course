import { useSockets } from '../../hooks/useSockets'
import { SocketContext } from './SocketContext'

export function SocketProvider({ children }) {
  const { online, socket } = useSockets('http://localhost:8080')

  return (
    <SocketContext.Provider
      value={{
        socket,
        online
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
