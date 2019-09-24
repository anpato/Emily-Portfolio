const ProjectRouter = require('express').Router()
const { Project } = require('../database/Schema')

ProjectRouter.get('/', async (req, res) => {
	try {
		if (req.query.carousel) {
			res.send(await Project.find({ carousel: true }))
		} else {
			res.send(await Project.find())
		}
	} catch (error) {
		throw error
	}
})

ProjectRouter.post('/', async (req, res) => {
	try {
		const newProject = new Project(req.body)
		await newProject.save()

		res.send(newProject)
	} catch (error) {
		throw error
	}
})

ProjectRouter.put('/:project_id', async (req, res) => {
	try {
		const project = await Project.findByIdAndUpdate(
			req.params.project_id,
			req.body,
			{ useFindAndModify: false }
		)
		res.send(project)
	} catch (error) {
		throw error
	}
})

ProjectRouter.delete('/:project_id', async (req, res) => {
	try {
		await Project.findByIdAndDelete(req.params.project_id)
		res.send({ msg: 'Project Deleted' })
	} catch (error) {
		throw error
	}
})

module.exports = ProjectRouter
