# Vue

## 安装中文文档

1. 解压，进入vue-doc-zh文件夹
2. pnpm i
3. pnpm dev

修改`pakcage.json`的配置

```json
"scripts": {
    "dev": "vitepress --port 3000",//修改端口
    "build": "vitepress build",
    "preview": "vitepress preview",
    "lint": "zhlint 'src/{api,about,guide,sponsor,translations,tutorial}/**/*.md'",
    "clean": "rm -rf .vitepress/dist",
    "sync": "node scripts/sync.js",
    "preinstall": "npx only-allow pnpm"
  },
```

运行`pnpm dev`会在本机的3000端口, 启动一个服务

通过浏览器访问, 可以在本地查看文档

如果网速够快，也可以使用官方在线文档

## Vue快速上手

### 搭建开发环境

Vue环境分为两种

- 不使用构建工具
- 使用构建工具

首先, 我们会介绍`不使用构建工具`的环境, 在进阶篇中介绍`使用构建工具`的方式

#### 初始化

```powershell
pnpm init
```

发现在目录下会多一个文件package.json, 这个文件用来管理该项目使用了哪些包

#### 安装vue

执行如下命令安装vue

```powershell
pnpm install vue
```

以上命令可以简写为

```powershell
pnpm i vue
```

或者使用

```
pnpm add vue
```

在项目目录会产生一个文件夹node_modules和一个文件package-lock.json

在package.json文件中, 会多如下内容

```json
"dependencies": {
    "vue": "^3.4.38"
}
```

在node_modules里可以找到`vue/dist`

- vue.global.js是完整版(在初学阶段使用)
- esm(ES Module): 使用ES的模块规范导入导出`export default`
- runtime: 运行时版本, 相对于编译版本, 体积更小, 效率更高

### 基本使用

##### 三部曲

1. 引入vue.js
2. 编写页面(视图)
3. 创建App实例并挂载

#### 引入vue.js

在html的头部, 通过`<script src>`引入vue.global.js

```html
<!-- 1. 引入vue.js -->
<script src="../node_modules/vue/dist/vue.global.js"></script>
```

#### 编写页面(视图)

在body中, 编写一个`div`元素, id为app, 所有视图部分将在这部分渲染

```html
<!-- 2. 编写页面 -->
<div id="app">hello</div>
```

#### 创建App实例并挂载

```html
<script>
  // 1. 从Vue中解构相应的API
  const { createApp } = Vue

  // 2. 创建App, 传入一个对象, 返回一个应用实例
  const app = createApp({})
  
  // 3. 挂载
  // 使用的是css选择器字符串
  app.mount('#app')
</script>
```

1. `Vue`是我们从`vue.global.js`中导入的对象, 从对象中解构出需要的API函数
2. `createApp` 传入一个对象, 返回应用实例
3. `app.mount`挂载到HTML对应的位置

##### 示例

###### 示例1

```html
<!-- 声明的msg变量, 可以在模板中使用 -->
<div id="app">{{msg}}</div>

<script>
    // 引入后作为全局对象
    console.log(window)
    console.log(window.Vue)
    console.log(Vue)
    // createApp()接受一个对象，这个对象是组件
    const app = Vue.createApp({
        // data是对象的方法，必须是一个函数, 并且返回一个对象
        data: function () {
            return {
                // 在返回的对象里，使用对象属性声明msg变量
                msg: 'hello vue',
            }
        },
    })
    // 将app对象和页面容器关联起来
    // 使用的是css选择器
    app.mount('#app')
</script>
```

###### 示例2：优化并完善示例1

```html
<div id="app">
    <!-- 
		1. count变量, 要先在data中声明, 后在模板中使用{{count}}
		2. v-on:click事件, 绑定一个点击事件, 点击时执行count++
	-->
    <button v-on:click="count++">count is: {{count}}</button>
</div>

<script>
    // 解构赋值，取出Vue的createApp方法
    const { createApp } = Vue
    const app = createApp({
        // 使用ES6对象的属性/方法简洁表示法定义方法
        data() {
            return {
                // 先声明需要的变量
                count: 0,
            }
        },
    })
    app.mount('#app')
</script>
```

**指令**是由 `v-` 开头的一种特殊 attribute。`v-on` 指令监听 DOM 事件。

