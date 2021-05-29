const { Project, ProjectAsset } = require('../models')

const GetProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      attributes: ['id', 'title', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: [
        { model: ProjectAsset, as: 'assets', attributes: ['id', 'metadata'] }
      ]
    })
    res.send(projects)
  } catch (error) {
    throw error
  }
}

const ViewProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.project_id, {
      include: [{ model: ProjectAsset, as: 'assets' }]
    })
    res.send(project)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetProjects,
  ViewProject
}
