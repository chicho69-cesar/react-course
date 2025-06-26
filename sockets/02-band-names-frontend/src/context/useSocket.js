import { useContext } from 'react'
import { SocketsContext } from './SocketsContext'

export const useSocket = () => useContext(SocketsContext)
