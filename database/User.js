const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		name: {
			first: {
				type: String,
				required: true
			},
			last: {
				type: String,
				required: true
			}
		},
		password: {
			type: String,
			required: true
		},
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "can't be blank"],
			match: [/\S+@\S+\.\S+/, 'is invalid'],
			index: true
		},
		username: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "can't be blank"],
			match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
			index: true
		}
	},
	{ timestamps: true }
)

module.exports = UserSchema
