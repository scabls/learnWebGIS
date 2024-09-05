# 组件基础

## 组件

### 概念

组件可以理解成项目的**零件**

**项目** 由多个 **组件** 构成的

举例

- 一个房子是一个Vue应用, 那么客厅/卧室/厨房/卫生间就是组件
- 一个电脑是一个Vue应用, 那么硬盘/内存/主板/显示器/键盘就是组件

组件分为

- 全局组件
- 局部组件

## 全局组件

### 概念

顾名思义, 全局都可以使用的组件

### 使用组件

#### 注册全局组件

又称创建组件/定义组件

通过应用实例的compotent()方法注册全局组件

```js
app.component('组件名', 组件配置对象{})
```

在组件配置对象中,  可以配置多个选项。

其中template或render选项用来指定模板

```js
      // 通过应用实例的component方法创建全局组件
      // app.component('组件名', 组件配置对象{})
      app.component('com', {
        // 在这个对象中, 可以配置各种选项
        // 1. 通过template或render函数指定模板
        template: '<div>全局组件<div>',
      })
```

##### 注意

组件名是字符串

组件的状态能在模板直接访问

#### 引用组件

组件要在模板中引用

根组件没有指定template或render选项时,使用容器的innerHTML作为模板

```html
    <div id="app">
      <!-- 根组件没有指定template或render选项时,使用容器的innerHTML作为模板 -->
      {{msg}}
      <!-- 引用组件 -->
      <com></com>
      <com></com>
      <com></com>
    </div>
```

在渲染时, 引用的组件中指定的模板, 会替换组件的引用标签

#### 注意事项

1. 组件名不能跟html内置或保留的关键字同名(不跟固有元素重名)

2. 组件名称通常使用多个单词

3. 在js中使用大驼峰命名法, 在html中使用短横线`-`连接形式(kebab-case)

#### 示例

```html
    <div id="app">
      <!-- 引用组件 -->
      <count-button></count-button>
      <count-button></count-button>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({})
      // app.component('组件名', 组件配置对象{})
      // 1. 组件名不能跟html内置或保留的关键字同名(不跟固有元素重名)
      // 2. 组件名称通常使用多个单词
      // 3. 在js中使用大驼峰命名法, 在html中使用短横线`-`连接形式
      app.component('CountButton', {
        // 组件实例的状态能在模板直接访问
        template: '<button @click="count++">你点了我{{count}}次</button>',
        // 将data这种函数称为工厂函数
        // Vue 将在创建新组件实例的时候调用此函数，并将函数返回的对象用响应式系统进行包装。
        // 此对象的所有顶层属性都会被代理到组件实例 (即方法和生命周期钩子中的 this) 上
        data() {
          // 4. 返回一个新对象, 所以各组件的状态是独立的
          return {
            count: 0,
          }
        },
      })
      app.mount('#app')
```

### 组件的复用

每次引用组件, 都会创建一个组件实例, 它们互不干扰。那么每个组件的状态是如何相互独立的呢?

这全依赖于组件配置对象中的data选项。

data选项不直接提供一个对象,而是一个返回对象的函数。这种函数被称为工厂函数

Vue 将在创建新组件实例的时候调用此函数，并将函数返回的对象用响应式系统进行包装。此对象的所有顶层属性都会被代理到组件实例 (即方法和生命周期钩子中的 this) 上。

返回对象时, 实质上是通过new关键字新创建了一个对象, 在内存中拥有独立的空间, 所以各组件的状态是独立的

示例代码见上方示例

### 如何理解全局

在应用实例上注册的组件, 之所以被成为全局组件, 是因为可以在包括根组件的任何组件的模板中引用。但是, 此全局仅限于当前应用实例内, 不能在其余应用实例引用。

更详细的解释, 等在了解局部组件之后

```html
    <div id="app">
      <!-- 引用组件 -->
      <p><count-button></count-button></p>
      <count-button></count-button>
    </div>
    <div id="app2">
      <!-- 无法跨app访问组件 -->
      <count-button></count-button>
      <count-button></count-button>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({})
      // 在app上注册的组件, 可以在app内任意处使用, 无论是根组件的模板内, 还是任何组件的模板内;
      // 但不能在其他app使用
      app.component('CountButton', {
        template: '<button @click="count++">你点了我{{count}}次</button>',
        data() {
          return {
            count: 0,
          }
        },
      })
      app.mount('#app')
      const app2 = createApp({})
      app2.mount('#app2')
    </script>
```

## 局部组件

### 概念

> 一般在单页面应用(SPA)中使用较多的是局部组件
>
> 局部组件只属于某一个app实例, 通过components添加(挂载)
>
> - 通常将**组件参数**单独定义, 方便工程化时管理
> - 通常将**组件模板**单独定义, 方便工程化时管理
>
> `SFC`: `Single File Component`(单文件组件)

