import { SocketsController } from './controllers/sockets.controller.js'
import { JWT } from './helpers/jwt.js'

export class Sockets {
  constructor(io) {
    this.io = io
    this.socketsController = new SocketsController()

    this.socketsEvents()
  }

  socketsEvents() {
    this.io.on('connection', async (socket) => {
      const [valid, uid] = JWT.verifyJWT(socket.handshake.query.token)

      if (!valid) {
        console.error('Invalid JWT token')
        return socket.disconnect()
      }

      await this.socketsController.userConnected(uid)
      socket.join(uid)

      this.io.emit('users-list', await this.socketsController.getUsers())

      socket.on('message', async (payload) => {
        const message = await this.socketsController.saveMessage(payload)

        this.io.to(payload.to).emit('message', message)
        this.io.to(payload.from).emit('message', message)
      })

      socket.on('disconnect', async () => {
        await this.socketsController.userDisconnected(uid)
        this.io.emit('users-list', await this.socketsController.getUsers())
      })
    })
  }
}