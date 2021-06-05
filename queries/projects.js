const { Op } = require('sequelize')
const uploader = require('../aws/uploader')
const { Project, ProjectAsset } = require('../models')
const { genMetatype } = require('../utils')

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
      const uploads = await Promise.all(
        files.map(async (f) => await uploader.upload(f, req.params.project_id))
      )
      let formattedFiles = uploads.map((data) => ({
        fileName: data.filename,
        project_id: req.params.project_id,
        metadata: {
          src: `https://d2okcu8v62pl37.cloudfront.net/${data.filename}`,
          metaType: genMetatype(data.filename)
        }
      }))
      await ProjectAsset.bulkCreate(formattedFiles)
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

module.exports = {
  GetProjects,
  ViewProject,
  UpdateProject
}
