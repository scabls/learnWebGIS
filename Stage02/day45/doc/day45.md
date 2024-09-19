# 路由基础

## VueRouter

Vue Router 是 Vue 官方的客户端路由解决方案。

客户端路由的作用是在单页应用 (SPA) 中将浏览器的 URL 和用户看到的内容绑定起来。当用户在应用中浏览不同页面时，URL 会随之更新，但页面不需要从服务器重新加载。

Vue Router 基于 Vue 的组件系统构建，你可以通过配置**路由**来告诉 Vue Router 为每个 URL 路径显示哪些组件。

## 手动集成

### 创建路由器实例

创建`/src/router/index.js`

- 创建路由器对象
- 定义路由规则
- 导出路由器对象

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 创建路由器对象
const router = createRouter({
  // 配置使用history模式
  history: createWebHistory(import.meta.env.BASE_URL),
  // 定义路由规则
  routes: [
    {
      path: '/', // 路由匹配模式
      name: 'home',
      component: HomeView // 同步组件
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue') // 异步组件
    }
  ]
})

// 导出路由器对象
export default router
```

这里的 `routes` 选项定义了一组路由，把 URL 路径映射到组件。其中，由 `component` 参数指定的组件就是将在 `App.vue` 中被 `<RouterView>` 渲染的组件。这些路由组件通常被称为*视图*，但本质上它们只是普通的 Vue 组件。

这里的 `history` 选项控制了路由和 URL 路径是如何双向映射的。

### 注册路由器插件

一旦创建了我们的路由器实例，我们就需要将其注册为插件，这一步骤可以通过调用 `use()` 来完成。

```js
createApp(App)
  .use(router)
  .mount('#app')
```

或等价地：

```js
const app = createApp(App)
app.use(router)
app.mount('#app')
```

和大多数的 Vue 插件一样，`use()` 需要在 `mount()` 之前调用。

如果你好奇这个插件做了什么，它的职责包括：

1. 全局注册 `RouterView` 和 `RouterLink` 组件。
2. 添加全局 `$router` 和 `$route` 属性。
3. 启用 `useRouter()` 和 `useRoute()` 组合式函数。
   1. `useRouter()`: 获取路由器对象	
   2. `useRoute()`: 获取路由规则对象
4. 触发路由器解析初始路由。

#### app.use()

安装一个[插件](https://cn.vuejs.org/guide/reusability/plugins.html)。

**详细信息**

第一个参数应是插件本身，可选的第二个参数是要传递给插件的选项。

插件可以是一个带 `install()` 方法的对象，亦或直接是一个将被用作 `install()` 方法的函数。插件选项 (`app.use()` 的第二个参数) 将会传递给插件的 `install()` 方法。

若 `app.use()` 对同一个插件多次调用，该插件只会被安装一次。

**示例**

```js
import { createApp } from 'vue'
import MyPlugin from './plugins/MyPlugin'

const app = createApp({
  /* ... */
})

app.use(MyPlugin)
```

### 设置路由出口

```vue
<template>
  <!-- 通过点击a元素, 触发url的改变, url改变后, 经由路由的匹配, 显示不同的组件 -->
  <!-- <a href="/">首页</a>
  <a href="/about">关于页</a> -->
  <header>
    <nav>
      <!-- router-link默认会渲染成a元素 -->
      <!-- 使用to属性取代href属性 -->
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>

  <main>
    <!-- 配置路由出口(根据url显示不同的组件) -->
    <router-view></router-view>
  </main>
