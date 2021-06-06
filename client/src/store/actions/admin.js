import { adminProjectTypes } from '../types'

export const SelectProjectPreview = (data) => ({
  type: adminProjectTypes.SELECT_ADMIN_PROJECT,
  payload: data
})

export const TargetAdminDisplay = (data) => ({
  type: adminProjectTypes.TARGET_ITEM,
  payload: data
})

export const RemoveProject = (id) => ({
  type: adminProjectTypes.DELETE_PROJECT,
  payload: id
})

export const GetDashProjects = (data) => ({
  type: adminProjectTypes.GET_DASH_PROJECTS,
  payload: data
})

export const SwapUpdate = (data) => ({
  type: adminProjectTypes.SWAP_UPDATE,
  payload: data
})

export const AppendProject = (data) => ({
  type: adminProjectTypes.APPEND_PROJECT,
  payload: data
})
