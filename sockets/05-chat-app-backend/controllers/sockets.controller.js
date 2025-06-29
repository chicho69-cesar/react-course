import { Message } from '../models/message.model.js'
import { User } from '../models/user.model.js'

export class SocketsController {
  async userConnected(ui) {
    const user = await User.findByPk(ui)

    if (user) {
      user.online = true
      await user.save()
    }

    return user
  }

  async userDisconnected(ui) {
    const user = await User.findByPk(ui)

    if (user) {
      user.online = false
      await user.save()
    }

    return user
  }

  async getUsers() {
    const users = await User.findAll({
      where: { online: true },
      attributes: ['uid', 'name', 'email', 'online'],
      order: [['online', 'DESC']]
    })

    return users
  }

  async saveMessage(payload) {
    try {
      const { from, to, message } = payload
      const newMessage = await Message.create({
        from,
        to,
        message
      })

      return newMessage
    } catch (error) {
      console.error('Error saving message:', error)
      return null
    }
  }
}