const { readToken, verifyToken } = require('../middleware')
const { Register, Login, CheckSession } = require('../queries/auth')
const { controllerBuilder } = require('../utils')

const router = require('express').Router()

const regOpts = {
  method: 'post',
  path: '/register',
  fn: Register
}

const methods = [
  { method: 'post', path: '/login', fn: Login },
  {
    method: 'get',
    path: '/session',
    middleware: [readToken, verifyToken],
    fn: CheckSession
  }
]

module.exports = {
  path: '/auth',
  router: controllerBuilder(
    process.env.NODE_ENV === 'production' ? methods : [...methods, regOpts],
    router
  )
}
