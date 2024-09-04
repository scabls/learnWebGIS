# 模板语法

## 表单双向绑定

### v-model可用的修饰符

.trim修饰符,修剪两端空格

```html'
用户名: <input type="text" v-model.trim="username" />
```

.number修饰符,将输入框的字符串转数字类型

```html
年龄: <input type="text" v-model.number="age" />
```

### input:radio的双向绑定

Vue将为单选框选项分组: v-model绑定同一状态

储存的状态值value属性

```html
性别: <input type="radio" id="male" value="male" v-model="gender" /><label for="male">男</label>
<input type="radio" id="female" value="female" v-model="gender" / ><label for="female">女</label>
```

### input:checkbox的双向绑定

复选框选项分组:  v-model绑定同一状态

将选中的复选框的value保存到状态,状态是一个数组

```html
爱好: <input type="checkbox" id="eat" value="eat" v-model="hobby" /><label for="eat">吃饭</label>
<input type="checkbox" id="sleep" value="sleep" v-model="hobby" /><label for="sleep">睡觉</label>
```

### select的双向绑定

下拉选择框:select标签上v-model绑定状态

储存被选择的option标签上value的值

select的value就是被选择的option的value

```html
城市:
<select id="city" v-model="city">
    <option value="wuhan">武汉</option>
    <option value="shanghai">上海</option>
</select>
```

### 计算器案例

#### eval()

**`eval()`** 函数会将传入的字符串当做 JavaScript 代码进行执行。

##### 语法

```js
eval(string)
```

##### 参数

string
一个表示 JavaScript 表达式、语句或一系列语句的字符串。表达式可以包含变量与已存在对象的属性。

##### 返回值

返回字符串中代码的返回值。如果返回值为空，则返回 undefined。

##### 注意

有安全隐患，不推荐使用

## 条件渲染

### 方法

当条件满足时, 渲染到页面

主要指令: `v-if`和`v-show`

```html
<div v-if="flag">这是通过v-if渲染的</div>
<div v-show="flag">这是通过v-show渲染的</div>
```

### 区别

- flag为true时,两者都会显示
- flag为false时, v-if不会创建元素,v-show创建元素但是设置内联样式为display:none

即v-show总是会渲染内容，只是切换css的display属性

频繁切换显示和隐藏时,推荐使用v-show

### v-if使用注意点

- v-if可以和v-else配合使用,v-show不行
- v-if可以和template配合使用,v-show不行
- v-else必需跟在v-if后面,不能单独使用
- v-if不能和v-for连用

```html
<div v-if="flag">这是通过v-if渲染的</div>
<div v-else="flag">这是通过v-else渲染的</div>

<!-- 
template不会被渲染到页面,标签上的v-if批量控制包含元素是否渲染
-->
<template v-if="flag">
    <div>在template内</div>
    <div>在template内</div>
    <div>在template内</div>
</template>
```

> template: 不可见的包装器元素，最后渲染的结果并不会包含这个 `<template>` 元素。

在指令表达式中, 除了使用变量外, 也可以使用表达式

```html
<div v-if="flag == true">这是用v-if渲染的元素</div>
```

仅作示例用，上边的表达式其实等价于

```html
<div v-if="flag">这是用v-if渲染的元素</div>
```

### 示例

通过按钮控制元素的显示/隐藏

```html
<div id="app">
    <button @click="flag=!flag">点击切换显示/隐藏</button>
    <div v-show="flag">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, adipisci!
    </div>
</div>
<script>
    const { createApp } = Vue
    const app = createApp({
        data() {
            return {
                flag: true,
            }
        },
    })

    app.mount('#app')
</script>
```

因为要频繁切换显示和隐藏，所以使用v-show

因为逻辑比较简单，所以点击事件使用内联事件处理器，写一个js表达式即可

## 列表渲染

列表渲染也称"循环渲染", 通过`v-for`遍历**数组**或者**对象**

### 遍历数组

#### 获取元素

如果只希望得到每个数组元素的值, 不需要得到下标

```html
<div v-for="item in items">{{item}}</div>
```

#### 获取元素和下标

如果希望得到每个数组元素的值和下标

```html
<li v-for="(person,index) in persons">
```

person表示当前正在迭代的数组元素。

index表示当前元素的索引

person和index只能在 v-for 所绑定的元素上或是其内部访问，就像函数的作用域一样

#### 与原生js的相似

`v-for` 变量的作用域和下面的 JavaScript 代码很类似：

```js
const parentMessage = 'Parent'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // 可以访问外层的 `parentMessage`
  // 而 `item` 和 `index` 只在这个作用域可用
  console.log(parentMessage, item.message, index)
})
```

