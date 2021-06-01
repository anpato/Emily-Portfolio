import { contactTypes } from '../types'

export const HandleContactForm = (name, value) => ({
  type: contactTypes.SET_CONTACT,
  payload: { name, value }
})
