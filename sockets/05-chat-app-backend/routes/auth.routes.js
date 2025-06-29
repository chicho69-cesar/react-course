import { Router } from 'express'
import { check } from 'express-validator'

import { AuthController } from '../controllers/auth.controller.js'
import { ValidateFields } from '../middlewares/validate-fields.js'
import { ValidateJWT } from '../middlewares/validate-jwt.js'

export class AuthRoutes {
  constructor() {
    this.router = Router()
    this.authController = new AuthController()

    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.post(
      '/register',
      [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        ValidateFields.validateFields
      ],
      this.authController.createUser
    )

    this.router.post(
      '/login',
      [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        ValidateFields.validateFields
      ],
      this.authController.loginUser
    )

    this.router.get(
      '/renew',
      [ValidateJWT.validateJWT],
      this.authController.renewToken
    )
  }
}