通过组件配置对象中的components选项注册的组件

components选项是一个对象, 属性名为组件名, 属性值是一个组件配置对象

### 使用组件

#### 声明局部组件(定义组件配置对象)

```js
      const MyCom = {
        template: '<div>局部组件</div>',
      }
```

#### 挂载局部组件(注册组件)

```js
      const app = createApp({
        components: {
          // 组件名: 组件配置对象
          // 使用了ES6对象属性的简写形式
          MyCom,
        },
      })
```

注意, 这里使用了ES6对象的属性简写, 直接将变量作为属性, 变量名就是属性名, 变量值就是属性值

#### 使用局部组件(在模板中使用)

```html
    <div id="app">
      <!-- 引用组件 -->
      <my-com></my-com>
    </div>
    <script>
      const { createApp } = Vue
      // 1. 声明局部组件(定义组件配置对象)
      const MyCom = {
        template: '<div>局部组件</div>',
      }
      // 2. 挂载局部组件(注册组件)
      // 3. 使用局部组件(在模板中使用)
      const app = createApp({
        components: {
          // 组件名: 组件配置对象
          // 使用了ES6对象属性的简写形式
          MyCom,
        },
      })
      app.mount('#app')
    </script>
```

#### 注意事项

组件名的在js中使用大驼峰命名法, 在引用时使用短横线连接的形式

### 单文件组件

为了更方便工程化处理, 通常将组件分为三个部分

- 对象(JS)
- 模板(HTML)
- 样式(CSS)

```html
<template>
  <!-- 在这里写组件的模板 -->
</template>

<script>
// 在这里写组件的逻辑
</script>

<style>
/* 在这里写组件的样式 */
</style>

// 一个.vue文件就是一个组件.(SFC: Single File Component) // .vue文件需要借助 vue工具, 编译成一个
js对象, 类似于下面的配置选项 { template: `template部分的代码编译后放在这里`, name: '', data() {} }
```

#### 如何理解组件

1. **字面上**: 组成项目的零件
2. **HTML层面**: 具体特定功能DOM集合
3. **JS层面**: 一个component实例对象

### 如何理解局部

在根组件或其他组件的 `components` 选项中注册的组件是局部的。局部组件只在注册时挂载的组件的模板中可用。其他组件不能直接使用这个局部注册的组件，除非也在它们的 `components` 选项中注册。

#### 示例

在first-com的模板中可引用second-com, 但是根组件的模板中不能引用second-com

```html
    <div id="app">
      <!-- 引用组件 -->
      <first-com></first-com>
      <!-- second-com组件是在first-com中注册的,就只能在first-com的模板中使用 -->
      <second-com></second-com>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        components: {
          FirstCom: {
            template: `
            <div>
              <h1>这是第一个组件</h1>
              <second-com></second-com>
              </div>
            `,
            components: {
              SecondCom: {
                template: '<div>这是第二个组件</div>',
              },
            },
          },
        },
      })
      app.mount('#app')
    </script>
```

在根组件的模板中可引用third-com, 但是first-com的模板中不能引用third-com

```html
    <div id="app">
      <!-- 引用组件 -->
      <first-com></first-com>
      <third-com></third-com>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        components: {
          FirstCom: {
            template: `
            <div>
              <h1>这是第一个组件</h1>
              <third-com></third-com>
              </div>
            `,
          },
          ThirdCom: {
            template: '<div>这是第三个组件</div>',
          },
        },
      })
      app.mount('#app')
    </script>
```

### 深入理解父子关系

**思考: 父子关系在什么时候确定?**

1. 挂载时
2. 渲染时

答案是渲染时

组件之间的挂载关系决定的是能否在父组件的模板中引用子组件。

如果子组件不是挂载在父组件上, 那么父组件在模板中就无法引用子组件

如果还抱有疑惑, 可以在vue调试工具看到各个组件的父子关系和兄弟关系

### 局部vs全局

能看出哪些引用是有效的,哪些是无效的吗?

```html
    <div id="app">
      <!-- 引用组件 -->
      <first-com></first-com>
      <second-com></second-com>
      <third-com></third-com>
      <forth-com></forth-com>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        components: {
          ThirdCom: {
            template: `<first-com></first-com>
      <second-com></second-com>`,
          },
        },
      })
      app.component('FirstCom', {
        template: `
            <div>
              <h1>这是第一个组件</h1>
              <second-com></second-com>
              </div>
            `,
      })
      app.component('SecondCom', {
        template: '<div>这是第二个组件</div>',
      })
      app.component('ForthCom', {
        template: '<third-com></third-com>',
      })
      app.mount('#app')
    </script>
```

