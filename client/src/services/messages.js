import api from '../config/api'

export const GetMessages = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/messages?page=${page}&limit=${limit}`)
    return res.data
  } catch (error) {
    throw error
  }
}
