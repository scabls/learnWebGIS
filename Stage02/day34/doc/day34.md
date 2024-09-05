# 计算属性与侦听器

## 计算属性

#### 概念

计算属性就是基于现有属性计算后的属性

#### 作用

计算属性用于对原始数据的再次加工，描述依赖响应式状态的复杂逻辑

#### 基础语法

##### computed选项

是根组件对象的一个属性,值是一个对象

对象的方法名就是计算属性名，方法的返回值就是计算属性的值

##### 示例

```html
    <div id="app">
      <button @click="count++">点击+1</button>
      <br />
      当前计数为:{{count}}
      <br />
      双倍计数为:{{doubleCount}}
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            // 已有属性
            count: 0,
          }
        },
        // computed选项,是根组件对象的一个属性,值是一个对象
        computed: {
          // 计算属性名:方法名
          doubleCount: function () {
            // 计算属性值:方法返回值
            return this.count * 2
          },
        },
      })
      const instance = app.mount('#app')
      console.dir(instance)
      // 结论
      // 1. 计算属性会创造一个新的属性, 代理到当前组件实例上
      // 2. 计算属性依据已有的状态进行计算, 将回调函数的返回值做为 计算属性的属性值
    </script>
```

##### 结论

1. 计算属性会创造一个新的属性, 代理到当前组件实例上
2. 计算属性依据已有的状态进行计算, 将回调函数的返回值做为计算属性的属性值

##### 注意

在选项中定义的状态和方法不能重名, 因为它们都会被代理到组件实例上

#### 为什么要使用计算属性

1. 避免在模板中使用复杂的表达式
2. 方法没有缓存, 每次调用方法, 代码会执行一次，性能消耗大
3. 计算属性存在缓存, 如果依赖的状态未发生改变, 就不会重新计算

```html
    <div id="app">
      请输入一个字符串: <input type="text" v-model="str" />
      <!-- 约定: 在模板中尽可能是使用简洁的表达式 -->
      <h3>反转后的字符串(表达式实现): {{str.split('').reverse().join('')}}</h3>
      <!-- 每次调用都会执行, 性能消耗大。注意调用方法要加() -->
      <h3>方法实现: {{myReverse()}}--{{myReverse()}}--{{myReverse()}}</h3>
      <!-- 计算属性存在缓存, 如果依赖的状态未发生改变, 就不会重新计算。注意计算属性是一个属性 -->
      <h3>计算属性实现: {{reverseStr}}--{{reverseStr}}--{{reverseStr}}</h3>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            // 已有属性
            str: '',
          }
        },
        methods: {
          myReverse() {
            console.log('执行了方法')
            return this.str.split('').reverse().join('')
          },
        },
        // computed选项,是根组件对象的一个属性,值是一个对象
        computed: {
          // 计算属性名:方法名
          reverseStr() {
            // 计算属性值:方法返回值
            console.log('使用了计算属性')
            return this.str.split('').reverse().join('')
          },
        },
      })
      app.mount('#app')
      // 在选项中定义的状态和方法不能重名, 因为它们都会被代理到组件实例上
    </script>
```

注意：方法就是值为匿名函数的属性，作为属性的值的匿名函数又可以叫做回调函数。示例使用的是ES6的简洁方法名

#### 计算属性传参

我们无法通过直接给计算属性的回调函数传参。但是回调函数可以返回一个函数，用来接收参数（高阶函数、闭包的思想）

```html
...
<td>{{showPrice(index)}}</td>
...
<script>
...
    computed: {
        showPrice() {
            return index => '￥' + this.books[index].price.toFixed(2)
        },
    },
...
</script>
```

这种情况下，组件实例对象代理的showPrice属性值就是一个函数，可以接收参数

注意：返回的函数要有返回值，其被传参调用后的返回值将作为用于渲染的最终数据

#### 使用场景

数据过滤一般考虑使用`计算属性`实现

## 侦听器

#### 概念

可以通过watch配置项, 侦听已经存在的状态(组件实例上的属性)的改变

#### 基础语法

##### watch选项

watch选项是根组件的一个属性, 值是一个对象

可以通过watch配置项, 侦听已经存在的状态(组件实例上的属性)的改变

对象的方法名就是侦听的属性名

##### 示例

```html
    <div id="app">
      姓: <input type="text" v-model="surname" /> <br />
      名: <input type="text" v-model="name" />
      <h3>姓名: {{fullName}}</h3>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            surname: '',
            name: '',
            fullName: '',
          }
        },
        // watch选项是根组件的一个属性, 值是一个对象
        // 可以通过watch配置项, 侦听已经存在的状态(组件实例上的属性)的改变
        watch: {
          // 方法名是侦听的属性名
          // 侦听surname的改变
          surname: function () {
            console.log('surname改变了')
            this.fullName = this.surname + this.name
          },
          // ES6简写形式
          // 侦听name属性的改变
          name() {
            console.log('name改变了')
            this.fullName = this.surname + this.name
          },
        },
      })
      app.mount('#app')
```

#### 特点

在watch对应的回调函数中, 对于值类型的数据(如字符串,数字,布尔值)，可以获取到新值和 旧值

