const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { appSecret } = require('../env')
const genPassword = async (password) => {
  return await bcrypt.hash(password, 12)
}

const cmpPassword = async (strPassword, hash) => {
  return await bcrypt.compare(strPassword, hash)
}

const genToken = (payload) => {
  return jwt.sign(payload, appSecret)
}

const verifyToken = (req, res, next) => {
  try {
    const { token } = res.locals
    const user = jwt.verify(token, appSecret)
    res.locals.user = user
    next()
  } catch (error) {
    return res.status(403).send({ msg: 'Forbidden' })
  }
}

const readToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    res.locals.token = token
    next()
  } catch (error) {
    console.log(error)
    res.status(403).json({ msg: 'Forbidden' })
  }
}

module.exports = {
  genPassword,
  cmpPassword,
  readToken,
  verifyToken,
  genToken
}
