# 组合式API

从整体上划分, Vue分为如下几个核心模块

- 编译器. 
- 渲染器.
- 响应式系统. 

将模块里的每个功能解耦成一个一个函数

每个函数实现特定的功能, 这些函数可以任意组合使用, 就叫做`组合式API`

## setup函数

setup函数是 组合式 API 的入口

返回普通对象, vue会将这个对象的属性代理到组件实例对象上, 而模板中可以访问实例对象上的属性

```vue
<template>
  <div>{{ data.msg }}</div>
</template>
<script>
import { reactive } from 'vue'
export default {
  // setup函数是 组合式 API 的入口
  setup() {
    // 定义响应式数据
    // 需要先导入reactive函数
    const data = reactive({
      msg: 'hello',
    })

    // setup返回的是普通对象, vue会将这个对象的属性代理到组件实例对象上, 而模板中可以访问实例对象上的属性
    return {
      // ES6对象的属性的简洁表示法
      data,
    }
  },
}
</script>
```

## setup语法糖

### 概念

使用`<script setup>`, `<script setup>` 中的顶层的导入、声明的变量和函数可在同一组件的模板中直接使用。

1. 在setup中定义的变量, 可以在模板中直接使用

2. 在setup中定义的函数, 可以在模板中直接使用

3. 在setup中导入的组件, 可以在模板中直接使用

```vue
<template>
  <div>{{ pObj.msg }}</div>
</template>
<script setup>
// 1. 在setup中定义的变量, 可以在模板中直接使用
// 2. 在setup中定义的函数, 可以在模板中直接使用
// 3. 在setup中导入的组件, 可以在模板中直接使用

import { reactive } from 'vue'
// 定义普通对象
const obj = {
  msg: 'hello',
}
// 定义响应式数据
const pObj = reactive(obj)
</script>
```

### 示例

#### 点击加一

reactive函数用于将一个普通对象, 转换成 响应式 对象。参数是一个普通对象obj, 返回值是响应式对象proxy。相当于选项式的data选项。

在setup中定义的函数, 相当于选项式的methods选项。可以使用函数声明, 也可以使用函数表达式。

```vue
<template>
  <div>
    <button @click="increment">点我计数加一: {{ data.count }}</button>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
// 相当于选项式的data选项
const data = reactive({
  count: 0,
})
// 相当于选项式的methods选项
function increment() {
  data.count++
}
// 函数表达式: 将箭头函数赋值给一个变量
// const increment = () => data.count++
</script>
```

#### 加法器

ref函数可以接受任意类型的参数, 返回一个将参数包裹在内的响应式ref对象, 此对象只有一个指向其内部值的属性 `.value`

- 在模板中使用 ref 时，**不**需要附加 `.value`
- 在js中需要通过`.value`来访问內部值属性

相当于选项式的data选项

```vue
<template>
  <div>
    <!-- ref类型的变量, 在模板中不需要用过.value来操作 -->
    <input type="text" v-model.number="first" />
    +
    <input type="text" v-model.number="second" />
    <button @click="handleAdd">=</button>
    <input type="text" v-model.number="result" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
// ref函数可以接受任意类型的参数, 返回一个响应式ref对象
const first = ref(0)
const second = ref(0)
const result = ref(0)
const handleAdd = () => {
  // ref类型的变量, 在js中需要通过.value来操作
  result.value = first.value + second.value
}
</script>
```

#### 拼接姓和名

`computed`函数相当于选项式的computed选项

computed函数接受一个getter函数作为参数, 回调函数的返回值就是计算属性的值

```vue
<template>
  <div>
    姓: <input type="text" v-model="surname" /> <br />
    名: <input type="text" v-model="name" /><br />
    全名: {{ fullname }}
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

// ref相当于data选项
const surname = ref('')
const name = ref('')

// computed相当于computed选项
// computed函数接受一个getter函数作为参数, 回调函数的返回值就是计算属性的值
const fullname = computed(() => surname.value + name.value)
</script>
```

## 响应式的基本原理

### 响应式概念

当数据改变时, 引用数据的函数会**自动**重新执行

首先, 明确一个概念: **响应式是一个过程**, 这个过程存在两个参与者: 一方触发, 另一方响应