冒号后面的部分 (`:click`) 是指令的“参数”。监听点击事件并设置了事件处理函数

`v-on:` 有一个简写语法，`@`

```html
<button @click="count++">count is: {{count}}</button>
```

#### 声明式渲染

跟变量, 函数类似, 需要使用什么就先声明一下.

Vue被称为`声明式渲染`, 使用步骤

1. 声明状态(变量)
2. 使用状态(变量)

##### 声明状态

```javascript
const app = createApp({
  data() {
    return {
      msg: 'hello',
    }
  },
})
```

- data 配置项: data必须是一个函数, 在函数中返回对象, 在返回的对象中声明状态

##### 使用状态

```html
<div id="app">
  {{ msg }}
</div>
```

- 通过`{{}}`(插值表达式)使用在data中定义的`状态`

##### 示例

```html
<!-- 2.编写页面容器 -->
<div class="container">
    <p>用户名：{{username}}</p>
    <p>年龄：{{age}}</p>
    <p v-on:click="changeGender">性别：{{isMale?'男':'女'}}</p>
    <p>女朋友：{{gf.name}}</p>
    <p>爱好：{{hobbies[0]}} {{hobbies[1]}}</p>
</div>
<!-- 3.创建vue实例 -->
<script>
    const { createApp } = Vue
    const app = createApp({
        data() {
            return {
                username: 'xiaoming',
                age: 20,
                isMale: true,
                gf: {
                    name: 'xiaomei',
                },
                hobbies: ['吃饭', '睡觉'],
            }
        },
        methods: {
            changeGender() {
                this.isMale = !this.isMale
            },
        },
    })
    app.mount('.container')
</script>
```

####  响应式数据

当状态值发生变化时, Vue会自动响应变化, 使用新的数据重新渲染视图

安装vue dev tools

1. 安装后, 重启浏览器生效
2. 只有在引入的vue的页面生效
3. 只有引入完整版的vue才会生效

Vue的两个特点

1. **声明式渲染**: 先声明后使用
2. **响应式数据**: 数据驱动数据改变时, 视图会响应数据的改变, 重新渲染新的值

## 创建应用

### 应用实例对象

应用实例对象: createApp()返回的实例,也就是app对象

```js
const { createApp } = Vue
// 应用实例对象: createApp()返回的实例,也就是app对象
const app = createApp({})
console.dir(app)
```

有许多属性和方法

1. 没有_开头的是公开属性/方法
2. 以_开头的是私有属性/方法(也就是Vue内部使用的)

```
component: 定义组件
directive: 定义指令
use: 定义插件
---
mount: 挂载
unmount: 卸载
```

- `app.component` `app.use`...这些方法返回的是app对象本身, 因此, 可以使用链式调用
-  `app.mount`方法的返回值**不是app对象**, 因此, mount方法通常在最后调用, 返回值是组件实例对象

### 根组件

createApp()方法传入一个对象，这个对象被称作根组件

根组件中有许多选项，是它的方法和属性

目前接触到data选项和methods选项

#### data选项

1. data选项必须是一个函数(在介绍组件时再详细讨论)
   - 是根组件的方法
2. 在函数中返回一个对象, 在对象中定义状态
   - 状态是对象的属性
3. 在data中定义的状态, 可以在模板中使用
   - {{状态}}

### app.mount()

一个`应用实例`必须在调用了 .mount() 方法后才会渲染

- 传入参数: 可以是一个 CSS 选择器字符串(**常用**) 或者 一个实际的 DOM 元素
  - 当选择器可选择多个元素时，只会选择第一个元素
- 返回值: **根组件实例**

#### 组件实例对象

应用实例对象: createApp()返回的实例,也就是对象app

组件实例对象: app.mount()返回的实例.也就是对象instance

1. vue在内部会将配置对象(组件)=>组件上下文对象(ctx content)
2. 组件的data选项中定义的属性会被挂载到ctx对象,在ctx对象上的属性和方法都可以在模板中访问
3. instance是基于ctx对象创建的代理对象(Proxy)

