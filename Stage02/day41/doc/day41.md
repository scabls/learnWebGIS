# 组件深入

## 依赖注入

### 意义

**依赖注入主要为了解决两个问题**

1. 祖孙组件之间的传值
2. 向后代组件提供全局变量

### provide(提供)

要为组件后代提供数据，需要使用到 provide() 函数：

```VUE
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```

`provide()` 函数接收两个参数。第一个参数被称为**注入名**，可以是一个字符串或是一个 `Symbol`。后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。

第二个参数是提供的值，值可以是任意类型，包括响应式的状态，比如一个 ref：

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

提供的响应式状态使后代组件可以由此和提供者建立响应式的联系。

如果需要一次性提供多个值,可以将这些值作为一个对象的属性或方法,提供这个对象

### 应用层 Provide

除了在一个组件中提供依赖，我们还可以在整个应用层面提供依赖：

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

在应用级别提供的数据在该应用内的所有组件中都可以注入。这在你编写插件时会特别有用，因为插件一般都不会使用组件形式来提供值。

### inject(注入)

要注入上层组件提供的数据，需使用 `inject()`函数：

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

如果提供的值是一个 ref，注入进来的会是该 ref 对象，而**不会**自动解包为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接。

#### 注入默认值

默认情况下，`inject` 假设传入的注入名会被某个祖先链上的组件提供。如果该注入名的确没有任何组件提供，则会抛出一个运行时警告。

如果在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值，和 props 类似：

```js
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```

在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：

```js
const value = inject('key', () => new ExpensiveClass(), true)
```

第三个参数表示默认值应该被当作一个工厂函数。

#### 参数说明

第一个参数是注入的 key。Vue 会遍历父组件链，通过匹配 key 来确定所提供的值。如果父组件链上多个组件对同一个 key 提供了值，那么离得更近的组件将会“覆盖”链上更远的组件所提供的值。如果没有能通过 key 匹配到值，`inject()` 将返回 `undefined`，除非提供了一个默认值。

第二个参数是可选的，即在没有匹配到 key 时使用的默认值。

第二个参数也可以是一个工厂函数，用来返回某些创建起来比较复杂的值。在这种情况下，你必须将 `true` 作为第三个参数传入，表明这个函数将作为工厂函数使用，而非值本身。

## 组件实例

### 在父组件中获取子组件

#### ref内置属性

通过`ref`内置属性获取组件实例/DOM对象

> 用于注册元素或子组件的引用

使用组合式 API，引用将存储在与名字匹配的 ref 里：

```vue
<template>
  <h1 ref="h1">h1</h1>
  <RefTest ref="refTest" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RefTest from './components/RefTest.vue'
// 固定写法ref(null), 而且变量的名字要跟ref的属性名一致
const h1 = ref(null)
const refTest = ref(null)
onMounted(() => {
  console.log(h1)
  console.log(refTest)
})
</script>
```

关于 ref 注册时机的重要说明：因为 ref 本身是作为渲染函数的结果来创建的，必须等待组件挂载后才能对它进行访问。

### 获取子组件的属性和方法

使用 `<script setup>` 的组件是**默认关闭**的，**不会**暴露任何在 `<script setup>` 中声明的绑定。

可以通过 `defineExpose` 编译器宏来显式指定在 `<script setup>` 组件中要暴露出去的属性

> 使用了 `<script setup>` 的组件是**默认私有**的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露：

```vue
<template>
  <div>子组件</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const count = ref(0)
const increment = () => {
  count.value++
}

// 默认情况下, 在setup中, 属性是隔离的, 外部实例不能直接访问
// 可以通过 defineExpose 编译器宏来显式指定在 <script setup> 组件中要暴露出去的属性
defineExpose({
  count,
  increment,
})
</script>
```

注意:应该只在绝对需要时才在使用组件引用时暴露属性。大多数情况下，你应该首先使用标准的 props 和 emit 接口来实现父子组件交互。

### 在子组件中获取当前实例

```vue
<template>
  <div>子组件</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const count = ref(0)
const increment = () => {
  count.value++
}

// 在子组件中获取当前实例
const instance = getCurrentInstance() // 类似于vue2(选项式API)中的this
console.log(instance)

</script>
```

