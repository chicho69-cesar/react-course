import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import eventRoutes from './routes/events.js'
import { dbConnection } from './database/config.js'

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000

    // Middlewares
    this.middlewares()
    // DB Connection
    this.configureDB()
    // Routes
    this.routes()
  }

  async configureDB() {
    await dbConnection()
  }

  middlewares() {
    // CORS configuration
    this.app.use(cors())
    // URL encoded for POST requests with form data
    this.app.use(express.urlencoded({ extended: true }))
    // JSON parser for API requests
    this.app.use(express.json())
    // Enable the use of the public folder
    this.app.use(express.static('public'))
  }

  routes() {
    // Auth routes
    this.app.use('/api/auth', authRoutes)
    this.app.use('/api/events', eventRoutes)
  }

  listen() {
    this.app.listen((this.port), () => {
      console.log(`Server is running on port: ${this.port}`)
    })
  }
}

export default Server
