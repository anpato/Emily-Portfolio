import api from '../config/api'

export const GetProjectData = async () => {
  try {
    const res = await api.get('/projects')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetProjectById = async (projectId) => {
  try {
    const res = await api.get(`/projects/${projectId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateProject = async (formData, projectId) => {
  try {
    const res = await api.put(`/projects/${projectId}`, formData)
    return res.data
  } catch (error) {
    throw error
  }
}
