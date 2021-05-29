import { projectTypes } from '../types'

export const setProjects = (data) => ({
  type: projectTypes.GET_PROJECTS,
  payload: data
})
