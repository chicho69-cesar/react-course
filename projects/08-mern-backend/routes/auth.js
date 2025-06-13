import { Router } from 'express'
import { check } from 'express-validator'

import { createUser, loginUser, renewToken } from '../controllers/auth.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

const router = Router()

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  createUser
)

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  loginUser
)

router.get(
  '/renew',
  validateJWT,
  renewToken
)

export default router