比如说, 我们家小胖有时候不乖, 我会打他, 他会哭. 这里我就是触发者, 小胖就是响应者

同样, 所谓数据响应式的两个参与者

- **触发者**: 数据
- **响应者**: 引用数据的函数

当数据改变时, 引用数据的函数**响应**数据的改变, 重新执行

### 手动完成响应过程

#### 单属性情况

```js
      // 响应式: 当数据改变时, 会执行回调函数
      // bucket: 副作用函数 桶
      const bucket = []
      let activeEffect = null
      function reactive(obj) {
        return new Proxy(obj, {
          get(target, key) {
            // 收集依赖
            if (activeEffect) bucket.push(activeEffect)
            return target[key]
          },
          set(target, key, value) {
            target[key] = value
            // 执行依赖
            bucket.forEach(fn => fn())
          },
        })
      }
      // 注册副作用函数
      function effect(fn) {
        activeEffect = fn
        fn()
        activeEffect = null
      }
      const pObj = reactive({
        msg: 'hello',
      })
      // 副作用函数: 直接访问作用域外部资源的函数
      // 每次执行函数的结果都是不确定的, 由外部的变量决定
      // 在这里, 我们可以理解成, 引用了响应式对象属性的函数
      function e1() {
        // 访问了 pObj.msg =>触发proxy的get操作, 在注册副作用函数时收集依赖
        console.log(pObj.msg)
      }
      effect(e1)

      setTimeout(() => {
        // 设置pObj.msg => 触发proxy的set操作, 执行依赖
        pObj.msg = 'world'
      }, 1000)
```

#### 副作用函数

> 如果一个函数引用了外部的资源, 这个函数会受到外部资源改变的影响
>
> 我们就说这个函数存在副作用. 因此, 也把该函数叫做`副作用`函数
>
> 这里, 大家不要被这个陌生的名字吓唬住
>
> 所谓`副作用函数`就是**引用了数据的函数**或者说**数据关联的函数**

副作用函数: 直接访问作用域外部资源的函数, 每次执行函数的结果都是不确定的, 由外部的变量决定。

在这里, 我们可以理解成, 引用了响应式对象属性的函数

#### 多属性情况

```js
      const bucket = {} // 属性名: []
      let activeEffect = null

      function reactive(obj) {
        return new Proxy(obj, {
          get(target, key) {
            // 收集依赖 track函数
            if (activeEffect) {
              if (!bucket[key]) {
                bucket[key] = []
              }
              bucket[key].push(activeEffect)
            }
            return target[key]
          },
          set(target, key, value) {
            target[key] = value
            // 执行依赖 Trigger函数
            if (bucket[key]) {
              bucket[key].forEach(fn => fn())
            }
          },
        })
      }

      // 注册副作用函数
      function effect(fn) {
        activeEffect = fn
        fn()
        activeEffect = null
      }

      const pObj = reactive({
        msg: 'hello',
        name: 'xiaoming',
      })

      function e1() {
        // 访问了 pObj.msg => 触发proxy的get操作, 在注册副作用函数时收集依赖
        console.log(pObj.msg)
      }
      // 注册副作用函数
      effect(e1)
      function render() {
        document.querySelector('#app').innerHTML = pObj.msg
      }
      effect(render)

      function e2() {
        console.log(pObj.name)
      }
      effect(e2)

      setTimeout(() => {
        pObj.msg = 'world'
      }, 1000)
```

## reactive函数

### 概念

- 作用: 将一个普通对象, 转换成 响应式 对象
- 参数: 普通对象
- 返回值: 响应式对象 Proxy

> **如何理解响应式对象**
>
> 如果一个对象的get和set过程被拦截, 并且经过自定义后与某个副作用函数建立了依赖关系. 
>
> 这样的对象就被认为是具有响应式特性的. 即: 当数据改变时, 所依赖的函数会自动重新执行

Vue 能够拦截对响应式对象所有属性的访问和修改，以便进行依赖追踪和触发更新。

### 实现简易版reactive

