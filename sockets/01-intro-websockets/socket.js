export class Socket {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      socket.on('message-to-server', (data) => {
        console.log('Message received:', data);
        
        this.io.emit('message-from-server', {
          message: `Server received: ${data.message}`,
          timestamp: new Date().toISOString()
        });
      });
    })
  }
}