```html
<div class="app">{{msg}}</div>
<div class="app">{{msg}}</div>
<script>
    const { createApp } = Vue
    const app = createApp({
        data() {
            return {
                msg: 'hello',
            }
        },
    })
    // app.mount(),确定要替换的元素,将编译后的dom替换该元素
    // 参数:dom对象|选择器字符串(推荐)
    // 当选择器可以选中多个元素时,只会选择第一个
    const instance = app.mount('.app')
    console.dir(instance)
    // 1.vue在内部会将配置对象(组件)=>组件上下文对象(ctx content)
    // 2.组件的data中定义的属性会被挂载到ctx对象,在ctx对象上的属性和方法都可以在模板中访问
    // 3.instance是基于ctx对象创建的代理对象(Proxy)
    console.dir(app)
    // 应用实例对象: createApp()返回的实例,也就是对象app
    // 组件实例对象: app.mount()返回的实例.也就是对象instance
</script>
```

#### 响应式

如何在代码中读写msg的值?

在vue内部,data选项返回的对象中的属性,会被挂载到ctx对象,

而instance作为ctx的代理,也可以读写这些属性

所以,可以通过instance.msg来读写msg的值

```html
<div class="app">{{msg}}</div>
<script>
    const { createApp } = Vue
    const app = createApp({
        data() {
            return {
                msg: 'hello',
                name: 'xiaoming',
                age: 19,
            }
        },
    })
    // 如何在代码中读写msg的值?
    // 在vue内部,data返回的对象中的属性,会被挂载到ctx对象,
    // 而instance作为ctx的代理,也可以读写这些属性
    // 所以,可以通过instance.msg来读写msg的值
    const instance = app.mount('.app')
    console.dir(instance)
    setTimeout(() => {
        instance.msg = '两秒后修改了msg'
    }, 2000)
</script>
```

不止data选项，其余选项中定义的内容也会被挂载到ctx对象

##### 总结

在选项中定义的内容会被代理到组件实例对象instance对象上；

可以通过instance对象读写app状态

### 根组件的methods选项

methods选项是根组件的属性,值是一个对象,对象的方法用来修改数据

对象中的方法会被挂载为ctx对象的方法，可以用来修改状态

```html
<div class="app">
    <p>count:{{count}}</p>
    <!-- 当点击按钮时，实际上是 Vue 的框架调用了 add 方法 -->
    <button v-on:click="add">count+1</button>
</div>
<script>
    const { createApp } = Vue
    const app = createApp({
        // data选项是个方法,返回一个对象,对象的属性存储数据
        // 返回的对象中的属性会被挂载为ctx对象的属性
        data() {
            return {
                count: 0,
            }
        },
        // methods选项是个属性,值是一个对象,对象的方法用来修改数据
        // 对象中的方法会被挂载为ctx对象的方法
        methods: {
            // es6的方法简写
            add() {
                // instance是ctx对象的代理，所以方法也相当于被挂载到了instance上
                // 因此普通函数书写的方法中,this指向的是组件实例对象instance
                // 同样data返回的对象中的属性也相当于挂载到了instance上，所以可使用this读写这些属性
                this.count++
                console.log(this == instance)
            },
            // 注意：箭头函数书写的方法中,this指向window
            sub: () => console.log(this),
        },
    })
    const instance = app.mount('.app')
    console.dir(instance)
    instance.add()
    instance.sub()
    console.dir(app)
</script>
```

instance是ctx对象的代理，所以方法也相当于被挂载到了instance上

普通函数书写的方法中,this指向的是组件实例对象instance

data返回的对象中的属性也相当于挂载到了instance上，可使用this读写这些属性

#### 方法作为事件监听器

和组件实例上的其他属性一样，方法也可以在模板上被访问。在模板中它们常常被用作事件监听器

```html
<button v-on:click="add">count+1</button>
```

Vue 自动为 `methods` 中的方法绑定了永远指向组件实例的 `this`。这确保了方法在作为事件监听器或回调函数时始终保持正确的 `this`。

不要在定义 `methods` 时使用箭头函数，因为箭头函数没有自己的 `this` 上下文。

#### 总结

- 状态(data选项)就是用来 **保存** 数据的
- 方法(methods选项)就是用来 **修改** 数据的

## 作业总结

### Attribute 绑定

在 Vue 中，mustache 语法 (即双大括号) 只能用于文本插值。为了给 attribute 绑定一个动态值，需要使用 v-bind 指令：

```html
<div v-bind:id="dynamicId"></div>
```