注意 `v-for` 是如何对应 `forEach` 回调的函数签名的。实际上，你也可以在定义 `v-for` 的变量别名时使用解构，和解构函数参数类似：

```html
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- 有 index 索引时 -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

对于多层嵌套的 `v-for`，作用域的工作方式和函数的作用域很类似。每个 `v-for` 作用域都可以访问到父级作用域：

```html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

你也可以使用 `of` 作为分隔符来替代 `in`，这更接近 JavaScript 的迭代器语法：

```html
<div v-for="item of items"></div>
```

#### key属性

key是vue的内置属性, 虚拟dom的唯一标识,不会被渲染到容器元素中

```html
<li v-for="(person,index) in persons" :key="person.id">
```

在v-for中, 需要将key属性和唯一值绑定, 如果不写, 默认跟数组元素的索引绑定, 但是索引是会变化的, 可能会引起一些问题。

当你使用 `<template v-for>` 时，`key` 应该被放置在这个 `<template>` 容器上。

推荐在任何可行的时候为 v-for 提供一个 key attribute，除非所迭代的 DOM 内容非常简单, (例如：不包含组件或有状态的 DOM 元素)，或者你想有意采用默认行为来提高性能。

key 绑定的值期望是一个基础类型的值, 例如字符串或 number 类型, 不要用对象作为 v-for 的 key

### 遍历对象

- 只取值: `v-for="value in obj"`
- 取键和值: `v-for="(value, key) in obj"`
- 取键和值和索引: `v-for="(value, key, index) in obj"`

注意: 不要混淆在 v-for 中指代对象属性名的形参key和通过v-bind绑定的key属性

### 遍历数字

从1开始，1...n 

```html
<span v-for="num in 5">{{`${num},`}}</span>
```

#### 遍历字符串

```html
<span v-for="str in 'hello'">{{`${str},`}}</span>
```

### v-for与v-if

在一个元素上同时使用会报错，Property "todo" was accessed during render but is not defined on instance

因为在同一元素时，v-if比v-for优先级更高，无法访问v-for作用域的变量todo

相当于v-if{ v-for{} }

#### 解决方法

使用`<template>`

```html
    <div id="app">
      <ul>
        <!-- <li v-for="(todo,index) in todos" :key="todo.id" v-if="!todo.inDanger">
          {{index+1}}号伞兵{{todo.name}}
          <button @click="hidP(todo.id)">撤退</button>
        </li> -->
        <!-- 解决方法 -->
        <template v-for="(todo,index) in todos" :key="todo.id">
          <li v-if="!todo.inDanger">
            {{index+1}}号伞兵{{todo.name}}
            <button @click="hidP(todo.id)">撤退</button>
          </li>
        </template>
      </ul>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            todos: [
              { id: 1, name: '卢本伟', inDanger: false },
              { id: 2, name: '卢中伟', inDanger: false },
              { id: 3, name: '卢小伟', inDanger: false },
              { id: 4, name: '芦苇', inDanger: false },
            ],
          }
        },
        methods: {
          hidP(id) {
            // 获取数组中存储的对象的地址
            const todo = this.todos.find(item => item.id === id)
            // 修改地址指向对象的属性
            todo.inDanger = true
          },
        },
      })

      app.mount('#app')
    </script>
```

## 数组变化检测

### 变更方法

Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。这些变更方法包括：

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

在使用数组索引修改数组时（修改和添加），索引要小于等于数组长度，其他情况会报错。

```html
    <div id="app">
      <!-- 使用数组的方法 -->
      <button @click="phones.push({ id: 4, name: 'vivo', price: '2999' })">添加购物车</button>
      <button @click="phones.splice(3,1)">删除第四个</button>
      <!-- 不使用方法直接修改数组 -->
      <!-- [index]修改时,index<=arr.length时会成功,其余情况必报错 -->
      <button @click="phones[3] = { id: 4, name: 'vivo', price: '2999' }">添加第四个</button>
      <!-- 使用delete删除元素,报错 -->
      <button @click="delete phones[3]">删除第四个</button>
      <p>购物车</p>
      <ul>
        <li v-for="phone in phones" :key="phone.id">{{phone}}</li>
      </ul>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            phones: [
              { id: 1, name: '小米', price: '1999' },
              { id: 2, name: '华为', price: '3999' },
              { id: 3, name: 'oppo', price: '2999' },
            ],
          }
        },
        methods: {},
      })

      app.mount('#app')
    </script>
```

### 替换一个数组

变更方法，顾名思义，就是会对调用它们的原数组进行变更。相对地，也有一些不可变 (immutable) 方法，例如 filter()，concat() 和 slice()，这些都不会更改原数组，而总是返回一个新数组。当遇到的是非变更方法时，我们需要将旧的数组替换为新的：

