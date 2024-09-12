# 组合式API

## ref函数

### 响应性丢失问题

将`reactive`定义的代理对象**赋值**给其它变量时, 会出现**响应性丢失问题**

赋值主要有如下三种情况:

1. 如果将`reactive`定义的代理对象的属性**赋值**给新的变量, 新变量会失去响应性
2. 如果对`reactive`定义的代理对象进行**展开操作**. **展开后**的变量会失去响应性
3. 如果对`reactive`定义的代理对象进行**解构操作**. **解构后**的变量会失去响应性

```js
const obj = reactive({
  foo: 'aaa',
  bar: 'bbb',
})
console.log('reactive定义的对象:', obj)
{
  // 赋值操作为丢失响应性
  const foo = obj.foo
  console.log('被赋值obj.foo的变量foo: ', foo)
  // 解构赋值会丢失响应性
  const { bar } = obj
  console.log('解构bar属性赋值给变量bar: ', bar)
  // 展开运算符会丢失响应性
  const newObj = { ...obj }
  console.log('接收展开obj的newObj: ', newObj)
}
```

### toRef与toRefs

为了解决在赋值过程中响应丢失问题, Vue3提供了两个API

- `toRef`: 解决赋值时响应丢失问题
- `toRefs`: 解决展开、解构时响应丢失问题

#### toRef函数

可以将值、refs 或 getters 规范化为 refs (3.3+)。

也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

```js
{
  // toRef会保留属性的响应性, 取代赋值操作
  const foo = toRef(obj, 'foo')
  console.log('toRef获取的obj的foo属性: ', foo)
}
```

请注意，这不同于

```js
const foo = ref(obj.foo)
```

上面这个 ref_foo **不会**和 `obj.foo` 保持同步，因为这个 `ref()` 接收到的是一个纯数值。

综上: toRef会保留属性的响应性, 取代赋值操作

#### toRefs函数

将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的。

```js
{
  // 对一个响应式对象解构, 使用toRefs保留属性的响应性
  // toRefs会保留属性的响应性, 取代解构赋值
  const newObj = toRefs(obj)
  const { foo, bar } = toRefs(obj)
  console.log('对obj使用toRefs处理后: ', newObj)
  console.log('对obj使用toRefs处理后得到对象的foo属性: ', foo)
  console.log('对obj使用toRefs处理后得到对象的bar属性: ', bar)
}
```

当从组合式函数中返回响应式对象时，`toRefs` 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // ...基于状态的操作逻辑

  // 在返回时都转为 ref
  return toRefs(state)
}

// 可以解构而不会失去响应性
const { foo, bar } = useFeatureX()
```

综上: 一个响应式对象解构, 使用toRefs保留属性的响应性; toRefs会保留属性的响应性, 取代解构赋值

## watch函数

### watchEffect函数

#### 概念

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

```js
watchEffect(() => {
  // 默认执行回调函数, 自动地收集依赖, 触发getter操作, 被依赖追踪
  fullname.value = `${surname.value}${name.value}`
})
```

> 收集依赖, 可以认为是, 副作用函数访问对象的属性时, 触发了对象的getter操作, 在getter操作中被依赖的属性追踪
>
> 执行依赖, 其实是, 属性变化时, 将它作为依赖的副作用函数, 即被属性追踪的副作用函数都重新执行

#### watch VS watchEffect

1. watch需要明确指定要侦听的数据源; watchEffect不需要明确指定侦听的数据源, 自动地收集依赖

2. watch的回调函数默认是不执行的, watchEffect的回调函数是默认执行的
3. watch可以拿到新旧值, watchEffect不行

# 组件深入

## Props

### 声明prop

#### defineProps

`defineProps` 和 `defineEmits` 都是只能在 `<script setup>` 中使用的**编译器宏**。

它们不需要导入，且会随着 `<script setup>` 的处理过程一同被编译掉

defineProps声明的 prop 会自动暴露给模板。`defineProps` 会返回一个对象，其中包含了可以传递给组件的所有 prop

`defineProps`有两种语法

- 接受数组作为参数
- 接受对象作为参数(推荐)

##### 数组作为参数

```js
const props = defineProps(['title'])
```

每个元素都是字符串,声明一个prop, 字符串的值就是prop的属性名

##### 对象作为参数

```js
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  isPublished: Boolean,
  commentIds: {
    type: Array,
    default: () => [],
  },
  author: {
    type: Object,
    default: () => ({}),
  },
})
```

对象的每个属性声明一个prop,

- 属性名就是prop的属性名。
- 属性值可以是表示js数据类型的值或数组, 也可以是一个对象; 
  - type属性定义prop的数据类型,可以是一个值或者包含多个值的数组
  - required属性定义是否必需传递
  - default属性定义未传值时的默认值
    - 对于数组和对象这种引用类型, default属性值必须是一个返回数组或对象的工厂函数

### 传递prop

在组件的引用标签上, 可以将prop作为标签上的自定义属性, 自定义属性值就是被传给prop的值

```html
<BlogPost title="hello world" />
```

上方示例了传递静态值, 也可以使用v-bind指令,动态地传递父组件中的状态

```html
  <BlogPost
    title="hello vue"
    :likes="100"
    isPublished
    :commentIds="[1, 2, 3]"
    :author="{ name: 'John Doe', email: 'john.doe@example.com' }"
  />
