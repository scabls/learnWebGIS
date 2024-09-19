# 集成axios

## 准备后端接口

### 安装json-server

```bash
pnpm add json-server@0.17.4 -D
```

设置package.json

```json
{
  "name": "axios-demo",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "mock": "json-server -w ./mock/data.json --port 3003"
  },
  "dependencies": {
    "axios": "^1.6.8",
    "vue": "^3.4.21"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "json-server": "0.17.4",
    "vite": "^5.2.8"
  }
}
```

### 准备数据文件

在项目顶层目录创建`mock`文件夹, 创建`data.json`文件

```json
{
  "users": [
    { "id": 1, "name": "xiaoming", "age": 20 },
    { "id": 2, "name": "xiaomei", "age": 18 }
  ]
}
```

`json-server`根据`data.json`提供如下接口

- GET /users : 获取所有用户
- GET /users/1 : 根据id所有单个用户
- POST /users {name: 'xxx', age: xx}: 新增用户
- PUT /users/1  {name: 'xxx', age: xx}: 更新用户信息
- DELETE /users/1 : 根据id删除用户

### 启动服务

```bash
pnpm mock
```

## api分层

### 基本使用

#### 封装axios

将`axios`和发请求单独封装到一个`api`文件夹

创建`src/api`文件夹, 对`axios`进行再次封装

**request.js**

```js
// 导入axios
import axios from 'axios'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3003',
  // 设置访问时限
  timeout: 5000,
})

// 设置拦截器
// 请求拦截器

// 响应拦截器
instance.interceptors.response.use(
  // response就是原始响应数据
  // 这里回调函数的返回值将会是axios请求操作(get,post...)返回的promise的兑现值,会被then方法接收到
  response => response.data,

  // error表示错误信息
  error => Promise.reject(error)
)

// 导出axios实例
export default instance
```

#### 封装api接口

根据模块创建对应的api接口

**user.js**

> 调用请求方法时, 可以使用别名, 也可以使用配置对象

```js
import request from './request'

// 获取用户列表 GET /users
// const getUsersApi = () => request.get('/users')
const getUsersApi = () =>
  request({
    method: 'GET',
    url: '/users',
  })

// 根据id获取单个用户信息 GET /users/:id
const getUserByIdApi = id =>
  request({
    method: 'GET',
    url: `/users/${id}`,
  })

// 添加用户 POST /users data: { name: 'xxx', age: 18 }
const addUserApi = data =>
  request({
    method: 'POST',
    url: '/users',
    data,
  })

// 修改用户 PUT /user/:id data: { name: 'xxx', age: 18 }
const editUserApi = (id, data) =>
  request({
    method: 'PUT',
    url: `/users/${id}`,
    data,
  })

// 删除用户 DELETE /users/:id
const deleteUserApi = id =>
  request({
    method: 'DELETE',
    url: `/users/${id}`,
  })

// 统一导出
export { getUsersApi, getUserByIdApi, addUserApi, editUserApi, deleteUserApi }
```

这些api接口的返回值是一个axios实例的请求操作, 而请求操作的返回值是一个promise, 所以api的返回值实际上是一个promise

#### 在组件中导入使用

```vue
<script setup>
// 导入users中的方法
import { getUsersApi } from '@/api/users'

const getUsers = async () => {
  // 发送请求
  users.value = await getUsersApi()
}
onMounted(() => getUsers())
</script>

<template></template>
```

axios的请求方法返回的是一个promise对象, 响应数据需要通过then方法获取。或者在异步函数中使用await语法糖获取。

> 如果在 `<script setup>`顶层使用 `await` 表达式, 会自动让该组件成为一个异步依赖。

因为这些api接口执行的都是异步操作, 所以在使用api接口的时候, 都要将它们放在异步函数中, 使用await等待promise敲定, 再执行后续代码

`import { getUsersApi } from '@/api/users'`中的`@`在`vite.config.js`被指定为`./src`的别名, 所以此处就代表`./src`