## 内置组件

### Transition

为**单个**元素或组件提供动画过渡效果。

`<Transition>` 是一个内置组件，这意味着它在任意别的组件中都可以被使用，无需注册。它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。进入或离开可以由以下的条件之一触发：

- 由 `v-if` 所触发的切换
- 由 `v-show` 所触发的切换
- 由特殊元素 `<component>` 切换的动态组件
- 改变特殊的 `key` 属性

> `<Transition>` 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。

#### 基于 CSS 的过渡效果

一共有 6 个应用于进入与离开过渡效果的 CSS class。

<img src="day41.assets/transition-classes.DYG5-69l.png" alt="过渡图示" style="zoom:50%;" />

#### 单个元素作为内容

```vue
<template>
  <button @click="show = !show">Toggle</button>
  <!-- Transition内置组件, 放在v-if/v-show(显示/隐藏)的元素外面 -->
  <Transition>
    <p v-if="show">hello</p>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<style scoped>
/* 进入阶段/离开阶段的整个过程, 持续1s */
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}
/* 进入阶段的开始状态/离开阶段的结束状态 */
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

#### 单个组件作为内容

```vue
<template>
  <TransitionTest />
  <br />
  <button @click="show = !show">Toggle</button>
  <Transition>
    <RefTest v-if="show" />
  </Transition>
</template>
```

这个组件必须仅有一个根元素

#### 为过渡效果命名

我们可以给 `<Transition>` 组件传一个 `name` prop 来声明一个过渡效果名：

```vue
<Transition name="fade">
  ...
</Transition>
```

对于一个有名字的过渡效果，对它起作用的过渡 class 会以其名字而不是 `v` 作为前缀。比如，上方例子中被应用的 class 将会是 `fade-enter-active` 而不是 `v-enter-active`。这个“fade”过渡的 class 应该是这样：

```css
/* .v表示绑定未具名的Transition */
/* 具名的Transition要将v换成name */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### Teleport

它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去

> 将其插槽内容渲染到 DOM 中的另一个位置。

`<Teleport>`让我们不需要再顾虑 DOM 结构的问题。让我们用 `<Teleport>` 改写一下 `<MyModal>`：

```vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

`<Teleport>` 接收一个 `to` prop 来指定传送的目标。`to` 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue“把以下模板片段**传送到 `body`** 标签下”。

> `<Teleport>` 挂载时，传送的 `to` 目标必须已经存在于 DOM 中。理想情况下，这应该是整个 Vue 应用 DOM 树外部的一个元素。如果目标元素也是由 Vue 渲染的，你需要确保在挂载 `<Teleport>` 之前先挂载该元素。

#### 搭配组件使用

`<Teleport>` 只改变了渲染的 DOM 结构，它不会影响组件间的逻辑关系。也就是说，如果 `<Teleport>` 包含了一个组件，那么该组件始终和这个使用了 `<Teleport>` 的组件保持逻辑上的父子关系。传入的 props 和触发的事件也会照常工作。

这也意味着来自父组件的注入也会按预期工作，子组件将在 Vue Devtools 中嵌套在父级组件下面，而不是放在实际内容移动到的地方。

### Suspense

`<Suspense>` 是一个内置组件，用于协调对组件树中嵌套的异步依赖的处理。

用法: 包裹`异步组件`

1. 在setup()函数中, 使用了async 关键字
2. 在`<script setup>`语法糖中, 顶层使用了await关键字

#### 使用

**子组件**

```vue
<template>
  {{ res.name }}
</template>

<script setup>
function fetchUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: 'xiaoming', age: 18 })
    }, 1000)
  })
}
// 在setup的顶层, 写await. Vue会自动编译成 async setup()
const res = await fetchUser()
console.log(res)
</script>
```

**父组件**

```vue
<template>
  <Suspense>
    <SuspenseTest />
    <template #fallback> loading... </template>
  </Suspense>
