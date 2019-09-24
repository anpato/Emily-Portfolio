const mongoose = require('mongoose')

// models
const UserSchema = require('./User')
const ProjectSchema = require('./Project')
// models

const User = mongoose.model('users', UserSchema)
const Project = mongoose.model('projects', ProjectSchema)

module.exports = {
	User,
	Project
}
