const path = require('path')
const express = require('express')
const cors = require('cors') // 解决跨域问题,需要安装cors包

// app就是一个express实例,即一个服务器实例
// 可以理解为后端用来处理前端请求的api层(后端路由器)
const app = express()
// 这个中间件用来解析请求体中的json数据
app.use(express.json())
// 这个中间件用来解析请求体中的模拟表单数据
app.use(express.urlencoded({ extended: true }))
// 解决跨域问题
app.use(cors())
// 处理静态资源的中间件
app.use(express.static(path.resolve(__dirname, 'public')))
// 中间件就是一个函数,它可以介入到请求-响应的生命周期中,可以对请求和响应进行处理
// 路由处理函数也可以认为是中间件

const port = 3001

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
app.get('/', (req, res, next) => {
  res.send(JSON.stringify({ message: 'Hello World', code: 1 }))
  // next表示继续执行后续中间件或路由处理函数
  //   可以传入一个Error对象,这样就会进入错误处理中间件
  next(new Error('error'))
})
app.post('/post', (req, res) => {
  // post通常表示新增数据(前端发来的)
  // 前后端交互的时候,前端发送的请求体内容(post或put请求的body), 通常有三种格式
  // 1. x-www-form-urlencoded (模拟表单提交)
  // 2. form-data (文件上传)
  // 3. json (json对象)

  // 如果希望解析req.body, 则需要express中间件express.json()
  console.log(req.body)
  res.send(req.body)
})

// 错误处理中间件
app.use(require('./src/middleware/errorHandler'))
