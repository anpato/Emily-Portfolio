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

module.exports = {
  genMetatype
}
