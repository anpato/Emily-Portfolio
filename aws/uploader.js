const { S3 } = require('aws-sdk')
const { accessKeyId, awsSecret, awsRegion, awsBucket } = require('../env')
const { genMetatype } = require('../utils')

class Uploader {
  constructor(accessKeyId, secret, region, bucket) {
    this.s3 = new S3({ accessKeyId, secretAccessKey: secret, region })
    this.bucket = bucket
  }

  async upload(file, projectId) {
    try {
      console.log(this.bucket)
      let filename = `resources/${projectId}/${file.originalname}`
      const fileType = genMetatype(file.originalname)
      const job = await this.s3
        .upload({
          Body: file.buffer,
          Key: filename,
          ACL: 'public-read',
          ContentType: `${fileType}/${file.originalname.split('.')[1]}`,
          Bucket: this.bucket
        })
        .promise()
      return { location: job.Location, filename }
    } catch (error) {
      throw error
    }
  }
  async destroyFile(filename) {
    try {
      const deleted = await this.s3
        .deleteObject({ Bucket: this.bucket, Key: filename })
        .promise()
      return deleted.DeleteMarker
    } catch (error) {
      throw error
    }
  }
}

module.exports = new Uploader(accessKeyId, awsSecret, awsRegion, awsBucket)
