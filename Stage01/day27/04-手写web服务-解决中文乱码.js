// 1. 导入http模块
const http = require('http')
// 2. 创建web服务器
const server = http.createServer()
// 3. 绑定事件，处理请求

server.on('request', (req, res) => {
  // 告诉浏览器，此服务器发送的数据采用`utf-8`编码
  res.setHeader('content-type', 'text/html; charset=utf-8')
  res.end('<h1>你好</h1>')
})
// 4. 设置端口，进行监听
server.listen(3000, function () {
  console.log('服务器已启动，访问路径为http://localhost:3000')
})
