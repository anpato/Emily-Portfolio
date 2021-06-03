import { uploadTypes } from '../types'

const iState = {
  files: [],
  title: '',
  description: ''
}

export const UploadReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case uploadTypes.APPEND_FILE_LIST:
      return { ...state, files: payload }
    case uploadTypes.UPLOAD_CHANGE:
      return { ...state, [payload.name]: payload.value }
    default:
      return state
  }
}
