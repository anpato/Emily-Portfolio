require('dotenv').config()

module.exports = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  awsSecret: process.env.AWS_SECRET,
  awsBucket: process.env.AWS_BUCKET,
  awsRegion: process.env.AWS_REGION,
  appSecret: process.env.APP_SECRET,
  saltRound: parseInt(process.env.SALT_ROUNDS) || 10
}
