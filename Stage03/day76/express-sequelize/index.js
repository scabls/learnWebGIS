require('./src/models/sync') // 同步数据库模型
const path = require('path')
// 引入express模块
const express = require('express')
// 引入cors模块，处理跨域请求
const cors = require('cors')
const errorHandler = require('./src/middlewares/errorHandler') //单独封装的错误处理中间件
const listRouter = require('./src/routers/list') // 引入list路由器

// 创建一个express实例
const app = express()

// 侦听端口号为3002
const port = 3002
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// 注册中间件
app.use(cors()) // 允许跨域请求
app.use(express.json()) //解析json请求体
app.use(express.urlencoded({ extended: true })) //解析模拟表单请求体
app.use(express.static(path.join(__dirname, 'public'))) //处理静态文件

// 注册路由器
app.use('/api/list', listRouter) // 注册list路由器

// 最后放置的中间件，处理错误
app.use(errorHandler)
