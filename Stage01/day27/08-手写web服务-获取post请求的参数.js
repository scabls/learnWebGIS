// 1. 导入http模块
const http = require('http')
// 导入url模块
const url = require('url')
// 导入querystring模块
const qs = require('querystring')
// 2. 创建web服务器
const server = http.createServer()
// 3. 绑定事件，处理请求
server.on('request', (req, res) => {
  res.setHeader('content-type', 'text/html; charset=utf-8')
  const { pathname } = url.parse(req.url, true)
  if (pathname == '/' || pathname == '/index') {
    if (req.method == 'POST') {
      // 获取请求体数据,需要监听请求体的两个事件
      // data事件：当服务器接收到的post数据变化的时候调用
      // end事件：当服务器接收到的post数据完毕的时候调用
      // 定义一个容器：用来存放接收到的数据
      let postData = ''
      req.on('data', data => (postData += data))
      req.on('end', () => {
        console.log(postData) //username=aaa&password=aaa 请求体中的原始数据
        // 使用querystring模块解析（需要事先导入）
        const obj = qs.parse(postData)
        console.log(obj.username)
        console.log(obj.password)
      })
    }
    res.end('<h1>首页</h1>')
  } else if (pathname == '/list') res.end('<h1>列表页</h1>')
  else if (pathname == '/detail') res.end('<h1>详情页</h1>')
  else res.end('<h1>404找不到页面</h1>')
})
// 4. 设置端口，进行监听
server.listen(3000, function () {
  console.log('服务器已启动，访问路径为http://localhost:3000')
})
