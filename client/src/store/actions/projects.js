import { projectTypes } from '../types'

export const SetProjects = (data) => ({
  type: projectTypes.GET_PROJECTS,
  payload: data
})

export const SelectProject = (proj) => ({
  type: projectTypes.SELECT_PROJECT,
  payload: proj
})

export const TargetDisplayItem = (item) => ({
  type: projectTypes.SET_TARGET_ITEM,
  payload: item
})
