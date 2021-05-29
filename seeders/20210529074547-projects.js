'use strict'
const projects = require('../projects.json')
const uuid = require('uuid').v4
const { genMetatype } = require('../utils')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let assets = []
    let projectData = projects.map((proj) => {
      let pId = uuid()
      let createdAt = proj.createdAt['$date']
      let updatedAt = proj.updatedAt['$date']
      assets.push(
        ...proj.images.map((im) => {
          let url = im.split('/')
          let fileName = url[url.length - 1]
          let metaType = genMetatype(fileName)
          let src = `https://d2zapy0kvendcq.cloudfront.net/${fileName}`

          return {
            id: uuid(),
            file_name: fileName,
            metadata: JSON.stringify({ src, metaType }),
            project_id: pId,
            createdAt,
            updatedAt
          }
        })
      )
      return {
        id: pId,
        title: proj.title,
        description: proj.description,
        createdAt,
        updatedAt
      }
    })
    await queryInterface.bulkInsert('projects', projectData)
    await queryInterface.bulkInsert('project_assets', assets)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projects')
    await queryInterface.bulkDelete('project_assets')
  }
}
