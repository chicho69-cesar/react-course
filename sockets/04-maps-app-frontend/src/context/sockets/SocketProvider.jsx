import { useSockets } from '../../hooks/useSockets'
import { SocketContext } from './SocketContext'

export default function SocketProvider({ children }) {
  const { online, socket } = useSockets('http://localhost:8080')

  return (
    <SocketContext.Provider
      value={{
        online,
        socket
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
