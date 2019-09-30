const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
	{
		title: String,
		images: [{ type: String }],
		description: String,
		carousel: Boolean
	},
	{
		timestamps: true
	}
)

module.exports = ProjectSchema
