import api from '../config/api'

export const SignIn = async (data) => {
  try {
    const res = await api.post('/auth/login', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const ValidateSession = async () => {
  try {
    const res = await api.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}
