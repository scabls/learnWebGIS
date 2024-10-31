const axios = require('axios')

const instance = axios.create({
  timeout: 5000,
})

instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

module.exports = instance
