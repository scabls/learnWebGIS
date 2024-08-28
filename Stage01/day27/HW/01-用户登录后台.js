const http = require('http')
const url = require('url')
const qs = require('querystring')
const server = http.createServer()
function getqueryStr(req) {
  return new Promise((resolve, reject) => {
    let postData = ''
    req.on('data', data => (postData += data))
    req.on('end', () => {
      resolve(postData)
    })
  })
}
server.on('request', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  const { pathname, query } = url.parse(req.url, true)
  if (pathname == '/login') {
    if (req.method == 'GET') {
      const { username, password } = query
      if (username == '张三' && password == '123') res.end('<h1>GET方式登录成功</h1>')
      else res.end('<h1>GET方式登录失败</h1>')
    } else if (req.method == 'POST') {
      ;(async () => {
        const { username, password } = qs.parse(await getqueryStr(req))
        if (username == '张三' && password == '123') res.end('<h1>POST方式登录成功</h1>')
        else res.end('<h1>POST方式登录失败</h1>')
      })()
    } else res.end('<h1>不支持GET或POST之外的方式</h1>')
  } else {
    res.end('<h1>无限期开发中……</h1>')
  }
})
server.listen(3000, function () {
  console.log('服务器已启动，访问路径为http://localhost:3000')
})
