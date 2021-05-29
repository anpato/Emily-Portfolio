const router = require('express').Router()
const fs = require('fs')

let baseDir = `${__dirname}/controllers`

fs.readdirSync(baseDir).forEach((file) => {
  const controller = require(`${baseDir}/${file}`)
  if (controller.path && controller.router) {
    router.use(controller.path, controller.router)
  }
})

module.exports = router