```

当prop过多时,我们可以使用一个对象绑定多个prop:

将所有要传递prop放进一个对象,prop名作为属性名,要传递的值作为对应的属性值。使用没有参数的v-bind指令或者其简写,指令值就是刚才定义的对象。这样对象的每个属性就会被作为一个prop传入

```vue
<template>
  <BlogPost title="hello world" />
  <BlogPost
    title="hello vue"
    :likes="100"
    isPublished
    :commentIds="[1, 2, 3]"
    :author="{ name: 'John Doe', email: 'john.doe@example.com' }"
  />
  <BlogPost v-bind="post1" />
  <BlogPost :="post2" />
</template>
<script setup>
// 在setup中导入的组件对象, 可以在模板中直接使用
import BlogPost from './components/BlogPost.vue'
import { ref } from 'vue'
const post1 = ref({
  title: 'v-bind不带参数,值为对象,用于动态绑定多个值',
  likes: 1000,
  isPublished: true,
  commentIds: [1, 2, 3, 4],
  author: { name: 'Yulia', email: 'yulia@example.com' },
})
const post2 = ref({
  title: 'hello v-bind指令的简写`:`',
  likes: 1000,
  isPublished: true,
  commentIds: [1, 2, 3, 4],
  author: { name: 'Yulia', email: 'yulia@example.com' },
})
</script>
```

### 访问prop

在模板中, 直接使用title访问

```vue
<template>
  <!-- 在模板中, 直接使用title访问 -->
  <h1>{{ title }}</h1>
</template>
```

在js中通过props.title访问属性

```vue
<script>
const props = defineProps(['title'])
.....
// 在js中通过props.title访问属性
console.log(props.title)
</script>
```

### 单向数据流

#### 概念

父组件可以改变子组件的`props`, 反之'不行'(不推荐)

#### 一般结论

1. 如果`props`是一个值类型数据, 那么在子组件中不能修改. 该属性是`readonly`(只读)的
2. 如果`props`是一个引用类型数据, 那么在子组件中可以修改, 但是**不推荐!!**

```js
传入的prop是只读的, 不能在子组件直接修改
props.title = 'hahaha' // 无法修改, vue发出警告
对于对象或数组这种引用类型数据, 作为prop传入时, 可以修改內部值, 但不建议
props.author.name = 'Titus'
```

#### 本地ref同步

可以在组件内部创建一个本地的 `ref` 来管理这个值，并手动将 `modelValue` 同步到这个 `ref`。

这样就可以修改这个本地ref。还可以通过侦听和自定义事件间接修改prop并再同步到本地ref

## Emit

我们会发现有时候子组件需要与父组件进行交互。

组件实例提供了一个自定义事件系统。父组件可以通过 `v-on` 或 `@` 来选择性地监听子组件上抛的事件，就像监听原生 DOM 事件那样。

子组件上抛的事件需要`defineEmits`宏来声明

### 声明事件

和 `defineProps` 类似，`defineEmits` 仅可用于 `<script setup>` 之中，并且不需要导入。

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

参数是一个数组, 每个元素都是字符串,声明一个事件, 字符串的值就是事件名

### 抛出(触发)事件与监听事件

`defineEmits` 返回一个等同于 `$emit` 方法的 `emit` 函数。它可以被用于在组件的 `<script setup>` 中抛出事件，因为此处无法直接访问 `$emit`：

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

在模板(`<template>`)中则是可以使用`$emit` 方法抛出(触发)事件

```vue
<template>
    <!-- MyComponent -->
    <button @click="$emit('someEvent')">Click Me</button>
