const AuthRouter = require('express').Router()
const { User, Project } = require('../database/Schema')
const { passport, signToken } = require('../auth/auth')
const bcrypt = require('bcryptjs')
const SaltFactor = parseInt(process.env.SALT_FACTOR)

AuthRouter.post('/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error('An Error Occurred')
				return next(error)
			}

			req.login(
				user,
				{
					session: false
				},
				async (error) => {
					if (error) return next(error)
					const { username, id } = user
					const payload = { username, id }
					const token = signToken(payload)
					// return the user object
					return res.json({ user, token })
				}
			)
		} catch (error) {
			return next(error)
		}
	})(req, res, next)
})

AuthRouter.post('/signup', async (req, res, next) => {
	passport.authenticate('signup', async (err, user, info) => {
		try {
			if (!user || err) {
				const msg = `${
					err.errors.username
						? err.errors.username.properties.value
						: err.errors.email.properties.value
				} ${
					err.errors.username
						? err.errors.username.message
						: err.errors.email.message
				}`
				const error = new Error(msg)
				error.status = 400
				return next(res.status(400).send({ error: msg }))
			}
			// console.log('looking for user', user)
			return res.json({ msg: 'user created', user: user })
		} catch (error) {
			return next(error)
		}
	})(req, res, next)
})

AuthRouter.put('/:user_id', async (req, res) => {
	try {
		const user = await User.findById(req.params.user_id)
		if (req.body.password) {
			const body = req.body
			const password = bcrypt.hashSync(req.body.password, SaltFactor)
			const updatedUser = await user.update({ body, password })
			await updatedUser.save()
			res.send(updatedUser)
		} else {
			await user.updateOne(req.body)
			res.send({ msg: 'Account updated successfully' })
		}
	} catch (error) {
		throw error
	}
})

module.exports = AuthRouter
