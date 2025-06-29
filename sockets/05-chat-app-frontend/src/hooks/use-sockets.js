import { useCallback, useEffect, useState } from 'react'
import { connect } from 'socket.io-client'

export const useSockets = (serverPath) => {
  const [socket, setSocket] = useState(null)
  const [online, setOnline] = useState(false)

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem('token')

    const socketTemp = connect(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        token
      }
    })

    setSocket(socketTemp)
  }, [serverPath])

  const disconnectSocket = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  useEffect(() => {
    setOnline(socket?.connected || false)
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => setOnline(true))
  }, [socket])
  
  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false))
  }, [socket])

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket
  }
}
