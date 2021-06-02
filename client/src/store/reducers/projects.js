import { projectTypes } from '../types'

const iState = {
  projects: [],
  currentProjectView: null,
  targetItem: null
}

export const ProjectReducer = (state = iState, { type, payload }) => {
  switch (type) {
    case projectTypes.GET_PROJECTS:
      return { ...state, projects: payload }
    case projectTypes.SELECT_PROJECT:
      let curState = !payload
        ? {
            currentProjectView: null,
            targetItem: null
          }
        : { currentProjectView: payload }

      return { ...state, ...curState }
    case projectTypes.SET_TARGET_ITEM:
      return { ...state, targetItem: payload }
    default:
      return state
  }
}
