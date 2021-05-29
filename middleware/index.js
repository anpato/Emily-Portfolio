const genPassword = async (password) => {}

const cmpPassword = async (strPassword, hash) => {}

const readToken = (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(' ')[1]
    res.locals.token = token
    next()
  } catch (error) {
    res.status(403).json({ msg: 'Forbidden' })
  }
}

const verifyToken = (rew, res, next) => {
  try {
    const { token } = res.locals
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized' })
  }
}

module.exports = {
  genPassword,
  cmpPassword,
  readToken,
  verifyToken
}