全局组件可以在任何模板中引用, 局部组件只能在挂载的组件的模板中引用

## 组件通信

### 组件树

通常一个单页应用(SPA)会以一棵嵌套的组件树的形式来组织

### 为什么需要组件通信

组件规定了结构和样式, 但是数据需要可以改变

举例: 

> 假如每一篇文章是一个组件
>
> - 文章的标题可以不同
> - 内容可以不同. 
>
> 而这些数据需要从父组件传入

> 每篇文章上有个关闭按钮, 点击时可以关闭对应的组件
>
> 组件会触发事件, 要通知给父组件(负责渲染子组件)

### 最常见的通信方式

各个组件之间以嵌套的关系组合在一起，那么这个时候不可避免的会有组件间通信的需求

**主要分为两种情况**

- **父向子** 传递数据
- **子向父** 传递数据

## props选项

### 概念

props选项用来声明特殊的属性(状态), 这些属性可接收来自组件外部的数据。props中的属性和data、methods中的一样, 会被挂载到当前组件实例上,能在模板 和组件的 `this` 上下文中访问

props选项可以是一个数组, 也可以是一个对象。

对象的属性名是新声明的属性名, 对象的属性值是新声明属性的数据类型。

但更常用的数组, 每个元素都是一个字符串,作为新声明属性的属性名。(为了区分,就叫这些属性为prop属性吧)

那么这些属性如何接收来自外部的数据呢?

### 传递数据

在引用组件时, 在组件引用的标签上, 将props声明的属性名作为标签的自定义属性名, 自定义属性的值就会被传递给组件内对应的prop属性

```html
    <div id="app">
      <!-- 借助与props中同名的自定义属性 向 组件 传递数据 -->
      <blog-post title="第一篇文章"></blog-post>
      <blog-post title="第二篇文章"></blog-post>
      <blog-post title="第三篇文章"></blog-post>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        components: {
          BlogPost: {
            // 在props中声明一些属性, 可以接受外部传过来的数据
            // props中的属性和data、methods中的一样, 会被挂载到当前组件实例上
            props: ['title'],
            template: `
            <div>
              <h2>这是BlogPost组件</h2>
              <p>文章标题: {{title}}</p>
              </div>
            `,
          },
        },
      })

      app.mount('#app')
    </script>
```

### 组件和指令: 父向子传递数据

若使用属性绑定, 将组件引用标签上prop属性对应的attribute与父组件的property(状态)进行绑定, 就实现了将父组件的数据传递给子组件

```html
    <div id="app">
      <!-- 借助与props中同名的自定义属性 向 组件 传递数据 -->
      <!-- 使用属性绑定,将title attribute的值绑定为根组件的title property/状态 -->
      <blog-post :title="title"></blog-post>
      <blog-post title="第二篇文章"></blog-post>
      <blog-post title="第三篇文章"></blog-post>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            title: '第一篇文章(来自根组件)',
          }
        },
        components: {
          BlogPost: {
            // 在props中声明一些属性, 可以接受外部传过来的数据
            // props中的属性和data、methods中的一样, 会被挂载到当前组件实例上
            props: ['title'],
            template: `
            <div>
              <h2>这是BlogPost组件</h2>
              <p>文章标题: {{title}}</p>
              </div>
            `,
          },
        },
      })

      app.mount('#app')
    </script>
```

### 组件和v-for

到这里我们可以看到, 组件引用标签在使用上和普通的html标签也没有很大区别。不只属性绑定, 其他指令如v-for, 也可以在组件引用标签上使用

```html
    <div id="app">
      <!-- 借助与props中同名的自定义属性 向 组件 传递数据 -->
      <!-- 使用属性绑定,将title attribute的值绑定为根组件的title property/状态 -->
      <blog-post v-for="blog in blogs" :title="blog.title" :key="blog.id"></blog-post>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            blogs: [
              { id: 1, title: '第一篇文章' },
              { id: 2, title: '第二篇文章' },
              { id: 3, title: '第三篇文章' },
            ],
          }
        },
        components: {
          BlogPost: {
            // 在props中声明一些属性, 可以接受外部传过来的数据
            // props中的属性和data、methods中的一样, 会被挂载到当前组件实例上
            props: ['title'],
            template: `
            <div>
              <h2>这是BlogPost组件</h2>
              <p>文章标题: {{title}}</p>
              </div>
            `,
          },
        },
      })

      app.mount('#app')
    </script>
```

## emits选项和$emit方法

### 概念

组件实例提供了一个自定义事件系统。

有时子组件需要与父组件进行交互, 告诉父组件执行某些操作。这就要子组件上抛自定义事件来达到目的

