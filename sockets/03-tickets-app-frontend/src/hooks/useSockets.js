import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

export const useSockets = (severPath) => {
  const [online, setOnline] = useState(false)
  const socket = useMemo(() => io(severPath), [severPath])

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])

  return {
    socket,
    online
  }
}
