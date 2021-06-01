import { contactTypes } from '../types'

const iState = {
  name: '',
  email: '',
  message: ''
}

export const ContactReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case contactTypes.SET_CONTACT:
      return { ...state, [payload.name]: payload.value }
    default:
      return state
  }
}