```vue
<template>
  <div id="test">{{ pObj.msg }}</div>
</template>
<script setup>
// 实现 简易版的reactive
// 作用: 将一个普通对象, 转换成 响应式 对象
// 参数: 普通对象
// 返回值: 响应式对象 Proxy
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      document.querySelector('#test').innerHTML = value
      return true
    },
  })
}
const obj = {
  msg: 'hello',
}
const pObj = reactive(obj)

setTimeout(() => (pObj.msg = 'world'), 1000)
</script>
```

## ref函数

### 概念

`ref()` 接收任意类型参数，并将其包裹在一个带有 `.value` 属性的 ref 对象中返回。`.value`属性指向其内部值

- 在模板中使用 ref 时，**不**需要附加 `.value`
- 在js中需要通过`.value`来访问內部值属性

#### 详细信息

ref 对象是可更改的，也就是说你可以为 .value 赋予新的值。它也是响应式的，即所有对 .value 的操作都将被追踪，并且写操作会触发与之相关的副作用。

如果将一个对象赋值给 ref，那么这个对象将通过 reactive() 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包。

若要避免这种深层次的转换，请使用 shallowRef() 来替代。

#### 为什么要使用 ref？

你可能会好奇：为什么我们需要使用带有 `.value` 的 ref，而不是普通的变量？为了解释这一点，我们需要简单地讨论一下 Vue 的响应式系统是如何工作的。

当你在模板中使用了一个 ref，然后改变了这个 ref 的值时，Vue 会自动检测到这个变化，并且相应地更新 DOM。这是通过一个基于依赖追踪的响应式系统实现的。当一个组件首次渲染时，Vue 会**追踪**在渲染过程中使用的每一个 ref。然后，当一个 ref 被修改时，它会**触发**追踪它的组件的一次重新渲染。

在标准的 JavaScript 中，检测普通变量的访问或修改是行不通的。然而，我们可以通过 getter 和 setter 方法来拦截对象属性的 get 和 set 操作。

该 `.value` 属性给予了 Vue 一个机会来检测 ref 何时被访问或修改。在其内部，Vue 在它的 getter 中执行追踪，在它的 setter 中执行触发。从概念上讲，你可以将 ref 看作是一个像这样的对象：

```js
// 伪代码，不是真正的实现
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

另一个 ref 的好处是，与普通变量不同，你可以将 ref 传递给函数，同时保留对最新值和响应式连接的访问。当将复杂的逻辑重构为可重用的代码时，这将非常有用。

### 实现简易版的ref

```vue
<template>
  <div id="test">{{ count }}</div>
</template>
<script setup>
let activeEffect = null

// 实现 简易版的ref
class RefImpl {
  constructor(value) {
    this._value = value
  }
  dep = [] // 保存当前属性的依赖函数
  __v_isRef = true
  __v_isShallow = false
  get value() {
    // 访问value属性, 会执行这里的get函数
    // 在get中, 收集依赖
    if (activeEffect) {
      // debugger
      this.dep.push(activeEffect)
    }
    return this._value
  }
  set value(newVal) {
    // 设置value属性, 会执行这里的set函数
    if (newVal !== this._value) {
      this._value = newVal
      // debugger
      // 执行依赖
      this.dep.forEach(fn => fn())
    }
  }
}
function ref(value) {
  return new RefImpl(value)
}
const count = ref(0)

function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}

effect(() => {
  console.log(count.value)
})

setTimeout(() => {
  count.value = 10
}, 1000)

// 为什么ref类型的响应式对象要通过.value操作
// 因为 在访问.value时触发依赖收集; 在设置.value时触发依赖更新
</script>
```

- 为什么ref类型的响应式对象要通过.value操作
- 因为 在访问.value时触发依赖收集; 在设置.value时触发依赖更新

## computed函数

### 概念

接受一个 getter 函数，返回一个只读的响应式 ref 对象。该 ref 通过 .value 暴露 getter 函数的返回值。它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。

### 基本使用

- 作用: 创建一个响应式对象
- 参数: 函数/对象(使用函数的返回值作为属性值, 对象的getter函数返回值作为属性值)

Vue 的计算属性会自动追踪响应式依赖。它会检测到 `test` 依赖于 `count`，所以当 `count` 改变时，任何依赖于 `test` 的绑定都会同时更新。

```vue
<template>
  <div>{{ test }}</div>
</template>