</template>
```

在这个 `template` 中使用了两个由 Vue Router 提供的组件: `RouterLink` 和 `RouterView`。

不同于常规的 `<a>` 标签，我们使用组件 `RouterLink` 来创建链接。这使得 Vue Router 能够在不重新加载页面的情况下改变 URL，处理 URL 的生成、编码和其他功能。我们将会在之后的部分深入了解 `RouterLink` 组件。

`RouterView` 组件可以使 Vue Router 知道你想要在哪里渲染当前 URL 路径对应的**路由组件**。它不一定要在 `App.vue` 中，你可以把它放在任何地方，但它需要在某处被导入，否则 Vue Router 就不会渲染任何东西。

- router-link
  - 改变url的vue组件
  - 默认情况, 被渲染为`a`元素
  - 使用to属性取代href属性
- router-view
  - 动态加载组件的vue组件, 类似于component

#### 注意事项

组件 `RouterView` 和 `RouterLink` 都是全局注册的，因此它们不需要在组件模板中导入。但你也可以通过局部导入它们，例如 `import { RouterLink } from 'vue-router'`。

在模板中，组件的名字可以是 PascalCase 风格或 kebab-case 风格的。Vue 的模板编译器支持两种格式，因此 `<RouterView>` 和 `<router-view>` 通常是等效的。此时应该遵循你自己项目中使用的约定。

如果使用 DOM 内模板，那么需要注意：组件名字必须使用 kebab-case 风格且不支持自闭合标签。因此你不能直接写 `<RouterView />`，而需要使用 `<router-view></router-view>`。

> 为了与vue2兼容, 建议使用kebab-case格式

### 访问路由器和当前路由

你很可能想要在应用的其他地方访问路由器。

如果你是从 ES 模块导出路由器实例的，你可以将路由器实例直接导入到你需要它的地方。在一些情况下这是最好的方法，但如果我们在组件内部，那么我们还有其他选择。

在组件模板中，路由器实例将被暴露为 `$router`。这与同样被暴露的 `$route` 一样，但注意前者最后有一个额外的 `r`。

对于组合式 API,在`<script setup>`中访问路由器和当前路由可以使用 Vue Router 给我们提供的一些组合式函数：

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

</script>
```

 `useRouter()` 访问路由器实例,  `useRoute()` 来访问当前路由。

## 路由配置与匹配

`vue-router`最重要的功能是: **建立url和组件的对应关系**

当访问url时, 会按照一定的原则去匹配到对应的组件

1. 路由规则原则上遵循一一对应
2. 如果出现一个url对应多个组件时, 根据优先级规则匹配
   - 匹配规则越具体优先级越高

### 动态路由匹配

很多时候，我们需要将给定匹配模式的路由映射到同一个组件。例如，我们可能有一个 `User` 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，我们称之为 *路径参数* ：

```js
routes: [
  // :id 动态路径参数, 以冒号开头, 匹配数字和字符
  { path: '/users/:id', name: 'users', component: UserView }
]
```

现在像 `/users/johnny` 和 `/users/jolyne` 这样的 URL 都会映射到同一个路由。

*路径参数* 用冒号 `:` 表示。当一个路由被匹配时，它的 *params* 的值将在每个组件中以 `route.params` 的形式暴露出来。因此，我们可以通过更新 `User` 的模板来呈现当前的用户 ID：

```vue
<template>
  <div>
    <!-- 当前路由可以通过 $route 在模板中访问 -->
    User {{ $route.params.id }}
  </div>
</template>
```

你可以在同一个路由中设置有多个 *路径参数*，它们会映射到 `$route.params` 上的相应字段。例如：

| 匹配模式                       | 匹配路径                 | route.params                             |
| :----------------------------- | :----------------------- | :--------------------------------------- |
| /users/:username               | /users/eduardo           | `{ username: 'eduardo' }`                |
| /users/:username/posts/:postId | /users/eduardo/posts/123 | `{ username: 'eduardo', postId: '123' }` |

除了 `route.params` 之外，`route` 对象还公开了其他有用的信息，如 `route.query`（如果 URL 中存在参数）、`route.hash` 等。

### 路由匹配的语法

#### 总原则

路由匹配是通过`正则表达式`判断的

1. `静态路由`是严格匹配(eg: /about => '/about', /about/abc => '/about/abc')
2. `动态路由`可以接受参数(eg: /about/1 => '/about/:id', /about/abc => '/about/:id')
3. 默认情况下, 不区分大小写

#### 自定义正则

在括号中为参数指定一个自定义的正则

| URL                                  | path                                                   | 说明                                                |
| ------------------------------------ | ------------------------------------------------------ | --------------------------------------------------- |
| '/test/数字'和'/test/字符'可以被区分 | `/test/:id(\\d+)`=>参数只能是数字; `/test/:name`=>其它 | `()`: 在()中书写正则表达; `\\d+`: 匹配1个或多个数字 |
| '/test'和'/test/1'都可以命中         | `/test/:id?`=>参数是可选的                             | ?: 匹配0次或者多次                                  |

```js
const routes = [
  {
    // 只匹配 /test/数字 , eg: /test/123
    path: '/test/:id(\\d+)',
    component: () => import('../views/TestView.vue'),
  },
  {
    // 匹配 /test/字符串, eg: /test/abc
    path: '/test/:name',
    component: () => import('../views/AboutView.vue'),
  },
]
```

转到 `/test/123` 将匹配 `/test/:id`，其他情况将会匹配 `/test/:name`。`routes` 数组的顺序并不重要!

