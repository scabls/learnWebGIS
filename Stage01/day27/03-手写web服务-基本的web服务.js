// 1. 导入http模块
const http = require('http')
// 2. 创建web服务器
const server = http.createServer()
// 3. 绑定事件，处理请求
// 为服务器server绑定一个request事件，监听客户端发过来的请求，作出回应
server.on('request', (req, res) => {
  //req:request:请求对象; res:response:响应对象（形参名任意,传的实参依次是请求对象和响应对象）
  //都是在服务器提前创建好的，传递过来
  //可以在函数体内拿到这两个对象进行操作
  res.end('<h1>hello!</h1>') //使用响应对象，设置响应数据，将来会发给浏览器，显示到页面
})
// 4. 设置端口，进行监听
server.listen(3000, function () {
  console.log('服务器已启动，访问路径为http://localhost:3000')
})
