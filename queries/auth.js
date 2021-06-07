const { cmpPassword, genToken, genPassword } = require('../middleware')
const { User } = require('../models')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (user && (await cmpPassword(req.body.password, user.passwordDigest))) {
      const payload = {
        id: user.id,
        email: user.email
      }
      const token = genToken(payload)
      return res.send({ payload, token })
    }
    return res.status(401).send({ msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ msg: 'Server Error' })
  }
}

const CheckSession = async (req, res) => {
  try {
    const { user } = res.locals
    if (user && (await User.findByPk(user.id))) {
      const token = genToken(user)
      return res.send({ payload: user, token })
    }
    return res.status(403).send({ msg: 'Forbidden' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      passwordDigest: req.body.password
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  CheckSession,
  Register
}
