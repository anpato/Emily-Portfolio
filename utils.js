const path = require('path')

const imgExts = [
  '.jpg',
  '.png',
  '.gif',
  '.webp',
  '.tiff',
  '.psd',
  '.raw',
  '.bmp',
  '.heif',
  '.indd',
  '.jpeg 2000'
]
const videoExts = [
  '.mp4',
  '.3gp',
  '.ogg',
  '.wmv',
  '.webm',
  '.flv',
  '.avi',
  '.hdv'
]

const genMetatype = (file) => {
  return imgExts.includes(path.extname(file)) ? 'image' : 'video'
}

const uploadBulk = async (files, projectId) => {
  const uploader = require('./aws/uploader')
  const uploads = await Promise.all(
    files.map(async (f) => await uploader.upload(f, projectId))
  )
  return uploads.map((data) => ({
    fileName: data.filename,
    project_id: projectId,
    metadata: {
      src: `https://d2okcu8v62pl37.cloudfront.net/${data.filename}`,
      metaType: genMetatype(data.filename)
    }
  }))
}

module.exports = {
  genMetatype,
  uploadBulk
}
