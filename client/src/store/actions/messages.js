import { messageTypes } from '../types'

export const SetMessages = (value) => ({
  type: messageTypes.GET_MESSAGES,
  payload: value
})

export const SetMesasgeView = (value) => ({
  type: messageTypes.SET_MESSAGE_VIEW,
  payload: value
})

export const ChangePage = (value) => ({
  type: messageTypes.CHANGE_PAGE,
  payload: value
})

export const ChangeLimit = (value) => ({
  type: messageTypes.CHANGE_LIMIT,
  payload: value
})
