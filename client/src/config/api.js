import axios from 'axios'
const baseURL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.origin}/api`
    : 'http://localhost:3001/api'

const api = axios.create({ baseURL })

export default api
