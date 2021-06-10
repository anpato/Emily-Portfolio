import { messageTypes } from '../types'

const iState = {
  messages: [],
  currentPage: 1,
  totalMessages: 0,
  limit: 10,
  totalPages: null,
  currentMessageView: null
}

export const MessageReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case messageTypes.GET_MESSAGES:
      return {
        ...state,
        messages: payload.messages,
        totalPages: payload.totalPages,
        totalMessages: payload.totalMessages
      }
    case messageTypes.SET_MESSAGE_VIEW:
      return { ...state, currentMessageView: payload }
    case messageTypes.CHANGE_LIMIT:
      return { ...state, limit: payload }
    case messageTypes.CHANGE_PAGE:
      return { ...state, currentPage: payload }
    default:
      return state
  }
}
