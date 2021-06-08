const { readToken, verifyToken } = require('../middleware')
const {
  GetMessages,
  ViewMessage,
  MarkMessage,
  DeleteMessages
} = require('../queries/messages')
const { controllerBuilder } = require('../utils')
const router = require('express').Router()

const middleware = [readToken, verifyToken]

const methods = [
  {
    method: 'get',
    path: '/',
    middleware,
    fn: GetMessages
  },
  {
    method: 'get',
    path: '/:message_id',
    middleware,
    fn: ViewMessage
  },
  { method: 'put', path: '/mark/:message_id', middleware, fn: MarkMessage },
  { method: 'delete', path: '/trash', middleware, fn: DeleteMessages }
]

module.exports = {
  path: '/messages',
  router: controllerBuilder(methods, router)
}
