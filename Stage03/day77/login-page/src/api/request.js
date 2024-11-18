import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
  withCredentials: true, //允许跨域请求携带cookie
})

instance.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err),
)

export default instance
