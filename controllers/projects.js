const { GetProjects } = require('../queries/projects')

const router = require('express').Router()

const methods = [{ method: 'get', path: '/', middleware: [], fn: GetProjects }]

methods.forEach((m) => router[m.method](m.path, m.middleware || [], m.fn))

module.exports = {
  path: '/projects',
  router
}
