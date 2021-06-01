import { uiTypes } from '../types'

const iState = {
  policyShow: false
}

export const UIReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case uiTypes.TOGGLE_POLICY:
      return { ...state, policyShow: payload }
    default:
      return state
  }
}
