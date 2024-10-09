import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://project.x-zd.net:3001/apis',
  timeout: 5000,
})

instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default instance
