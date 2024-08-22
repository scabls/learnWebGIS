// 一. 导入http内置模块
const http = require('http')

const url = require('url')
const qs = require('querystring')

// 二. 创建 web 服务器实例
const server = http.createServer()

// 三. 处理用户请求(为服务器实例绑定request事件,监听客户端的请求)
server.on('request', (req, res) => {
  // 调用 res.setHeader() 方法，设置 Content-Type 响应头，解决中文乱码的问题
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // 设置允许所有域名的跨域请求
  res.setHeader('Access-Control-Allow-Origin', '*')

  // 处理url
  const { query, pathname } = url.parse(req.url, true)

  //处理路由
  if (pathname == '/' || pathname == '/index') {
    if (req.method == 'GET') {
      //获取get请求的参数
      console.log(query)
      res.end('我假装是一个后台' + query.username + ':' + query.password)
    } else {
      //获取post提交的数据
      let postData = ''
      req.on('data', data => {
        postData += data
      }) //拼接返回来的数据
      req.on('end', () => {
        //当post数据全部接收完成, 调用这个函数
        console.log(postData) //字符串
        res.end('我假装是一个后台' + postData)
      })
    }
  }
})

// 四. 监听端口
server.listen(4000)
console.log('server is running on http://127.0.0.1:4000')