指令是由 v- 开头的一种特殊 attribute。它们是 Vue 模板语法的一部分。和文本插值类似，指令的值是可以访问组件状态的 JavaScript 表达式。关于 v-bind 和指令语法的完整细节请详阅指南 - 模板语法。

冒号后面的部分 (:id) 是指令的“参数”。此处，元素的 id attribute 将与组件状态里的 dynamicId 属性保持同步。

由于 v-bind 使用地非常频繁，它有一个专门的简写语法：

```html
<div :id="dynamicId"></div>
```

#### 练习

把一个动态的 `class` 绑定添加到这个 `<h1>` 上，并使用 `titleClass` 的数据属性作为它的值。

```html
<script type="module">
import { createApp } from 'vue'

createApp({
  data() {
    return {
      titleClass: 'title'
    }
  }
}).mount('#app')
</script>

<div id="app">
  <h1 :class="titleClass">Make me red</h1>
</div>

<style>
.title {
  color: red;
}
</style>
```

### 事件监听

我们可以使用 v-on 指令监听 DOM 事件：

```html
<button v-on:click="increment">{{ count }}</button>
```

因为其经常使用，v-on 也有一个简写语法：

```html
<button @click="increment">{{ count }}</button>
```

此处，increment 引用了一个使用 methods 选项声明的函数：

```js
createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // 更新组件状态
      this.count++
    }
  }
})
```

在方法中，我们可以使用 this 来访问组件实例。组件实例会暴露 data 中声明的数据属性。我们可以通过改变这些属性的值来更新组件状态。

事件处理函数也可以使用内置表达式，并且可以使用修饰符简化常见任务。

#### 练习

```html
<script type="module">
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}).mount('#app')
</script>

<div id="app">
  <button @click="increment">Count is: {{ count }}</button>
</div>
```

### 表单绑定

我们可以同时使用 v-bind 和 v-on 来在表单的输入元素上创建双向绑定：

```html
<input :value="text" @input="onInput">
```

```js
methods: {
  onInput(e) {
    // v-on 处理函数会接收原生 DOM 事件
    // 作为其参数。
    this.text = e.target.value
  }
}
```

试着在文本框里输入——你会看到 <p> 里的文本也随着你的输入更新了。

为了简化双向绑定，Vue 提供了一个 v-model 指令，它实际上是上述操作的语法糖：

```html
<input v-model="text">
```

v-model 会将被绑定的值与 `<input>` 的值自动同步，这样我们就不必再使用事件处理函数了。

v-model 不仅支持文本输入框，也支持诸如多选框、单选框、下拉框之类的输入类型。

#### 练习

```html
<script type="module">
import { createApp } from 'vue'

createApp({
  data() {
    return {
      text: ''
    }
  }
}).mount('#app')
</script>

<div id="app">
  <input v-model="text" placeholder="Type here">
  <p>{{ text }}</p>
</div>
```

### 条件渲染

我们可以使用 v-if 指令来有条件地渲染元素：

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

这个 `<h1>` 标签只会在 awesome 的值为真值 (Truthy) 时渲染。若 awesome 更改为假值 (Falsy)，它将被从 DOM 中移除。

我们也可以使用 v-else 和 v-else-if 来表示其他的条件分支：

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

#### 练习

现在，示例程序同时展示了两个` <h1>` 标签，并且按钮不执行任何操作。尝试给它们添加 v-if 和 v-else 指令，并实现 toggle() 方法，让我们可以使用按钮在它们之间切换。

```html
<script type="module">
import { createApp } from 'vue'

createApp({
  data() {
    return {
      awesome: true
    }
  },
  methods: {
    toggle() {
      this.awesome = !this.awesome
    }
  }
}).mount('#app')
</script>

<div id="app">
  <button @click="toggle">Toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</div>
```

### 列表渲染

我们可以使用 v-for 指令来渲染一个基于源数组的列表：

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

这里的 todo 是一个局部变量，表示当前正在迭代的数组元素。它只能在 v-for 所绑定的元素上或是其内部访问，就像函数的作用域一样。

注意，我们还给每个 todo 对象设置了唯一的 id，并且将它作为特殊的 key attribute 绑定到每个 `<li>`。key 使得 Vue 能够精确的移动每个` <li>`，以匹配对应的对象在数组中的位置。

更新列表有两种方式：