</template>
```

父组件可以通过在组件引用标签上使用 `v-on` (缩写为 `@`) 来监听事件：

```vue
<MyComponent @some-event="callback" />
```

同样，组件的事件监听器也支持 `.once` 修饰符：

```vue
<MyComponent @some-event.once="callback" />
```

像组件与 prop 一样，事件的名字也提供了自动的格式转换。注意这里我们触发了一个以 camelCase 形式命名的事件，但在父组件中可以使用 kebab-case 形式来监听。与 prop 大小写格式一样，在模板中我们也推荐使用 kebab-case 形式来编写监听器。

> 但是若使用构建工具的则无需在意,无需改成 kebab-case形式

### 事件参数

有时候我们会需要在触发事件时附带一个特定的值。举例来说，我们想要 `<BlogPost>` 组件来管理文本会缩放得多大。在这个场景下，我们可以给 `$emit` 提供一个额外的参数：

```vue
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

然后我们在父组件中监听事件，我们可以先简单写一个内联的箭头函数作为监听器，此函数会接收到事件附带的参数：

```vue
<MyButton @increase-by="(n) => count += n" />
```

或者，也可以用一个组件方法来作为事件处理函数：

```vue
<MyButton @increase-by="increaseCount" />
```

该方法也会接收到事件所传递的参数：

```js
function increaseCount(n) {
  count.value += n
}
```

> 所有传入 `$emit()` 的额外参数都会被直接传向监听器。举例来说，`$emit('foo', 1, 2, 3)` 触发后，监听器函数将会收到这三个参数值。

## 插槽

组件能够接收任意类型的 JavaScript 值作为 props，但组件要如何接收模板内容呢？在某些场景中，我们可能想要为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段。就要使用插槽

插槽最主要的作用是`提供扩展性`.

- 如果向组件传数据, 使用props
- 如果向组件传HTML结构, 使用slot插槽

### Vue 中的 slot

在 Vue 开发中, slot 主要应用在组件开发中, 通过在组件中预留 slot, 实现不同的功能

### 插槽内容与出口

- 插槽内容: 组件引用标签的innerHTML
- 插槽出口: slot标签

举例来说，这里有一个 `<FancyButton>` 组件，可以像这样使用：

```vue
<FancyButton>
  Click me! <!-- 插槽内容 -->
</FancyButton>
```

而 `<FancyButton>` 的模板是这样的：

```vue
<button class="fancy-btn">
  <slot></slot> <!-- 插槽出口 -->
</button>
```

`<slot>` 元素是一个**插槽出口** (slot outlet)，标示了父元素提供的**插槽内容** (slot content) 将在哪里被渲染。

最终渲染出的 DOM 是这样：

```vue
<button class="fancy-btn">Click me!</button>
```

slot也可以写成自闭合标签

```vue
 <slot />
```

### 渲染作用域

插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的。举例来说：

