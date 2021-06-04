import { uiTypes } from '../types'

export const TogglePolicy = (value) => ({
  type: uiTypes.TOGGLE_POLICY,
  payload: value
})

export const ToggleDrawer = (value) => ({
  type: uiTypes.TOGGLE_DRAWER,
  payload: value
})

export const ToggleDelete = (value) => ({
  type: uiTypes.TOGGLE_DELETE,
  payload: value
})