emits选项是一个数组, 每个元素都是一个字符串,作为要抛出的事件的事件名

```js
emits: ['increment'],
```

$emit()方法可以根据传入的事件名称(字符串)抛出一个事件

```js
$emit('increment')
```

父组件可以通过 `v-on` 或 `@` 来选择性地监听子组件上抛的事件，就像监听原生 DOM 事件那样。

```js
@increment="handler"
```

(发布订阅模式)

#### 示例

```html
    <div id="app">
      <blog-post v-if="isShow" @close="isShow=false"></blog-post>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            isShow: true,
          }
        },
        components: {
          BlogPost: {
            template: `
              <div>
                <h2>这是BlogPost组件</h2>
                <p>文章标题: 第一篇文章</p>
                <button @click="handleClose">关闭</button>
                </div>
              `,
            methods: {
              handleClose() {
                // 通过$emit抛出一个自定义事件
                this.$emit('close')
              },
            },
          },
        },
      })

      app.mount('#app')
    </script>
```

注意: 示例中的抛出事件是方法事件处理器的形式, 也可以写成内联事件处理器的形式

```html
<button @click="$emit('close')">关闭</button>
```

### 抛出事件时传递参数

$emit()方法可以接收多个参数, 第一个参数是事件的名称, 其余参数都将传递给父组件的事件监听器

```js
$emit('close', this.id)  //假设有id属性
```

传的参数可以是data选项声明的, 也可以是props声明的。也可以是字面量

那么父组件的事件监听器如何接收这些参数呢?

### 事件处理器接收参数

#### 内联事件处理器

```html
      <blog-post
        v-for="blog in filteredBlogs"
        :title="blog.title"
        :id="blog.id"
        :key="blog.id"
        @close="id => blogs.find(blog => blog.id === id).isShow = false"
      ></blog-post>
```

#### 方法事件处理器

```html
    <div id="app">
      <blog-post
        v-for="blog in filteredBlogs"
        :title="blog.title"
        :id="blog.id"
        :key="blog.id"
        @close="handleShow"
      ></blog-post>
      <!-- 内联形式: @close="id => blogs.find(blog => blog.id === id).isShow = false" -->
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
          
		.....
          
        methods: {
          handleShow(id) {
            this.blogs.find(blog => blog.id === id).isShow = false
          },
        },
            
       .....
       
      })

      app.mount('#app')
    </script>
```

#### 注意事项

与监听DOM原生事件不同, 监听DOM原生事件时,内联事件处理器使用箭头函数时的默认实参是事件对象event; 方法事件处理器不带参数,回调函数的形参默认接收的实参也是事件对象event。

但是监听子组件抛出的事件时, 默认接收到的参数不是事件对象event,而是抛出事件时附带的参数

#### 完整示例

```html
    <div id="app">
      <blog-post
        v-for="blog in filteredBlogs"
        :title="blog.title"
        :id="blog.id"
        :key="blog.id"
        @close="handleShow"
      ></blog-post>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            blogs: [
              { id: 1, title: '第一篇文章', isShow: true },
              { id: 2, title: '第二篇文章', isShow: true },
              { id: 3, title: '第三篇文章', isShow: true },
            ],
          }
        },
        computed: {
          filteredBlogs() {
            return this.blogs.filter(blog => blog.isShow)
          },
        },
        methods: {
          handleShow(id) {
            this.blogs.find(blog => blog.id === id).isShow = false
          },
        },
        components: {
          BlogPost: {
            props: ['title', 'id'],
            template: `
            <div>
              <h2>这是BlogPost组件</h2>
              <p>文章标题: {{title}}</p>
              <button @click="handleClose">关闭</button>
              </div>
            `,
            emits:['close'],
            methods: {
              handleClose() {
                this.$emit('close', this.id)
              },
            },
          },
        },
      })

      app.mount('#app')
    </script>
```

#### 计数器案例

- 计数器在父组件中定义
- n在子组件中定义
- 每次+n, 父组件中的计数器根据子组件中输入的值累加

```html
    <div id="app">
      <p>当前计数为: {{count}}</p>
      <my-counter @increment="handleAdd"></my-counter>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            count: 0,
          }
        },
        methods: {
          handleAdd(value) {
            this.count += value
          },
        },
        components: {
          myCounter: {
            template: `
            <div>
              n=<input type="text" v-model.number="n">
              <button @click="handleClick">+n</button>
              </div>
            `,
            data() {
              return {
                n: 0,
              }
            },
            emits: ['increment'],
            methods: {
              handleClick() {
                this.$emit('increment', this.n)
              },
            },
          },
        },
      })

      app.mount('#app')
    </script>
```

