import cors from 'cors'
import express from 'express'
import http from 'node:http'
import path from 'node:path'
import { Server as SocketServer } from 'socket.io'

import { Sockets } from './sockets.js'

export class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.server = http.createServer(this.app)

    this.io = new SocketServer(this.server, {
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
      }
    })

    this.sockets = new Sockets(this.io)
  }

  middlewares() {
    this.app.use(express.static(path.join(process.cwd(), 'public')))

    this.app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }))
  }

  execute() {
    this.middlewares()

    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`)
    })
  }
}