```html
<div id="app">
  <p>对于值类型的数据(如字符串,数字,布尔值),watch选项可以获得新旧值</p>
  <input type="text" v-model="msg" /><br />
</div>
<script>
  const { createApp } = Vue
  const app = createApp({
    data() {
      return {
        msg: '',
      }
    },

    watch: {
      msg(newValue, oldValue) {
        console.log('新值: ', newValue) //变化后的值
        console.log('旧值: ', oldValue) //变化前的值
      },
    },
  })
  app.mount('#app')
```

注意：顺序，第一个形参是新值，第二个是旧值

#### 深度侦听

对于嵌套多层的对象,watch选项默认是浅层次侦听

只能侦听data选项返回对象的顶层属性的变化，若某个属性是引用类型（如数组、对象），则无法侦听这个对象的属性值变化。

```js
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            stu: {
              name: 'xiaoming',
              age: 20,
              gf: {
                name: 'xiaomei',
                age: 19,
                city: {
                  name: 'beijing',
                },
              },
            },
          }
        },
        watch: {
          // 函数语法
          stu() {
            console.log('stu变化了')
          },
        },
      })

      const instance = app.mount('#app')
      setTimeout(() => {
        console.log('女朋友去广州了...')
        instance.stu.gf.city.name = 'guangzhou'
      }, 1000)
```

这种变化默认是无法侦听到的，如果希望侦听到，需要开启深度侦听

##### 开启深度侦听

将watch选项的属性由函数语法改为对象语法

属性名依旧是侦听的状态名，属性值变为一个对象

设置对象的deep属性为true

在handler回调函数里书写侦听到变化后的操作

```js
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            stu: {
              name: 'xiaoming',
              age: 18,
              gf: {
                name: 'xiaomei',
                age: 18,
                city: {
                  name: 'beijing',
                },
              },
            },
          }
        },
        watch: {
          // 函数语法
          // stu() {
          //   console.log('stu变化了')
          // },
          // 对象语法
          stu: {
            deep: true,
            //  handler就是回调函数, 默认是懒执行的.
            handler() {
              console.log('stu变化了')
            },
          },
        },
      })
      const instance = app.mount('#app')
      setTimeout(() => {
        console.log('女朋友去广州了')
        instance.stu.gf.city.name = 'guangzhou'
      }, 1000)
      // 默认是不能侦听到对象内部的对象的属性变化
      // 如果希望深层次侦听，可以使用deep: true选项
```

#### 回调函数执行的时机

默认情况下, 会先执行watch选项中的回调函数, 再执行渲染函数

watch在DOM更新之前调用. 得到的是 DOM更新之前的数据

```html
    <div id="app">{{msg}}</div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            msg: 'hello',
          }
        },
        watch: {
          // 默认情况下, 会先执行回调函数, 再执行渲染函数
          msg() {
            // 所以打印的dom的innerHTML是渲染前的
            console.log(document.querySelector('#app').innerHTML)
          },
        },
      })
      const instance = app.mount('#app')
      setTimeout(() => {
        instance.msg = 'world'
      }, 1000)
    </script>
```

可以通过`flush: 'post'`设置在DOM更新之后调用回调

```js
// 可以通过flush: 'post'设置在DOM更新之后调用回调
msg: {
    flush: 'post',
    handler() {
        console.log(document.querySelector('#app').innerHTML)
    },
},
```

注意：从函数语法改为了对象语法

#### nextTick

如果希望获取数据更新之后的dom, 也可以将操作放在nextTick回调中

```html
    <!-- 编写页面 -->
    <div id="app">{{msg}}</div>
    <!-- 创建app实例 -->
    <script>
      const { createApp, nextTick } = Vue
      const app = createApp({
        data() {
          return {
            msg: 'hello',
          }
        },
        watch: {
          msg() {
            // 如果希望获取数据更新之后的dom, 要将操作放在nextTick回调中
            // 若将操作放在nextTick的回调函数中, 操作会最后执行
            // console.log(document.querySelector('#app').innerHTML)
            nextTick(() => {
              console.log(document.querySelector('#app').innerHTML)
            })
          },
        },
      })
      const instance = app.mount('#app')

      setTimeout(() => {
        instance.msg = 'world'
      }, 1000)

      // 默认情况
      // msg: [watch的回调, 渲染函数, nextTick定义的回调]
    </script>
```

注意： 先从Vue中引入nextTick方法

注意：nextTick的参数是一个回调函数，函数体里定义了操作

##### 默认情况下的顺序

函数语法下

msg: watch的回调 --> 渲染函数 --> nextTick定义的回调

#### 与计算属性的差别

1. 是否会在组件实例中挂载新属性? 
   - computed会
   - watch不会
2. 对应关系
   - computed是关注结果；多对一, 可以同时监听多个值改变, 最终计算得到一个新的属性
   - watch是关注变化的过程；一对多, 主要监听一个属性的变化, 执行多种逻辑
3. 能否获取新旧值?
   - computed不能
   - watch能

# 作业总结

Vue互动教程8

数据过滤一般考虑使用`计算属性`实现

```js
data() {
    return {
        hideCompleted: false,
    }
},

    ...

computed: {
    filteredTodos() {
        return this.hideCompleted
            ? this.todos.filter((t) => !t.done)
        : this.todos
    }
},
```

