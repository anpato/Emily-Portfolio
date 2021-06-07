import { authTypes } from '../types'

export const SetAuthForm = (name, value) => ({
  type: authTypes.SET_AUTH_FORM,
  payload: { name, value }
})

export const ToggleAuthenticated = (value) => ({
  type: authTypes.TOGGLE_AUTHENTICATED,
  payload: value
})

export const SetCurrentUser = (value) => ({
  type: authTypes.SET_CURRENT_USER,
  payload: value
})

export const ResetAuth = () => ({
  type: authTypes.RESET_AUTH
})
