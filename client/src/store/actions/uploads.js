import { uploadTypes } from '../types'

export const UpdateFileList = (files) => ({
  type: uploadTypes.APPEND_FILE_LIST,
  payload: files
})

export const SetUploadForm = (name, value) => ({
  type: uploadTypes.UPLOAD_CHANGE,
  payload: { name, value }
})