# 集成Pinia

## 概述

### Pinia是什么

拥有组合式 API 的 Vue **状态管理**库

实现**所有组件**的状态(数据)**共享**, 也是**组件间通信**的一种方式

1. 本质上是一个Vue的插件
2. 主要实现所有组件的状态共享

### 什么时候用

在组件关系复杂, 没有明确的关系, 但是需要实现数据传递时, 可以使用`Pinia`

### 设计思路

可以理解成一个统一管理数据的仓库, 因此通常使用`store`表示

理论上, 所有的组件都可以操作(读写)store中的数据

- 怎样实现读数据
  - 可以定义一个单独的**全局变量**, 所有的组件从全局对象中获取数据
- 怎样实现写数据
  - 如果在每个组件中各自修改**全局变量**, 就会引起混乱, 因此设计一个工具集中的管理写操作
- 如何设计集中式的写操作
  - 所有的组件不能自己修改**全局变量**, 需要通知`Pinia`, 由`Pinia`集中管理, 统一修改

至少应该包含两个部分

- state: 保存全局数据
- actions: 对数据进行修改的动作

## 集成

使用vite构建工具可以自动集成, 但有些场景还是需要手动集成(比如给旧项目做改造)

### 安装pinia

```bash
pnpm add pinia
```

### 创建store

在src文件夹下创建stores文件夹, 在其中创建js格式的store文件

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

对于store的语法, 将在之后进行详细说明, 此时先展示如何将pinia集成到项目中

### 注册插件

在main.js中, 导入createPinia, 并使用app.use()注册pinia实例

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
```

## 定义store

在深入研究核心概念之前，我们得知道 Store 是用 `defineStore()` 定义的，它的第一个参数要求是一个**独一无二的**名字：

```js
import { defineStore } from 'pinia'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```

这个**名字** ，也被用作 *id* ，是必须传入的， Pinia 将用它来连接 store 和 devtools。为了养成习惯性的用法，将返回的函数命名为 *use...* 是一个符合组合式函数风格的约定。

`defineStore()` 的第二个参数可接受两类值：Setup 函数或 Option 对象。

### Option Store

与 Vue 的选项式 API 类似，我们也可以传入一个带有 `state`、`actions` 与 `getters` 属性的 Option 对象

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

你可以认为 `state` 是 store 的数据 (`data`)，`getters` 是 store 的计算属性 (`computed`)，而 `actions` 则是方法 (`methods`)。

为方便上手使用，Option Store 应尽可能直观简单。

### Setup Store

也存在另一种定义 store 的可用语法。与 Vue 组合式 API 的 setup 函数 相似，我们可以传入一个函数，该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

在 *Setup Store* 中：

- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters`
- `function()` 就是 `actions`

对于store文件的基本框架, 我们可以使用官方提供的vscode代码片段快捷创建, pinia-setup创建Setup Store语法的score, pinia-options则会创建Option Store语法的score, score名会被自动命名为文件名, 同时也会自动按照use[name]Score命名defineStore()返回的函数

## 使用 Store

要使用先前定义的store, 需要在`<script setup>`导入useStore(),然后调用useStore()得到store实例

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
// 可以在组件中的任意位置访问 `counter` 变量 ✨
const counter = useCounterStore()
</script>
```

你可以定义任意多的 store，但为了让使用 pinia 的益处最大化 (比如允许构建工具自动进行代码分割以及 TypeScript 推断)，**你应该在不同的文件中去定义 store**。

一旦 store 被实例化，你可以直接访问在 store 的 `state`、`getters` 和 `actions` 中定义的任何属性。

请注意，`store` 是一个用 `reactive` 包装的对象，这意味着不需要在 getters 后面写 `.value`。就像 `setup` 中的 `props` 一样，**我们不能对它进行解构**：

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue'

const counter = useCounterStore()
// ❌ 这将不起作用，因为它破坏了响应性
// 这就和直接解构 `props` 一样
const { name, doubleCount } = counter
name // 将始终是 "Eduardo"
doubleCount // 将始终是 0
setTimeout(() => {
  counter.increment()
}, 1000)
// ✅ 这样写是响应式的
// 💡 当然你也可以直接使用 `counter.doubleCount`
const doubleValue = computed(() => counter.doubleCount)
</script>
```

