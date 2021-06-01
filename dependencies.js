module.exports = [
  require('cors')(),
  require('body-parser').json(),
  require('morgan')('dev'),
  require('compression')()
  // require('helmet')({ contentSecurityPolicy: 'unsafe-inline' })
]
