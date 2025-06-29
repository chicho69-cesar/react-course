import cors from 'cors'
import express from 'express'
import http from 'node:http'
import path from 'node:path'
import { Server as SocketServer } from 'socket.io'

import { db } from './database/config.js'
import { AuthRoutes } from './routes/auth.routes.js'
import { MessagesRoutes } from './routes/messages.routes.js'
import { Sockets } from './sockets.js'

export class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080

    this.dbConnection()

    this.server = http.createServer(this.app)

    this.io = new SocketServer(this.server, {
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
      }
    })

    this.sockets = new Sockets(this.io)
    this.authRoutes = new AuthRoutes()
    this.messagesRoutes = new MessagesRoutes()
  }

  async dbConnection() {
    try {
      await db.authenticate()
      db.sync()

      console.log('Database connected successfully')
    } catch (error) {
      console.error('Database connection error:', error)
    }
  }

  middlewares() {
    this.app.use(express.static(path.join(process.cwd(), 'public')))
    this.app.use(express.json())

    this.app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }))

    this.app.use('/api/auth', this.authRoutes.router)
    this.app.use('/api/messages', this.messagesRoutes.router)
  }

  execute() {
    this.middlewares()

    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`)
    })
  }
}
