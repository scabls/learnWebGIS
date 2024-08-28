// 1. 导入http模块
const http = require('http')
// 导入url模块
const url = require('url')
// 导入querystring模块
const qs = require('querystring')
// 2. 创建web服务器
const server = http.createServer()
// 封装获取post请求的方法
function getqueryObj(req) {
  return new Promise((resolve, reject) => {
    let postData = ''
    req.on('data', data => (postData += data))
    req.on('end', () => {
      const queryObj = qs.parse(postData)
      resolve(queryObj)
    })
  })
}
// 3. 绑定事件，处理请求
server.on('request', (req, res) => {
  res.setHeader('content-type', 'text/html; charset=utf-8')
  const { pathname } = url.parse(req.url, true)
  if (pathname == '/' || pathname == '/index') {
    if (req.method == 'POST') {
      ;(async req => {
        const { username, password } = await getqueryObj(req)
        console.log(username)
        console.log(password)
      })(req)
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
