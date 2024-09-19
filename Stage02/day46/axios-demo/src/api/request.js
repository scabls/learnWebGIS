// 导入axios
import axios from 'axios'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3003',
  // 设置访问时限
  timeout: 5000,
})

// 设置拦截器
// 请求拦截器

// 相应拦截器
instance.interceptors.response.use(
  // response就是原始响应数据
  // 这里返回的数据将会是axios.get返回的promise的兑现值,会被then方法接收到
  response => response.data,

  // error表示错误信息
  error => Promise.reject(error)
)

// 导出axios实例
export default instance