```js
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

你可能认为这将导致 Vue 丢弃现有的 DOM 并重新渲染整个列表——幸运的是，情况并非如此。Vue 实现了一些巧妙的方法来最大化对 DOM 元素的重用，因此用另一个包含部分重叠对象的数组来做替换，仍会是一种非常高效的操作。

### 展示过滤或排序后的结果

有时，我们希望显示数组经过过滤或排序后的内容，而不实际变更或重置原始数据。在这种情况下，你可以创建返回已过滤或已排序数组的计算属性。

举例来说：

```js
data() {
  return {
    numbers: [1, 2, 3, 4, 5]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(n => n % 2 === 0)
  }
}
```

```js
<li v-for="n in evenNumbers">{{ n }}</li>
```

在计算属性不可行的情况下 (例如在多层嵌套的 `v-for` 循环中)，你可以使用以下方法：

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

```html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

在计算属性中使用 `reverse()` 和 `sort()` 的时候务必小心！这两个方法将变更原始数组，计算函数中不应该这么做。请在调用这些方法之前创建一个原数组的副本：

```diff
- return numbers.reverse()
+ return [...numbers].reverse()
```

## 样式绑定

通过绑定`class`属性 或者 `style`属性 修改样式

### class绑定

常见有两种语法

- 数组写法
- 对象写法

#### 概览

```html
    <div id="app">
      <p class="lightblue pink">原生css</p>
      <p :class="str">绑定静态字符串</p>
      <p :class="'lightblue pink'">绑定静态字符串</p>
      <p :class="arr">绑定静态数组</p>
      <!-- 值为true的属性名添加到class -->
      <p :class="{lightblue:false,pink:true}">绑定静态对象</p>
      <p :class="obj">绑定动态对象</p>
      <p :class="isActived?'pink':'lightblue'">绑定三元表达式</p>
      <p :class="{lightblue:isActived}">静态对象常用的处理方式</p>
      <p :class="str" class="green">class样式绑定和原生class会合并</p>
      <!-- 常见有两种语法
        ● 数组写法
        ● 对象写法
      -->
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            str: 'pink',
            arr: ['lightblue', 'pink'],
            obj: { lightblue: true, pink: false },
            isActived: true,
          }
        },
        methods: {},
      })

      app.mount('#app')
    </script>
```

补充：css层叠性顺序依据是css的书写顺序 

#### 绑定对象

```html
<div :class="{ active: isActive }"></div>
```

上面的语法表示 active 是否存在取决于数据属性 isActive 的真假值。真时添加，假时去除。

对象可以是内联字面量形式，也可以是data选项中定义的对象状态，或者是返回对象的计算属性。对象属性的值也可以是三元表达式。

#### 绑定数组

数组中的元素会被添加到class列表；

元素可以是字符串、状态、三元表达式或者对象

### style绑定

:style 支持绑定 JavaScript 对象值，对应的是 HTML 元素的 style 属性

常用绑定对象

#### 绑定对象

样式对象属性的键和值（属性名和属性值）会被展开成为对应的style属性

```html
    <div id="app">
      <p style="color: blue">原生内联style</p>
      <!-- 展开对象的键值对 -->
      <p :style="obj">style绑定对象</p>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            obj: {
              color: 'red',
              // 属性名有'-'时
              'font-size': '1.2rem',
              // 或者使用小驼峰命名法
              backgroundColor: 'lightblue',
            },
          }
        },
      })

      app.mount('#app')
    </script>
```

同样的，如果样式对象需要更复杂的逻辑，也可以使用返回样式对象的计算属性。

#### 绑定数组

我们还可以给 `:style` 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上：

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

# 作业总结

仿京东tab栏

```html
    <div id="app">
      <div class="tab-main">
        <ul>
          <!-- 方式一:绑定三元表达式 -->
          <!-- <li
            v-for="(value,index) in lis"
            :class="clickedIndex==index?'current':''"
            @click="clickedIndex=index"
          > -->
          <!-- 方式二:绑定对象 -->
          <li
            v-for="(value,index) in lis"
            :class="{current:clickedIndex===index}"
            @click="clickedIndex=index"
          >
            {{value}}
          </li>
        </ul>
      </div>
    </div>
    <script>
      const { createApp } = Vue
      const app = createApp({
        data() {
          return {
            lis: ['商品介绍', '规格与包装', '售后保障', '商品评价(10万+)', '手机社区'],
            clickedIndex: 0,
          }
        },
      })
      app.mount('#app')
    </script>
```