## 从 Store 解构

为了从 store 中提取属性时保持其响应性，你需要使用 `storeToRefs()`。它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。

请注意，你可以直接从 store 中解构 action，因为它们也被绑定到 store 上：

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(counter)
// 作为 action 的 increment 可以直接解构
const { increment } = counter
</script>
```

storeToRefs()和vue的toRefs非常相似, 但是针对score进行了特殊设计, 会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性

# 查漏补缺

## HTMLFormElement

### submit event

#### 定义和用法

当表单 `<form>` 提交的时候触发 submit 事件。

注意 submit 事件只能作用于 `<form> `元素本身，不能作用于 `<button> `或者 `<input type="submit">`。但 SubmitEvent 被用于表单提交时，会携带 submitter 属性，这是触发提交请求时会调用的按钮。

当用户点击提交按钮（`<button>` 或 `<input type="submit">`），亦或是在表单里输入时（e.g. `<input type="text">`）按下 Enter 键，submit 事件将会被触发。直接调用 form.submit() 方法时，事件不会发送到表单。

> 备注：当试图提交一个未通过验证的表单时，会触发 invalid 事件。在这种情况下，表单提交将会被验证机制阻止。因此，sumbit 事件也就不存在了。

#### 使用场景

当我们使用input元素时, 建议将其放置在form元素内。这样当我们需要实现点击按钮或者按下回车时触发事件处理时, 就无需设置两个事件监听器, 而是只需要监听form的submit的事件。但要记得阻止form的默认行为, 否则提交后会重新加载页面

```vue
<template>
  <header class="todo-header">
    <h1>TodoList</h1>
    <section class="add-todo">
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model.tirm="content" />
        <button>添加</button>
      </form>
    </section>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos'
