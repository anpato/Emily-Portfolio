import axios from 'axios'
const baseURL =
  process.env.NODE_ENV === 'production'
    ? `https://emily-peres.herokuapp.com/api`
    : 'http://localhost:3001/api'

const api = axios.create({ baseURL })

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
