# 登录状态存储

## cookie-session

```js
// 导入cookie-session中间件
const cookieSession = require('cookie-session')
```

要处理跨域问题

### 前端的axios

#### 要将withCredentials选项开启

```js
const instance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true, //允许跨域请求携带cookie
})
```

### express

#### 要设置cors中间件

```js
// 解决跨域问题
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
```

#### 要在session中间件之后注册路由

```js
// 设置session中间件
app.use(
  cookieSession({
    name: 'session',
    keys: ['secret'],
    maxAge: 24 * 60 * 60 * 1000, // 24小时有效期
  })
)
// 注册路由
app.use('/api/admin', router)
```

#### 路由配置

```js
// 登录
router.post('/login', async (req, res) => {
  const { loginId, loginPwd } = req.body
  const admin = await hasLoginId(loginId, 'instance')
  if (!admin) {
    res.status(404).send('管理员不存在')
  } else if (admin.loginPwd === loginPwd) {
    // 登录成功
    req.session.isLoggedIn = true
    req.session.adminId = admin.id
    res.status(200).send(admin.loginId)
  } else {
    res.status(400).send('用户名或密码错误')
  }
})
```

```js
// 获取当前登录用户信息
router.get('/profile', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).send('未登录')
  }
  const admin = await getAdminById(req.session.adminId) //可能存在之前登录的用户已被删除
  res.status(200).send({ msg: '存在已登录用户', loginId: admin.loginId })
})
```



## JWT

### express

#### 入口文件解构导入expressjwt

```js
// 导入express-jwt
const { expressjwt } = require('express-jwt')
const secret = require('./src/jwt/jwtSecret')
```

#### 密匙文件

```js
// jwtSecret.js
module.exports = 'your_secret_key'
```

#### 配置中间件

```js
// 配置jwt中间件解析token
app.use(
  expressjwt({ secret, algorithms: ['HS256'] }).unless({
    path: ['/api/admin/login', '/api/admin/register'], // 排除登录注册接口
  })
)
```

#### 路由配置

##### 签发token

```js
// 登录
router.post('/login', async (req, res) => {
  const { loginId, loginPwd } = req.body
  const admin = await hasLoginId(loginId, 'instance')
  if (!admin) {
    res.status(404).send('管理员不存在')
  } else if (admin.loginPwd === loginPwd) {
    // 登录成功
    const token = jwt.sign(admin, secret, { expiresIn: '1h' }) // 签发token
    res.status(200).send({ msg: '登录成功', token, code: 1 })
  } else {
    res.status(400).send('用户名或密码错误')
  }
})
```

##### 获取从token解密出来的对象

```js
// 获取当前登录用户信息
router.get('/profile', async (req, res) => {
  if (!req.auth) return res.status(401).send('请先登录')
  const { loginId } = req.auth
  const admin = await hasLoginId(loginId, 'instance')
  if (!admin) return res.status(404).send('管理员不存在')
  res.status(200).send({ msg: `${loginId}已登录` })
})
```

#### 配置错误处理中间件

```js
module.exports = (err, req, res, next) => {
  console.error(err.message)
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({
      message: '无效token',
      code: 0,
    })
  }
  res.status(500).send({ message: 'Something went wrong', code: 500 })
}
```

### 前端的axios

要把token字符串与Bearer+空格拼接, 设置为Authorization请求头, 这样才能从req.auth解密得到对象

```js
const getAdminProfile = (token) =>
  request.get('/admin/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
```

token从前端获取到后, 可以存储在localStorage

## express的顺序

1. 处理跨域请求的中间件
   - cors()
2. 处理静态资源的中间件
   - express.static()
3. 解析请求体的中间件
   - express.json()
   - express.urlencoded()
4. 处理session的中间件或jwt中间件
   - cookieSession()
   - expressjwt()
5. 注册路由
   - app.use('/api/admin', router)
6. 错误处理中间件
7. 侦听端口启动服务器

