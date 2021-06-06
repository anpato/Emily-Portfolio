const {
  GetProjects,
  ViewProject,
  UpdateProject,
  UploadProject,
  DeleteProject
} = require('../queries/projects')
const multer = require('multer')
const router = require('express').Router()
const upload = multer({ storage: multer.memoryStorage() })
const methods = [
  { method: 'get', path: '/', middleware: [], fn: GetProjects },
  { method: 'get', path: '/:project_id', middleware: [], fn: ViewProject },
  {
    method: 'put',
    path: '/:project_id',
    middleware: [upload.array('uploads', 5)],
    fn: UpdateProject
  },
  {
    method: 'post',
    path: '/',
    middleware: [upload.array('uploads', 5)],
    fn: UploadProject
  },
  { method: 'delete', path: '/:project_id', fn: DeleteProject }
]

methods.forEach((m) => router[m.method](m.path, m.middleware || [], m.fn))

module.exports = {
  path: '/projects',
  router
}
