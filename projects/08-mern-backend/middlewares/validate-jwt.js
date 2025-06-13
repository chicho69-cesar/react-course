import { request, response } from 'express'
import jwt from 'jsonwebtoken'

export const validateJWT = (req = request, res = response, next) => {
  const authorization = req.header('Authorization')
  
  if (!authorization) {
    return res.status(401).json({
      ok: false,
      msg: 'No token provided in the request'
    })
  }

  const token = authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token provided in the request'
    })
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)

    req.uid = uid
    req.name = name
  } catch (error) {
    console.error('Error validating JWT:', error)
    
    return res.status(401).json({
      ok: false,
      msg: 'Invalid session'
    })
  }

  next()
}