在源数组上调用变更方法：

```js
this.todos.push(newTodo)
```

使用新的数组替代原数组：

```js
this.todos = this.todos.filter(/* ... */)
```

#### 练习

这里有一个简单的 todo 列表——试着实现一下 addTodo() 和 removeTodo() 这两个方法的逻辑，使列表能够正常工作！

```html
<script type="module">
import { createApp } from 'vue'

// 给每个 todo 对象一个唯一的 id
let id = 0

createApp({
  data() {
    return {
      newTodo: '',
      todos: [
        { id: id++, text: 'Learn HTML' },
        { id: id++, text: 'Learn JavaScript' },
        { id: id++, text: 'Learn Vue' }
      ]
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(t => t !== todo)
    }
  }
}).mount('#app')
</script>

<div id="app">
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" required placeholder="new todo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</div>
```



# 阶段一复习

## 数组对象

### 方法

#### Array.prototype.forEach()

**`forEach()`** 方法对数组的每个元素执行一次给定的函数。

##### 语法

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

###### 参数

- callbackFn 必须
  为数组中每个元素执行的函数。并会丢弃它的返回值。该函数被调用时将传入以下参数：
  - element 必须
    数组中正在处理的当前元素。
  - index 可选
    数组中正在处理的当前元素的索引。
  - array 可选
    调用了 forEach() 的数组本身。
- thisArg 可选
  执行 callbackFn 时用作 this 的值。参见迭代方法。

###### 返回值

undefined

##### 描述

forEach() 不会改变其调用的数组，但是，作为 callbackFn 的函数可以更改数组。

#### Array.prototype.find()

find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

> - 如果需要在数组中找到对应元素的索引，请使用 findIndex()。
> - 如果需要查找某个值的索引，请使用 Array.prototype.indexOf()。（它类似于 findIndex()，但只是检查每个元素是否与值相等，而不是使用测试函数。）
> - 如果需要查找数组中是否存在某个值，请使用 Array.prototype.includes()。同样，它检查每个元素是否与值相等，而不是使用测试函数。
> - 如果需要查找是否有元素满足所提供的测试函数，请使用 Array.prototype.some()。

##### 语法

```js
find(callbackFn)
find(callbackFn, thisArg)
```

###### 参数

- callbackFn 必需
  为数组中的每个元素执行的函数。它应该返回一个真值来表示已经找到了匹配的元素。该函数被调用时将传入以下参数：
  - element 必需
    数组中当前正在处理的元素。
  - index 可选
    正在处理的元素在数组中的索引。
  - array 可选
    调用了 find() 的数组本身。
- thisArg 可选
  执行 callbackFn 时用作 this 的值。参见迭代方法。

###### 返回值

数组中第一个满足所提供测试函数的元素的值，否则返回 undefined。

##### 描述

find() 不会改变被调用的数组，但是提供给 callbackFn 的函数可能会改变它。

#### Array.prototype.findIndex()

**`findIndex()`** 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1。

##### 语法

```js
findIndex(callbackFn)
findIndex(callbackFn, thisArg)
```

###### 参数

- callbackFn 必需
  为数组中的每个元素执行的函数。它应该返回一个真值以指示已找到匹配元素，否则返回一个假值。该函数被调用时将传入以下参数：
  - element 必需
    数组中当前正在处理的元素。
  - index 可选
    正在处理的元素在数组中的索引。
  - array 可选
    调用了 findIndex() 的数组本身。
- thisArg 可选
  执行 callbackFn 时用作 this 的值。参见迭代方法。

###### 返回值

数组中第一个满足测试条件的元素的索引。否则返回 -1。

##### 描述

`findIndex()` 不会改变被调用的数组，但是提供给 `callbackFn` 的函数可能会改变它。

#### Array.prototype.filter()

filter() 方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素。

##### 语法

filter(callbackFn)
filter(callbackFn, thisArg)

###### 参数

- callbackFn 必需
  为数组中的每个元素执行的函数。它应该返回一个真值以将元素保留在结果数组中，否则返回一个假值。该函数被调用时将传入以下参数：
  - element 必需
    数组中当前正在处理的元素。
  - index 可选
    正在处理的元素在数组中的索引。
  - array 可选
    调用了 filter() 的数组本身。