<script setup>
// 计算属性
import { ref, computed } from 'vue'
const count = ref(0)
// computed对象 => 依赖于count
// 当count发生变化时, 引用了count的副作用函数(传给computed作为参数的函数)会自动执行
// 接下来, 渲染函数会自动重新执行, 因为渲染函数依赖doubleCount
const doubleCount = computed(() => count.value * 2)

// 作用: 创建一个响应式对象
// 参数: 函数/对象(使用函数的返回值作为属性值, 对象的getter函数返回值作为属性值)

// 基于函数的方式创建的计算属性是只读的
console.log(doubleCount)

const test = computed({
  // 计算属性.value的访问器
  get() {
    console.log('计算属性的get操作')
    return count.value * 2
  },
  // 计算属性.value的设置器
  set(newVal) {
    console.log('计算属性的set操作')
    count.value = newVal / 2
  },
})
console.log(test.value)
setTimeout(() => {
  test.value = 200
}, 1000)
</script>
```

在本示例中, 渲染函数依赖于test计算属性, 所以当count改变时, test改变, 渲染结果改变

- test依赖于:count
- test被依赖:渲染函数

`computed()`基于函数的方式创建的计算属性是只读的, 它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象

## watch函数

### 概念

侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

#### 详细信息

`watch()` 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。

第一个参数是侦听器的**源**。这个来源可以是以下几种：

- 一个函数，返回一个值
- 一个 ref
- 一个响应式对象
- ...或是由以上类型的值组成的数组

第二个参数是在发生变化时要调用的回调函数。这个回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的异步请求。

当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值。

第三个可选的参数是一个对象，支持以下这些选项：

- **`immediate`**：在侦听器创建时立即触发回调。第一次调用时旧值是 `undefined`。
- **`deep`**：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考[深层侦听器](https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers)。
- **`flush`**：调整回调函数的刷新时机。参考[回调的刷新时机](https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)及 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)。
- **`onTrack / onTrigger`**：调试侦听器的依赖。参考[调试侦听器](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#watcher-debugging)。
- **`once`**：回调函数只会运行一次。侦听器将在回调函数首次运行后自动停止。 

与 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 相比，`watch()` 使我们可以：

- 懒执行副作用；
- 更加明确是应该由哪个状态触发侦听器重新执行；
- 可以访问所侦听状态的前一个值和当前值。

### 基本使用

#### 语法

1. 参数: 
   1. 侦听的数据源: 
      1. 可以是引用了响应式对象的副作用函数
      2. 响应式对象(ref, reactive, computed)
      3. 以上类型组成的数组
   2. 对应的回调: 当数据改变时, 执行的回调函数
   3. 选项:
      1. immediate: 创建时立即执行回调
      2. deep: 当数据是对象, 开启深度侦听
      3. flush: 设置回调执行的时机
2. 作用: 侦听数据源的改变, 当数据源改变时, 重新执行回调
3. 返回: unwatch方法

```vue
<template>
  <div></div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
const count = ref(0)
const doubleCount = computed(() => count.value * 2)
const stu = reactive({
  name: 'xiaoming',
  age: 20,
  gf: {
    name: 'xiaomei',
    age: 18,
    city: {
      name: 'beijing',
    },
  },
})
// watch(数据源, 回调函数, 选项)

// 1. 数据源: 可以是ref对象, 也可以是reactive对象、computed对象, 或者getter函数
watch(count, () => console.log('count改变了'))

// 2. watch对象时, 默认是深层次的侦听
watch(stu, () => console.log('stu改变了'))

// 3. 不能直接watch属性, 需要通过一个副作用函数/getter函数来访问属性
watch(
  () => stu.name,
  () => console.log('stu.name改变了')
)

setTimeout(() => {
  ;(count.value = 10), (stu.name = 'xiaozhang'), (stu.gf.name = 'xiaoli')
}, 1000)
</script>
```

#### 注意

1. 当数据源是对象时, 默认是深层次的侦听
2. 不能直接侦听对象的属性, 需要通过getter函数来访问对象的属性
   1. 如果侦听的属性是一个对象, 只有当对象被替换时, 才触发回调
   2. 当改变stu.gf.name, 不会触发回调. 需要加deep: true
   3. 即若侦听的属性是对象, 默认是浅层次侦听