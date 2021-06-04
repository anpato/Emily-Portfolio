import { uiTypes } from '../types'

const iState = {
  policyShow: false,
  drawerShow: false,
  toggleDelete: false
}

export const UIReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case uiTypes.TOGGLE_POLICY:
      return { ...state, policyShow: payload }
    case uiTypes.TOGGLE_DRAWER:
      return { ...state, drawerShow: payload }
    case uiTypes.TOGGLE_DELETE:
      return { ...state, toggleDelete: payload }
    default:
      return state
  }
}
