import bcrypt from 'bcryptjs'
import { request, response } from 'express'

import { generateJWT } from '../helpers/jwt.js'
import { User } from '../models/user.js'

export const createUser = async (req = request, res = response) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        ok: false,
        msg: 'Email already exists'
      })
    }

    const user = new User({ name, email, password })

    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    const token = await generateJWT(user.id, user.name)

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      email: user.email,
      token
    })
  } catch (error) {
    console.error('Error creating user:', error)

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    })
  }
}

export const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid email or password'
      })
    }

    const isValidPassword = bcrypt.compareSync(password, existingUser.password)

    if (!isValidPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid email or password'
      })
    }

    const token = await generateJWT(existingUser.id, existingUser.name)

    return res.status(200).json({
      ok: true,
      uid: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      token
    })
  } catch (error) {
    console.error('Error logging in user:', error)

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    })
  }
}

export const renewToken = async (req = request, res = response) => {
  const { uid, name } = req

  try {
    const token = await generateJWT(uid, name)

    return res.status(200).json({
      ok: true,
      uid,
      name,
      token
    })
  } catch (error) {
    console.error('Error renewing token:', error)

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    })
  }
}
