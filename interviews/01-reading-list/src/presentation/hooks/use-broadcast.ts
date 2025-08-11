import { useEffect, useRef } from 'react'
import { BroadcastService } from '../../config/adapters/broadcast-channel'

export function useBroadcast(channelName: string) {
  const broadcastRef = useRef<BroadcastService | null>(null)

  useEffect(() => {
    broadcastRef.current = new BroadcastService(channelName)

    return () => {
      broadcastRef.current?.close()
    }
  }, [channelName])

  const send = (type: string, data: unknown) => {
    broadcastRef.current?.send(type, data)
  }

  const listen = (callback: (event: MessageEvent) => void) => {
    broadcastRef.current?.listen(callback)
  }

  return { send, listen }
}
