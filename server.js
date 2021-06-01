const express = require('express')
const dependencies = require('./dependencies')
const router = require('./router')
const path = require('path')
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
    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static(path.join(__dirname, 'client/build')))
      this.app.get('*', (req, res) => {
        res.sendFile(path.join(`${__dirname}/client/build/index.html`))
      })
    }
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
