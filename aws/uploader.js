const { S3 } = require('aws-sdk')

class Uploader {
  constructor(accessKeyId, secret, region, bucket) {
    this.s3 = new S3({ accessKeyId, secretAccessKey: secret, region })
    this.bucket = bucket
  }

  async upload(file, projectId) {
    try {
      let filename = `${projectId}/${file.originalname}`
      const job = await this.s3
        .upload({
          Body: file.buffer,
          Key: filename,
          ContentType: file.mimeType,
          Bucket: this.bucket
        })
        .promise()
      return job.Location
    } catch (error) {
      throw error
    }
  }
}

module.exports = Uploader
