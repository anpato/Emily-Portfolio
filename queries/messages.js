const { Message, Sequelize } = require('../models')
const { Op } = require('sequelize')
const GetMessages = async (req, res) => {
  const { page, limit } = req.query
  let offset = page == 1 ? 0 : parseInt(page) * parseInt(limit)
  try {
    if (!page && !limit) {
      return res.status(400).send({ msg: 'Invalid Payload' })
    }

    const messages = await Message.findAndCountAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'createdAt',
        'unread',
        'senderName',
        [Sequelize.fn('LEFT', Sequelize.col('message'), 50), 'message']
      ],
      limit: parseInt(limit),
      offset: offset,
      where: { userId: res.locals.user.id }
    })
    res.send({
      messages: messages.rows,
      totalMessages: messages.count,
      totalPages: Math.floor(messages.count / parseInt(limit))
    })
  } catch (error) {
    throw error
  }
}

const ViewMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.message_id)
    res.send(message)
  } catch (error) {
    throw error
  }
}

const ReplyMessage = async (req, res) => {
  try {
    // TODO Find Way to reply in app vs email
  } catch (error) {}
}

const MarkMessage = async (req, res) => {
  const { readStatus } = req.query
  let status = readStatus == 'true' ? true : false
  try {
    const message = await Message.update(
      { unread: status },
      { where: { id: req.params.message_id }, returning: true }
    )
    res.send(message)
  } catch (error) {
    throw error
  }
}

const DeleteMessages = async (req, res) => {
  try {
    const ids = req.body.ids
    await Message.destroy({ where: { id: { [Op.in]: ids } } })
    res.send({ payload: ids })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetMessages,
  ViewMessage,
  MarkMessage,
  DeleteMessages
}