> 确保**转义反斜杠( `\` )**，就像我们对 `\d` (变成`\\d`)所做的那样，在 JavaScript 中实际传递字符串中的反斜杠字符。

#### 可重复参数

如果你需要匹配具有多个部分的路由，如 `/first/second/third`，你应该用 `*`（0 个或多个）和 `+`（1 个或多个）将参数标记为可重复：

```js
const routes = [
  // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
  { path: '/:chapters+' },
  // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
  { path: '/:chapters*' },
]
```

这时参数的值是一个数组，而不是一个字符串。

这些也可以通过在**右括号后**添加它们与自定义正则结合使用：

```js
const routes = [
  // 仅匹配数字
  // 匹配 /1, /1/2, 等
  { path: '/:chapters(\\d+)+' },
  // 匹配 /, /1, /1/2, 等
  { path: '/:chapters(\\d+)*' },
]
```

#### 可选参数

你也可以通过使用 `?` 修饰符(0 个或 1 个)将一个参数标记为可选：

```js
const routes = [
  // 匹配 /users 和 /users/posva
  { path: '/users/:userId?' },
  // 匹配 /users 和 /users/42
  { path: '/users/:userId(\\d+)?' },
]
```

请注意，`*` 在技术上也标志着一个参数是可选的，但 `?` 参数不能重复。

### 默认路由

当其余所有路由规则都不匹配时, 默认的保底方法

匹配**任意路径**

```js
const routes = [
  ...
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
```

在这个特定的场景中，我们在括号之间使用了自定义正则表达式，并将pathMatch 参数标记为可选可重复。

### 嵌套路由

```vue
<!-- App.vue -->
<template>
  <router-view />
</template>
```

```vue
<!-- User.vue -->
<template>
  <div>
    User {{ $route.params.id }}
  </div>
</template>
```

```js
import User from './User.vue'

// 这些都会传递给 `createRouter`
const routes = [{ path: '/user/:id', component: User }]
```

在App.vue的template中的`<router-view>` 是一个顶层的 `router-view`。它渲染顶层路由匹配的组件。

而一个被渲染的组件也可以包含自己嵌套的 `<router-view>`。

```vue
<!-- User.vue -->
<template>
  <div class="user">
    <h2>User {{ $route.params.id }}</h2>
    <router-view />
  </div>
</template>
```

要将组件渲染到这个嵌套的 `router-view` 中，我们需要在路由中配置 `children`：

```js
const routes = [
  // 配置一级路由
  {
    path: '/user/:id',
    component: User,
    children: [
      // 配置二级路由(二级路由一般不以/开头, 此时会拼接到父级路由)
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

1. 包含`children`选项的路由对应的组件, 需要设置`<router-view>`作为children中子路由的出口
2. 二级路由的path一般不以/开头, 此时子路由的`path`会跟父路由的`path`拼接

**注意，以 `/` 开头的嵌套路径将被视为根路径。这允许你利用组件嵌套，而不必使用嵌套的 URL。**

如你所见，`children` 配置只是另一个路由数组，就像 `routes` 本身一样。因此，你可以根据自己的需要，不断地嵌套视图。

此时，按照上面的配置，当你访问 `/user/eduardo` 时，在 `User` 的 `router-view` 里面什么都不会呈现，因为没有匹配到嵌套路由。也许你确实想在那里渲染一些东西。在这种情况下，你可以提供一个空的嵌套路径：

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 当 /user/:id 匹配成功
      // UserHome 将被渲染到 User 的 <router-view> 内部
      { path: '', component: UserHome },

      // ...其他子路由
    ],
  },
]
```

### 路由重定向

在某些情况下, 路由重定向也可以用来为嵌套路由指定初始渲染组件

通过`redirect`加载重定向

```js
const routes = [
  {
    // 一级路由
    path: '/', 
    component: Layout,
    redirect: '/dashboard',
    // 二级路由
    children: [
      {path: 'dashboard', component: dashboard},
      {path: 'user', component: user}
    ] 
  },
]
```

### 命名路由

当创建一个路由时，我们可以选择给路由一个 `name`：

```js
const routes = [
  {
    path: '/user/:username',
    name: 'profile', 
    component: User
  }
]
```

然后我们可以使用 `name` 而不是 `path` 来传递 `to` 属性给 `<router-link>`：

```vue
<router-link :to="{ name: 'profile', params: { username: 'erina' } }">
  User profile
</router-link>
```

上述示例将创建一个指向 `/user/erina` 的链接。

使用 `name` 有很多优点：

- 没有硬编码的 URL。
- `params` 的自动编码/解码。
- 防止你在 URL 中出现打字错误。
- 绕过路径排序，例如展示一个匹配相同路径但排序较低的路由。

所有路由的命名**都必须是唯一的**。如果为多条路由添加相同的命名，路由器只会保留最后那一条。

Vue Router 有很多其他部分可以传入网址，例如 `router.push()` 和 `router.replace()` 方法。就像 `to` 属性一样，这些方法也支持通过 `name` 传入网址：

```js
router.push({ name: 'user', params: { username: 'erina' } })
```

## 编程式导航: 路由对象与路由规则

### 路由对象

`$router`表示路由对象

- 包含`路由规则对象`
- 操作`路由规则对象`
- 主要调用其方法

- - push
  - go
  - replace

这里的方法跟HTML5新增的API实现相同

| **routerAPI** | **H5 API**   |
| ------------- | ------------ |
| push          | pushState    |
| replace       | replaceState |
| go            | go           |
| forward       | forward      |
| back          | back         |

#### push方法: 导航到不同的位置

**注意: 下面的示例中的 `router` 指代路由器实例。在组件内部，你可以使用 `$router` 属性访问路由，例如 `this.$router.push(...)`。如果使用组合式 API，你可以通过调用 [`useRouter()`](https://router.vuejs.org/zh/guide/advanced/composition-api.html) 来访问路由器。**

想要导航到不同的 URL，可以使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的 URL。

当你点击 `<router-link>` 时，内部会调用这个方法，所以点击 `<router-link :to="...">` 相当于调用 `router.push(...)` ：

| 声明式                    | 编程式             |
| :------------------------ | :----------------- |
| `<router-link :to="...">` | `router.push(...)` |

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```js
// 字符串路径
router.push('/users/eduardo')

// 带有路径的对象
router.push({ path: '/users/eduardo' })

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })
```

**注意**：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path` ：