```vue
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

这里的两个 `{{ message }}` 插值表达式渲染的内容都是一样的。

插槽内容**无法访问**子组件的数据。Vue 模板中的表达式只能访问其定义时所处的作用域，这和 JavaScript 的词法作用域规则是一致的。换言之：

父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。

> 每个组件模板中只能访问当前组件的状态, 子组件不能直接获取父组件状态, 父组件不能直接获取子组件状态

#### 示例

子组件

```vue
<template>
  <div>
    <h3>每个组件模板中只能访问当前组件的状态</h3>
    <p>子组件不能直接获取父组件状态</p>
    <p>子组件中的isShow:{{ isShow }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isShow = ref(true)
</script>
```

父组件

```vue
<template>
  <div>
    <h3>每个组件模板中只能访问当前组件的状态</h3>
    <p>父组件不能直接获取子组件状态</p>
    <p>父组件的isShow:{{ isShow }}</p>
  </div>
</template>
<script setup>
import MyCom from './components/MyCom.vue'
import { ref } from 'vue'
const isShow = ref(false)
</script>
```

结果

```
父组件的isShow:false
子组件中的isShow:true
```

### 默认内容

在外部没有提供任何内容的情况下，可以为插槽指定默认内容。比如有这样一个 `<SubmitButton>` 组件：

```vue
<button type="submit">
  <slot></slot>
</button>
```

如果我们想在父组件没有提供任何插槽内容时在 `<button>` 内渲染“Submit”，只需要将“Submit”写在 `<slot>` 标签之间来作为默认内容：

```vue
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>
```

现在，当我们在父组件中使用 `<SubmitButton>` 且没有提供任何插槽内容时：

```vue
<SubmitButton />
```

“Submit”将会被作为默认内容渲染：

```vue
<button type="submit">Submit</button>
```

但如果我们提供了插槽内容：

```vue
<SubmitButton>Save</SubmitButton>
```

那么被显式提供的内容会取代默认内容：

```vue
<button type="submit">Save</button>
```

> slot标签的innerHTML就是默认内容

### 具名插槽

有时在一个组件中包含多个插槽出口是很有用的。举例来说，在一个 `<BaseLayout>` 组件中，有如下模板：

```vue
<div class="container">
  <header>
    <!-- 标题内容放这里 -->
  </header>
  <main>
    <!-- 主要内容放这里 -->
  </main>
  <footer>
    <!-- 底部内容放这里 -->
  </footer>
</div>
```

对于这种场景，`<slot>` 元素可以有一个特殊的 attribute `name`，用来给各个插槽分配唯一的 ID，以确定每一处要渲染的内容：

```vue
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

这类带 `name` 的插槽被称为具名插槽 (named slots)。没有提供 `name` 的 `<slot>` 出口会隐式地命名为“default”。

在父组件中使用 `<BaseLayout>` 时，我们需要一种方式将多个插槽内容传入到各自目标插槽的出口。此时就需要用到**具名插槽**了：

要为具名插槽传入内容，我们需要使用一个含 `v-slot` 指令的 `<template>` 元素，并将目标插槽的名字作为该指令的参数：

```vue
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

`v-slot` 有对应的简写 `#`，因此 `<template v-slot:header>` 可以简写为 `<template #header>`。其意思就是“将这部分模板片段传入子组件的 header 插槽中”。

#### 示例

下面我们给出完整的、向 `<BaseLayout>` 传递插槽内容的代码，指令均使用的是缩写形式：

```vue
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容。所以上面也可以写成：

```vue
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- 隐式的默认插槽 -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

现在 `<template>` 元素中的所有内容都将被传递到相应的插槽。最终渲染出的 HTML 如下

```vue
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

### 作用域插槽

在上面的渲染作用域中我们讨论到，插槽的内容无法访问到子组件的状态。

但是有时候需求:

- 在父模板中可定制子组件的内容
- 同时使用子组件中的数据

要做到这一点，我们需要一种方法来让子组件在渲染时将一部分数据提供给插槽。

实现: 可以像对组件传递 props 那样，向一个插槽的出口上传递 attributes：

```vue
<!-- <MyComponent> 的模板 -->
<!-- slot标签上的attributes相当于props -->
<!-- 将slot标签的attribute与组件状态绑定 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

当需要接收插槽 props 时，默认插槽和具名插槽的使用方式有一些小区别。

下面我们将先展示默认插槽如何接受 props，通过子组件标签上的 `v-slot` 指令，直接接收到了一个插槽 props 对象, 对象的属性就是slot标签上的属性:

```vue
<!-- 对象名是任取的 -->
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

子组件传入插槽的 props对象 作为了 `v-slot` 指令的值，可以在插槽内的表达式中访问。

> 对象名是任取的

类比对象, 我们也可以在 `v-slot` 中使用解构：

```vue
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent> 
```

> 1. 在子组件的插槽上, 定义自定义属性, 绑定子组件中的状态
>
> 2. 在父组件的模板中, 获取到插槽对象, 进而获取到属性

#### 具名作用域插槽

具名作用域插槽的工作方式也是类似的，插槽 props 可以作为 `v-slot` 指令的值被访问到：`v-slot:name="slotProps"`。当使用缩写时是这样：

```vue
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
```

向具名插槽中传入 props：

```vue
<slot name="header" message="hello"></slot>
```

注意插槽上的 `name` 是一个 Vue 特别保留的 attribute，不会作为 props 传递给插槽。因此最终 `headerProps` 的结果是 `{ message: 'hello' }`。

如果你同时使用了具名插槽与默认插槽，则需要为默认插槽使用显式的 `<template>` 标签。尝试直接为组件添加 `v-slot` 指令将导致编译错误。这是为了避免因默认插槽的 props 的作用域而困惑。举例：

```vue
<!-- <MyComponent> template -->
<div>
  <slot :message="hello"></slot>
  <slot name="footer" />
</div>
```

```vue
<!-- 该模板无法编译 -->
<MyComponent v-slot="{ message }">
  <p>{{ message }}</p>
  <template #footer>
    <!-- message 属于默认插槽，此处不可用 -->
    <p>{{ message }}</p>
  </template>
</MyComponent>
```

为默认插槽使用显式的 `<template>` 标签有助于更清晰地指出 `message` 属性在其他插槽中不可用：

```vue
<MyComponent>
  <!-- 使用显式的默认插槽 -->
  <template #default="{ message }">
    <p>{{ message }}</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</MyComponent>
```

注: v-slot的参数默认值是default, 可省略。但同时使用具名插槽与默认插槽时不推荐省略，特别是使用简写指令时。

## 属性透传

### 概念

“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器。最常见的例子就是 class、style 和 id。

这些属性会被attrs统一管理, 当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上

下面以样式透传为例(所谓样式透传, 不过是透传的属性是class或style)

### 样式透传

当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。举例来说，假如我们有一个 `<MyButton>` 组件，它的模板长这样：

```vue
<!-- <MyButton> 的模板 -->
<button>Click Me</button>
```

一个父组件使用了这个组件，并且传入了 `class`：

```vue
<MyButton class="large" />
```

最后渲染出的 DOM 结果是：

```vue
<button class="large">Click Me</button>
```

这里，`<MyButton>` 并没有将 `class` 声明为一个它所接受的 prop，所以 `class` 被视作透传 attribute，自动透传到了 `<MyButton>` 的根元素上。

#### 注意点

当只有一个根元素时, 透传过来的属性会添加到根元素上

在模板中, 透传的属性可以通过$attrs获取:{{ $attrs }}

### 事件透传

同样的规则也适用于 `v-on` 事件监听器：

```vue
<MyButton @click="onClick" />
```

`click` 监听器会被添加到 `<MyButton>` 的根元素，即那个原生的 `<button>` 元素之上。当原生的 `<button>` 被点击，会触发父组件的 `onClick` 方法。同样的，如果原生 `button` 元素自身也通过 `v-on` 绑定了一个事件监听器，则这个监听器和从父组件继承的监听器都会被触发。

> 组件引用标签上的事件监听也会透传到唯一的渲染根元素节点标签上

如果不希望继承事件监听器, 可以在子组件中通过`emit`消费掉

```js
const emit = defineEmits(['click'])
```

> 在子组件的emits中定义同名事件, 把透传的事件消费掉

1. 如果在子组件中, 通过defineEmits声明了事件. 该事件就被子组件消费掉(拦截). 此时当作`自定义事件`处理
2. 如果在子组件中没有声明, 此时, 该事件被透传, 当作`原生`事件处理

### 自定义透传

当attribute 需要应用在根节点以外的其他元素上,就需要禁用 attribute 继承

#### 禁用属性继承

如果你不想要一个组件自动地继承 attribute，你可以在组件选项中设置 inheritAttrs: false。

从 3.3 开始你也可以直接在 `<script setup>` 中使用 defineOptions：

```vue
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>
```

#### 使用透传属性

这些透传进来的 attribute 可以在模板的表达式中直接用 `$attrs` 访问到。

```vue
<span>Fallthrough attribute: {{ $attrs }}</span>
```

这个 `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute，例如 `class`，`style`，`v-on` 监听器等等。

有几点需要注意：

- 和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 `foo-bar` 这样的一个 attribute 需要通过 `$attrs['foo-bar']` 来访问。
- 像 `@click` 这样的一个 `v-on` 事件监听器将在此对象下被暴露为一个函数 `$attrs.onClick`。

我们可以通过设定 `inheritAttrs: false` 和使用 `v-bind="$attrs"` 来实现将透传属性绑定到指定元素

```vue
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">Click Me</button>
</div>
```

> 小提示：没有参数的 v-bind 会将一个对象的所有属性都作为 attribute 应用到目标元素上。

### 多根节点的 Attributes 继承

和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为。如果 `$attrs` 没有被显式绑定，将会抛出一个运行时警告。

```vue
<CustomLayout id="custom-layout" @click="changeValue" />
```

如果 `<CustomLayout>` 有下面这样的多根节点模板，由于 Vue 不知道要将 attribute 透传到哪里，所以会抛出一个警告。

```vue
<header>...</header>
<main>...</main>
<footer>...</footer>
```

如果 `$attrs` 被显式绑定，则不会有警告：

```vue
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

### 在 JavaScript 中访问透传 Attributes

在setup中, 可以通过useAttrs获取$attrs

```js
// 在<script setup>中,可以通过useAttrs获取$attrs
import { useAttrs } from 'vue'
const attrs = useAttrs()
console.log(attrs)
```
