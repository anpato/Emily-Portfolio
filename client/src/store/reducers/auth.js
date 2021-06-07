import { authTypes } from '../types'

const iState = {
  email: '',
  password: '',
  isAuthenticated: false,
  currentUser: null
}

export const AuthReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case authTypes.SET_AUTH_FORM:
      return { ...state, [payload.name]: payload.value }
    case authTypes.RESET_AUTH:
      return { ...iState, isAuthenticated: payload || false }
    case authTypes.TOGGLE_AUTHENTICATED:
      return { ...state, isAuthenticated: payload }
    case authTypes.SET_CURRENT_USER:
      return { ...state, currentUser: payload }
    default:
      return state
  }
}
