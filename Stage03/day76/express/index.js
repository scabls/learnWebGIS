const path = require('path')
const express = require('express')
const cors = require('cors') // 解决跨域问题,需要安装cors包
// 导入路由模块
const router = require('./src/routes/admin')

const app = express()
// 这个中间件用来解析请求体中的json数据
app.use(express.json())
// 这个中间件用来解析请求体中的模拟表单数据
app.use(express.urlencoded({ extended: true }))
// 解决跨域问题
app.use(cors())
// 处理静态资源的中间件
app.use(express.static(path.resolve(__dirname, 'public')))
// 注册路由
app.use('/api/admin', router)

const port = 3001

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
// 错误处理中间件
app.use(require('./src/middleware/errorHandler'))
