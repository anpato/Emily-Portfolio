import { projectTypes } from '../types'

const iState = {
  projects: [],
  currentProjectView: null
}

export const ProjectReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case projectTypes.GET_PROJECTS:
      return { ...state, projects: payload }
    case projectTypes.SELECT_PROJECT:
      return { ...state, currentProjectView: payload }
    default:
      return state
  }
}
