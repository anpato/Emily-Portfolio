import { uploadTypes } from '../types'

const iState = {
  files: [],
  title: '',
  description: '',
  isEdit: false
}

export const UploadReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case uploadTypes.APPEND_FILE_LIST:
      return { ...state, files: payload }
    case uploadTypes.UPLOAD_CHANGE:
      return { ...state, [payload.name]: payload.value }
    case uploadTypes.TOGGLE_EDIT:
      return { ...state, isEdit: payload }
    case uploadTypes.PRELOAD_FORM:
      if (!payload) {
        return iState
      }
      let obj = {}
      Object.keys(payload).forEach((k) => (obj[k] = payload[k]))

      return { ...state, ...obj }
    default:
      return state
  }
}
