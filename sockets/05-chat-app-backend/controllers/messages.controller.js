import { request, response } from 'express'
import { Op } from 'sequelize'

import { Message } from '../models/message.model.js'

export class MessagesController {
  async getChat(req = request, res = response) {
    try {
      const uid = req.uid
      const messageFrom = req.params.from

      const lastThirtyMessages = await Message.findAll({
        where: {
          [Op.or]: [
            { from: uid, to: messageFrom },
            { from: messageFrom, to: uid }
          ]
        },
        order: [['created_at', 'DESC']],
        limit: 30
      })

      return res.status(200).json({
        ok: true,
        messages: lastThirtyMessages
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        ok: false,
        msg: 'Error retrieving chat messages'
      })
    }
  }
}