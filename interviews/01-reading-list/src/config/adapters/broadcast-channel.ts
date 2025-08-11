export class BroadcastService {
  private channel: BroadcastChannel

  constructor(channelName: string) {
    this.channel = new BroadcastChannel(channelName)
  }

  send(type: string, data: unknown) {
    this.channel.postMessage({ type, data })
  }

  listen(callback: (event: MessageEvent) => void) {
    this.channel.addEventListener('message', callback)
  }

  close() {
    this.channel.close()
  }
}

export const readingBroadcast = new BroadcastService('reading-list')
export const filtersBroadcast = new BroadcastService('filters')
