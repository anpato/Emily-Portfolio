import { uiTypes } from '../types'

const iState = {
  policyShow: false,
  drawerShow: false
}

export const UIReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case uiTypes.TOGGLE_POLICY:
      return { ...state, policyShow: payload }
    case uiTypes.TOGGLE_DRAWER:
      return { ...state, drawerShow: payload }
    default:
      return state
  }
}
