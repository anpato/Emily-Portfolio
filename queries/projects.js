const { Op } = require('sequelize')
const { Project, ProjectAsset } = require('../models')
const { genMetatype, uploadBulk } = require('../utils')

const GetProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
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
      include: [
        {
          model: ProjectAsset,
          as: 'assets',
          attributes: ['id', 'metadata', 'fileName']
        }
      ]
    })
    res.send(project)
  } catch (error) {
    throw error
  }
}

const UpdateProject = async (req, res) => {
  try {
    const files = req.files
    const assets =
      typeof req.body.assets === 'string'
        ? [JSON.parse(req.body.assets)]
        : req.body.assets && req.body.assets.map((a) => JSON.parse(a))
    const currAssets = await ProjectAsset.findAll({
      where: { project_id: req.params.project_id },
      raw: true
    })
    await Project.update(
      { title: req.body.title, description: req.body.description },
      { where: { id: req.params.project_id }, returning: true }
    )
    let toDestroy = currAssets.filter((asset) => {
      if (assets) {
        return !assets.find((a) => a.name === asset.fileName)
      }
      return asset
    })
    if (toDestroy.length) {
      await ProjectAsset.destroy({
        where: { id: { [Op.in]: toDestroy.map((d) => d.id) } },
        individualHooks: true
      })
    }

    if (files.length) {
      const uploaded = await uploadBulk(files, req.params.project_id)
      await ProjectAsset.bulkCreate(uploaded)
    }

    const proj = await Project.findByPk(req.params.project_id, {
      include: [
        { model: ProjectAsset, as: 'assets', attributes: ['id', 'metadata'] }
      ]
    })
    setTimeout(() => {
      res.send(proj)
    }, 3000)
  } catch (error) {
    throw error
  }
}

const UploadProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body })
    const files = typeof req.files === 'string' ? [req.files] : req.files
    if (files.length) {
      const uploaded = await uploadBulk(files, project.dataValues.id)
      const assets = await ProjectAsset.bulkCreate(uploaded)
      return res.send({ project, assets })
    }
    res.send(project)
  } catch (error) {
    throw error
  }
}

const DeleteProject = async (req, res) => {
  try {
    await Project.destroy({ where: { id: req.params.project_id } })
    res.send({ payload: req.params.project_id })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetProjects,
  ViewProject,
  UpdateProject,
  UploadProject,
  DeleteProject
}
