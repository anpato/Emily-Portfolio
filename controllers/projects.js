const { GetProjects, ViewProject } = require('../queries/projects')

const router = require('express').Router()

const methods = [
  { method: 'get', path: '/', middleware: [], fn: GetProjects },
  { method: 'get', path: '/:project_id', middleware: [], fn: ViewProject }
]

methods.forEach((m) => router[m.method](m.path, m.middleware || [], m.fn))

module.exports = {
  path: '/projects',
  router
}
