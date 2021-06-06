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

export const UploadProject = async (formData) => {
  try {
    const res = await api.post('/projects', formData)
    const data = res.data
    if (data.assets) {
      return { ...data.project, assets: data.assets }
    }
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteProject = async (projectId) => {
  try {
    const res = await api.delete(`/projects/${projectId}`)
    return res.data.payload
  } catch (error) {
    throw error
  }
}
