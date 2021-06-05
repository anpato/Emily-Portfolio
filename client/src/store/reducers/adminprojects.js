import { adminProjectTypes } from '../types'

const iState = {
  selectedProject: null,
  targetItem: null,
  projects: []
}

export const AdminProjectReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case adminProjectTypes.SELECT_ADMIN_PROJECT:
      return { ...state, selectedProject: payload }
    case adminProjectTypes.TARGET_ITEM:
      return { ...state, targetItem: payload }
    case adminProjectTypes.GET_DASH_PROJECTS:
      return { ...state, projects: payload }
    case adminProjectTypes.DELETE_PROJECT:
      const projs = state.projects.filter((p) => p.id !== payload)
      return { ...state, projects: projs }
    case adminProjectTypes.SWAP_UPDATE:
      let target = state.projects.findIndex((p) => p.id === payload.id)
      let updated = [...state.projects]
      updated.splice(target, 1, payload)
      return { ...state, projects: updated }
    default:
      return state
  }
}
