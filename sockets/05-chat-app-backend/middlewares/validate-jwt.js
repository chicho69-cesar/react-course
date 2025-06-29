import { request, response } from 'express'
import jwt from 'jsonwebtoken'

export class ValidateJWT {
  static validateJWT(req = request, res = response, next) {
    try {
      const authorization = req.header('Authorization')
      const token = authorization && authorization.startsWith('Bearer ') ? authorization.split(' ')[1] : null

      if (!token) {
        return res.status(401).json({
          ok: false,
          msg: 'Unauthorized'
        })
      }

      const { uid } = jwt.verify(token, process.env.JWT_KEY)
      req.uid = uid

      next()
    } catch (error) {
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized'
      })
    }
  }
}