const { addTodo } = useTodosStore()
const content = ref('')
const handleSubmit = () => {
  if (!content.value) return
  addTodo({
    id: Date.now(),
    content: content.value,
    done: false,
  })
  content.value = ''
}
</script>
```

示例通过`v-on`指令监听form的submit事件, 并使用`.prevent`事件修饰符阻止了form元素的默认行为, 提交事件将不再重新加载页面。而无需监听input的keyup.enter事件和button的click事件。

## `<input>`: 表单输入元素

### `<input>` 类型

`<input>` 的工作方式相当程度上取决于 type 属性的值，不同的 type 值会在各自的参考页中进行介绍。如果未指定此属性，则采用的默认类型为 text。

| 类型                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [button](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/button) | 没有默认行为的按钮，上面显示 [`value`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#value) 属性的值，默认为空。 |
| [checkbox](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/checkbox) | 复选框，可将其值设为选中或未选中。                           |
| [color](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/color) | 用于指定颜色的控件；在支持的浏览器中，激活时会打开取色器。   |
| [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/date) | 输入日期的控件（年、月、日，不包括时间）。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮。 |
| [datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/datetime-local) | 输入日期和时间的控件，不包括时区。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮。 |
| [email](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/email) | 编辑邮箱地址的字段。类似 `text` 输入，但在支持的浏览器和带有动态键盘的设备上会有验证参数和相应的键盘。 |
| [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file) | 让用户选择文件的控件。使用 [`accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#accept) 属性规定控件能选择的文件类型。 |
| [hidden](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/hidden) | 不显示的控件，其值仍会提交到服务器。举个例子，右边就是一个隐形的控件。 |
| [image](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/image) | 图形化 `submit` 按钮。显示的图像由 `src` 属性决定。如果 [`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#src) 属性缺失，就会显示 [`alt`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#alt) 的内容。 |
| [month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/month) | 输入年和月的控件，没有时区。                                 |
| [number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/number) | 用于输入数字的控件。如果支持的话，会显示滚动按钮并提供缺省验证（即只能输入数字）。拥有动态键盘的设备上会显示数字键盘。 |
| [password](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/password) | 单行的文本区域，其值会被遮盖。如果站点不安全，会警告用户。   |
| [radio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/radio) | 单选按钮，允许在多个拥有相同 [`name`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#name) 值的选项中选中其中一个。 |
| [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/range) | 此控件用于输入不需要精确的数字。控件是一个范围组件，默认值为正中间的值。同时使用 [`min`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#min) 和 [`max`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#max) 来规定可接受值的范围。 |
| [reset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/reset) | 此按钮将表单的所有内容重置为默认值。不推荐使用该类型。       |
| [search](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/search) | 用于搜索字符串的单行文字区域。输入文本中的换行会被自动去除。在支持的浏览器中可能有一个删除按钮，用于清除整个区域。拥有动态键盘的设备上的回车图标会变成搜索图标。 |
| [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/submit) | 用于提交表单的按钮。                                         |
| [tel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/tel) | 用于输入电话号码的控件。拥有动态键盘的设备上会显示电话数字键盘。 |
| [text](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/text) | 默认值。单行的文本字段，输入值中的换行会被自动去除。         |
| [time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/time) | 用于输入时间的控件，不包括时区。                             |
| [url](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/url) | 用于输入 URL 的控件。类似 `text` 输入，但有验证参数，在支持动态键盘的设备上有相应的键盘。 |
| [week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/week) | 用于输入以年和周数组成的日期，不带时区。                     |

#### `<input type="number">`

当需要的数据是纯数字的话, 推荐使用number类型的input直接获取number类型的value, 而不是将text类型的value转为number

```vue
<input v-model.number="age" /> <!-- 限制小, 容易出错 -->

<input type="number" v-model="age" /> <!-- 限制大, 只能输入数字 -->
```

## 逻辑或（||）

对于一组操作数的**逻辑或**（`||`，逻辑析取）运算符，当且仅当其一个或多个操作数为真，其运算结果为真。它通常与布尔（逻辑）值一起使用。当它是布尔值时，返回一个布尔值。然而，`||` 运算符实际上是返回一个指定的操作数的值，所以如果这个运算符被用于非布尔值，它将返回一个非布尔值。

### 语法

```js
expr1 || expr2
```

### 描述

如果 `expr1` 能转化为 `true`，返回 `expr1`；否则返回 `expr2`。

能够转化为 `true` 的值叫做真值，能够转化为 `false` 的值叫做假值。

能够转化为 false 的表达式的示例如下：

- `null`；
- `NaN`；
- `0`；
- 空字符串（`""` 或 `''` 或 ``）；
- `undefined`。

尽管 `||` 运算符可以与非布尔操作数一起使用，但它仍然被认为是一个布尔运算符，因为它的返回值总是可以被转换为布尔基本类型。要明确地将其返回值（或任何一般的表达式）转换为相应的布尔值，请使用双非运算符或 `Boolean`构造函数。

#### 运算非布尔值

```js
const a = 0;
const b = -2;

console.log( a || b );
// Expected output: -2
```

### 短路求值

逻辑或从左到右进行求值，它使用如下规则进行“短路”测试：

`(some truthy expression) || expr` 被短路评估为真值。

短路意味着上面的 `expr` 部分**不被求值**，因此不会发生任何副作用（例如，如果 `expr` 是一个函数调用，调用就不会发生）。这是因为在对第一个操作数进行评估后，操作数的值已经确定。

```js
function A() {
  console.log("调用了 A");
  return false;
}
function B() {
  console.log("调用了 B");
  return true;
}

console.log(B() || A());
// 由于调用了 B 函数，故会输出 "called B" 到控制台，
// 然后输出 true（运算符的运算结果）
```

