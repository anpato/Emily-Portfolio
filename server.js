const express = require('express')
const dependencies = require('./dependencies')
const router = require('./router')

class Server {
  constructor(port) {
    this.port = port
    this.app = express()
  }

  initDependencies() {
    this.app.use(dependencies)
  }

  initRoutes() {
    this.app.use('/api', router)
  }

  start() {
    this.initDependencies()
    this.initRoutes()
    this.app.listen(this.port, () =>
      console.log(`Server Running: ${this.port}`)
    )
  }
}

new Server(process.env.PORT || 3001).start()