```js
const username = 'eduardo'
// 我们可以手动建立 url，但我们必须自己处理编码
router.push(`/user/${username}`) // -> /user/eduardo
// 同样
router.push({ path: `/user/${username}` }) // -> /user/eduardo
// 如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益
router.push({ name: 'user', params: { username } }) // -> /user/eduardo
// `params` 不能与 `path` 一起使用
router.push({ path: '/user', params: { username } }) // -> /user
```

当指定 `params` 时，可提供 `string` 或 `number` 参数（或者对于[可重复的参数](https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#repeatable-params)可提供一个数组）。**任何其他类型（如对象、布尔等）都将被自动字符串化**。对于[可选参数](https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#repeatable-params)，你可以提供一个空字符串（`""`）或 `null` 来移除它。

由于属性 `to` 与 `router.push` 接受的对象种类相同，所以两者的规则完全相同。

`router.push` 和所有其他导航方法都会返回一个 *Promise*，让我们可以等到导航完成后才知道是成功还是失败。

**注意: **params 路径参数的key(键)是与路由规则中的参数保持一致的

```js
{
    path: 'blog/:id?',
    name: 'blog',
    component: () => import('../views/admin/BlogView.vue'),
},
```

```js
router.push({ name: 'blog', params: { id: 100 } })
```

为避免混乱, 当参数是对象时, 建议使用name属性而不是path属性, 使用name属性可保证params属性生效

#### replace方法: 替换当前位置

它的作用类似于 `router.push`，唯一不同的是，它在导航时不会向 history 添加新记录，正如它的名字所暗示的那样——它取代了当前的条目。

| 声明式                            | 编程式                |
| :-------------------------------- | :-------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

也可以直接在传递给 `router.push` 的 `to` 参数中增加一个属性 `replace: true` ：

```js
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```

#### go方法

该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步，类似于 `window.history.go(n)`。

```js
// 向前移动一条记录，与 router.forward() 相同
router.go(1)

// 返回一条记录，与 router.back() 相同
router.go(-1)

// 前进 3 条记录
router.go(3)

// 如果没有那么多记录，静默失败
router.go(-100)
router.go(100)
```

### 路由规则

路由对象上的`routes`数组, 构成了路由规则`$route`

- 解析URL

- - params
  - query

- 使用其属性

对应于`router/index.js`中定义的路由规则

#### 动态路由参数

根据`路由`传参, 主要有两种方式

- query参数: ?name=xiaoming&age=20
- prams参数: /user/1

```js
{
    path: 'blog/:id?',
    name: 'blog',
    component: () => import('../views/admin/BlogView.vue'),
},
```

```vue
<template>
  <div>仪表盘</div>
  <button @click="handleParams">params传参</button>
  <button @click="handleQuery">query传参</button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const handleParams = () => {
  //   /blog/:id
  const id = 100
  //   params 路径参数
  //   id(key/键)是与路由规则中的参数保持一致的
  router.push({ name: 'blog', params: { id: id } })
}
const handleQuery = () => {
  router.push({ name: 'blog', query: { name: 'xiaoming', age: 20 } })
}
</script>
```

```vue
<template>
  <div>博客</div>
  <p>blogId:{{ blogId }}</p>
  <p>name:{{ name }}</p>
  <p>age:{{ age }}</p>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const blogId = route.params.id
console.log(blogId)

const { name, age } = route.query
console.log(name, age)
</script>
```

## 重定向和别名

### 路由重定向

重定向也是通过 `routes` 配置来完成

在某些情况下, 路由重定向也可以用来为嵌套路由指定初始渲染组件

通过`redirect`加载重定向

从 `/home` 重定向到 `/`：

```js
const routes = [{ path: '/home', redirect: '/' }]
```

重定向的目标也可以是一个命名的路由：

```js
const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
```

甚至是一个方法，动态返回重定向目标：

```js
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
    // 当用户访问 /search/screens 时，页面会自动重定向到 /search?q=screens，
    // 将 screens 作为查询参数 q 附加到 /search 路由上。
  },
  {
    path: '/search',
    // ...
  },
]
```

请注意，**[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)并没有应用在跳转路由上，而仅仅应用在其目标上**。在上面的例子中，在 `/home` 路由中添加 `beforeEnter` 守卫不会有任何效果。

在写 `redirect` 的时候，可以省略 `component` 配置，因为它从来没有被直接访问过，所以没有组件要渲染。唯一的例外是[嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)：如果一个路由记录有 `children` 和 `redirect` 属性，它也应该有 `component` 属性。

```js
const routes = [
  {
    // 一级路由
    path: '/', 
    component: Layout,
    redirect: '/dashboard',
    // 二级路由
    children: [
      {path: 'dashboard', component: dashboard},
      {path: 'user', component: user}
    ] 
  },
]
```

#### 相对重定向

也可以重定向到相对位置：

```js
const routes = [
  {
    // 将总是把/users/123/posts重定向到/users/123/profile。
    path: '/users/:id/posts',
    redirect: to => {
      // 该函数接收目标路由作为参数
      // 相对位置不以`/`开头
      // 或 { path: 'profile'}
      return 'profile'
    },
  },
]
```

### 别名

如果重定向是指当用户访问 `/home` 时，URL 会被 `/` 替换，然后匹配成 `/`。那么什么是别名呢？

**将 `/` 别名为 `/home`，意味着当用户访问 `/home` 时，URL 仍然是 `/home`，但会被匹配为用户正在访问 `/`。**

上面对应的路由配置为：

```js
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

通过别名，你可以自由地将 UI 结构映射到一个任意的 URL，而不受配置的嵌套结构的限制。使别名以 `/` 开头，以使嵌套路径中的路径成为绝对路径。你甚至可以将两者结合起来，用一个数组提供多个别名：

```js
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

如果你的路由有参数，请确保在任何绝对别名中包含它们：

```js
const routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      // 为这 3 个 URL 呈现 UserDetails
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]
```

# 路由进阶

## 导航守卫

### 作用

1. 校验权限
2. 守护组件

正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。这里有很多方式植入路由导航中：全局的，单个路由独享的，或者组件级的。

### 全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫

在`router/index.js`中, 设置`全局前置导航守卫`

```js
const router = createRouter({ ... })

// 配置全局导航守卫
router.beforeEach((to, from, next) => {
  // to:到哪里去
  // from:从哪里来
  // next:放行
  const isLogin = localStorage.getItem('isLogin')
  if (isLogin) next()
  else {
    if (to.path != '/login') {
      alert('请先登录')
      next('/login')
    } else next()
  }
})
```

- **`to`**: 即将要进入的目标
- **`from`**: 当前导航正要离开的路由

可以返回的值如下:

- `false`: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
- 一个路由地址: 通过一个路由地址重定向到一个不同的地址，如同调用 `router.push()`，且可以传入诸如 `replace: true` 或 `name: 'home'` 之类的选项。它会中断当前的导航，同时用相同的 `from` 创建一个新导航。

#### 可选的第三个参数 `next`

在之前的 Vue Router 版本中，还可以使用 *第三个参数* `next` 。这是一个常见的错误来源，我们经过 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md#motivation) 讨论将其移除。然而，它仍然是被支持的，这意味着你可以向任何导航守卫传递第三个参数。在这种情况下，**确保 `next`** 在任何给定的导航守卫中都被**严格调用一次**。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。

这里有一个在用户未能验证身份时重定向到`/login`的**错误用例**：

```js
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})
```

下面是正确的版本:

```js
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

## 路由元信息



## 路由懒加载