import bcrypt from 'bcryptjs'
import { request, response } from 'express'

import { JWT } from '../helpers/jwt.js'
import { User } from '../models/user.model.js'

export class AuthController {
  async createUser(req = request, res = response) {
    try {
      const { email, password, name } = req.body

      const existsUser = await User.findOne({ where: { email } })

      if (existsUser) {
        return res.status(400).json({
          ok: false,
          msg: 'User already exists'
        })
      }

      const user = User.build({ email, password, name })
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync(password, salt)
      await user.save()

      const token = await JWT.generateJWT(user.uid)

      return res.status(201).json({
        ok: true,
        user,
        token
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        ok: false,
        msg: 'Error creating user'
      })
    }
  }

  async loginUser(req = request, res = response) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.status(400).json({
          ok: false,
          msg: 'Invalid credentials'
        })
      }

      const validPassword = bcrypt.compareSync(password, user.password)

      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: 'Invalid credentials'
        })
      }

      const token = await JWT.generateJWT(user.uid)

      return res.status(200).json({
        ok: true,
        user,
        token
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        ok: false,
        msg: 'Error logging in'
      })
    }
  }

  async renewToken(req = request, res = response) {
    try {
      const uid = req.uid
      const user = await User.findByPk(uid)

      if (!user) {
        return res.status(404).json({
          ok: false,
          msg: 'User not found'
        })
      }

      const token = await JWT.generateJWT(user.uid)

      return res.status(200).json({
        ok: true,
        user,
        token
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        ok: false,
        msg: 'Error renewing token'
      })
    }
  }
}