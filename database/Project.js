const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
	{
		title: String,
		image_url: String,
		description: String,
		carousel: Boolean
	},
	{
		timestamps: true
	}
)

module.exports = ProjectSchema