- thisArg可选
  执行 callbackFn 时用作 this 的值。参见迭代方法。

###### 返回值

返回给定数组的一部分的浅拷贝，其中只包括通过提供的函数实现的测试的元素。如果没有元素通过测试，则返回一个空数组。

##### 描述

filter() 不会改变原始数组。

#### Array.prototype.map()

**`map()`** 方法**创建一个新数组**，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

##### 语法

```js
map(callbackFn)
map(callbackFn, thisArg)
```

###### 参数

- callbackFn 必需
  为数组中的每个元素执行的函数。它的返回值作为一个元素被添加为新数组中。该函数被调用时将传入以下参数：
  - element 必需
    数组中当前正在处理的元素。
  - index 可选
    正在处理的元素在数组中的索引。
  - array 可选
    调用了 map() 的数组本身。
- thisArg 可选
  执行 callbackFn 时用作 this 的值。参见迭代方法。

###### 返回值

一个新数组，每个元素都是回调函数的返回值。

##### 描述

map() 不会改变原始数组。

#### Array.prototype.some()

**`some()`** 方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。如果在数组中找到一个元素使得提供的函数返回 true，则返回 true；否则返回 false。它不会修改数组。

##### 语法

some(callbackFn)
some(callbackFn, thisArg)

###### 参数

- callbackFn 必需
  为数组中的每个元素执行的函数。它应该返回一个真值以指示元素通过测试，否则返回一个假值。该函数被调用时将传入以下参数：
  - element 必需
    数组中当前正在处理的元素。
  - index 可选
    正在处理的元素在数组中的索引。
  - array 可选
    调用了 some() 的数组本身。
- thisArg 可选
  执行 callbackFn 时用作 this 的值。参见迭代方法。

###### 返回值

如果回调函数对数组中至少一个元素返回一个真值，则返回 true。否则返回 false。

##### 描述

some() 不会改变调用它的数组，但指定的 callbackFn 函数可以。

#### Array.prototype.every()

every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。

##### 语法

```js
every(callbackFn)
every(callbackFn, thisArg)
```

###### 参数

- callbackFn 必需
  为数组中的每个元素执行的函数。它应该返回一个真值以指示元素通过测试，否则返回一个假值。该函数被调用时将传入以下参数：
  - element 必需
    数组中当前正在处理的元素。
  - index 可选
    正在处理的元素在数组中的索引。
  - array 可选
    调用了 every() 的数组本身。
- thisArg 可选
  执行 callbackFn 时用作 this 的值。参见迭代方法。

###### 返回值

如果 callbackFn 为每个数组元素返回真值，则为 true。否则为 false。

##### 描述

`every()` 不会改变调用它的数组，但指定的 `callbackFn` 函数可以。

#### Array.prototype.reduce()

**`reduce()`** 方法对数组中的每个元素按序执行一个提供的 **reducer** 函数，每一次运行 **reducer** 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被用作初始值，迭代器将从第二个元素开始执行（即从索引为 1 而不是 0 的位置开始）。

##### 示例

```js
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
// Expected output: 10
```

reducer 逐个遍历数组元素，每一步都将当前元素的值与前一步的结果相加（该结果是之前所有步骤结果的总和）——直到没有更多需要相加的元素。

##### 语法

reduce(callbackFn)
reduce(callbackFn, initialValue)

###### 参数

- callbackFn
  为数组中每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。该函数被调用时将传入以下参数：
  - accumulator
    上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为 array[0] 的值。
  - currentValue
    当前元素的值。在第一次调用时，如果指定了 initialValue，则为 array[0] 的值，否则为 array[1]。

  - currentIndex
    currentValue 在数组中的索引位置。在第一次调用时，如果指定了 initialValue 则为 0，否则为 1。

  - array
    调用了 reduce() 的数组本身。
- initialValue 可选
  第一次调用回调时初始化 accumulator 的值。如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。如果没有指定 initialValue，则 accumulator 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。在这种情况下，如果数组为空（没有第一个值可以作为 accumulator 返回），则会抛出错误。

###### 返回值

使用“reducer”回调函数遍历整个数组后的结果。

###### 异常

TypeError
如果数组为空且未提供 initialValue，则会抛出异常。

##### 描述

reduce() 不会改变被调用的数组，但是作为 callbackFn 提供的函数可能会改变数组。