</template>
```

##### 详细信息

`<Suspense>` 接受两个插槽：#default 和 #fallback。它将在内存中渲染默认插槽的同时展示后备插槽内容。

如果在渲染时遇到异步依赖项 (异步组件和具有 async setup() 的组件)，它将等到所有异步依赖项解析完成时再显示默认插槽。

> 当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容。

即上方示例中`<SuspenseTest />`插入了默认插槽, 这也是为什么会先显示loading, 再显示res.name

#### 加载中状态

`<Suspense>` 组件有两个插槽：`#default` 和 `#fallback`。两个插槽都只允许**一个**直接子节点。在可能的时候都将显示默认槽中的节点。否则将显示后备槽中的节点。

```vue
<Suspense>
  <!-- 具有深层异步依赖的组件 -->
  <Dashboard />

  <!-- 在 #fallback 插槽中显示 “正在加载中” -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

在初始渲染时，`<Suspense>` 将在内存中渲染其默认的插槽内容。如果在这个过程中遇到任何异步依赖，则会进入**挂起**状态。在挂起状态期间，展示的是后备内容。当所有遇到的异步依赖都完成后，`<Suspense>` 会进入**完成**状态，并将展示出默认插槽的内容。

如果在初次渲染时没有遇到异步依赖，`<Suspense>` 会直接进入完成状态。

进入完成状态后，只有当默认插槽的根节点被替换时，`<Suspense>` 才会回到挂起状态。组件树中新的更深层次的异步依赖**不会**造成 `<Suspense>` 回退到挂起状态。

发生回退时，后备内容不会立即展示出来。相反，`<Suspense>` 在等待新内容和异步依赖完成时，会展示之前 `#default` 插槽的内容。这个行为可以通过一个 `timeout` prop 进行配置：在等待渲染新内容耗时超过 `timeout` 之后，`<Suspense>` 将会切换为展示后备内容。若 `timeout` 值为 `0` 将导致在替换默认内容时立即显示后备内容。

## Hooks函数

### 什么是hooks

hooks本质上还是一种函数, 将多个Composition API封装, 实现某个特定功能

### hooks的作用

- 解耦
- 复用

#### 示例

将特定功能封装到一个单独的文件`usePoint.js`,放在src下的hooks文件夹

```js
import { ref, onMounted, onUnmounted } from 'vue'

export default function usePoint() {
  const point = ref({ x: 0, y: 0 })

  function handleClick(event) {
    point.value.x = event.clientX
    point.value.y = event.clientY
    console.log(point.value)
  }
  onMounted(() => {
    window.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    window.removeEventListener('click', handleClick)
  })
  return point
}
```

在需要时引入`hooks函数`

```vue
<template>
  <Suspense>
    <SuspenseTest />
    <template #fallback>
      <div>loading...</div>
    </template>
  </Suspense>
  <p>x的坐标: {{ point.x }}--y的坐标: {{ point.y }}</p>
</template>

<script setup>
import SuspenseTest from './components/SuspenseTest.vue'

import usePoint from './hooks/usePoint.js'
const point = usePoint()
</script>
```

## CSS功能

### 组件作用域 CSS

如果在`<style>`标签中, 没有加`scoped`属性, 那么该CSS样式是全局样式, 会污染其它组件。当 `<style>` 标签带有 `scoped` attribute 的时候，它的 CSS 只会影响当前组件的元素。

加scoped后, 会在当前组件渲染时, 设置一个自定义属性, 并且, CSS选择器上会携带属性选择器

#### 子组件的根元素

使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

#### 混合使用局部与全局样式

你也可以在同一个组件中同时包含作用域样式和非作用域样式：

```vue
<style>
/* 全局样式 */
</style>

<style scoped>
/* 局部样式 */
</style>
```

### CSS中的v-bind()

单文件组件的 `<style>` 标签支持使用 `v-bind` CSS 函数将 CSS 的值链接到动态的组件状态, 这个语法同样也适用于`<script setup>`，且支持 JavaScript 表达式 (需要用引号包裹起来)：

```vue
<script setup>
import { ref } from 'vue'
const theme = ref({
    color: 'red',
})
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

实际的值会被编译成哈希化的 CSS 自定义属性，因此 CSS 本身仍然是静态的。自定义属性会通过内联样式的方式应用到组件的根元素上，并且在源值变更的时候响应式地更新。