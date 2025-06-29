import { Router } from 'express'

import { MessagesController } from '../controllers/messages.controller.js'
import { ValidateJWT } from '../middlewares/validate-jwt.js'

export class MessagesRoutes {
  constructor() {
    this.router = Router()
    this.messagesController = new MessagesController()

    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get(
      '/:from',
      [ValidateJWT.validateJWT],
      this.messagesController.getChat
    )
  }
}
