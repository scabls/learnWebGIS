# 组件基础

## 动态组件

有些场景会需要在两个组件间来回切换, 可以通过 Vue 的 `<component>` 元素和特殊的 `is` attribute 实现

```vue
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```

在上面的例子中，被传给 :is 的值可以是以下几种：

- 被注册的组件名

- 导入的组件对象

你也可以使用 is attribute 来创建一般的 HTML 元素。

当使用 `<component :is="...">` 来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过` <KeepAlive> `内置组件强制被切换掉的组件仍然保持“存活”的状态。

### tabBar示例

```vue
<template>
  <!-- 动态组件, 由is属性决定渲染哪个组件 -->
  <component :is="views[active]"></component>
  <!-- <TabBar :modelValue="active" @update:model-value="handleUpdate"> -->
  <TabBar v-model="active">
    <TabBarItem icon="home">首页</TabBarItem>
    <TabBarItem icon="category">分类</TabBarItem>
    <TabBarItem icon="cart">购物车</TabBarItem>
    <TabBarItem icon="user">我的</TabBarItem>
  </TabBar>
</template>

<script setup>
import TabBar from './components/TabBar.vue'
import TabBarItem from './components/TabBarItem.vue'
import { ref, shallowRef } from 'vue'
const active = ref(0)
import HomeView from './views/HomeView.vue'
import CateView from './views/CateView.vue'
import CartView from './views/CartView.vue'
import UserView from './views/UserView.vue'
const views = shallowRef([HomeView, CateView, CartView, UserView])
</script>
```

**注意**

-  `views`可以直接是一个静态数组, 或者是`shallowRef()`返回的浅层响应数组
- 页面放在src下的views文件夹下

### `<component>`

一个用于渲染动态组件或元素的“元组件”。

- **详细信息**

  要渲染的实际组件由 `is` prop 决定。

  - 当 `is` 是字符串，它既可以是 HTML 标签名也可以是组件的注册名。
  - 或者，`is` 也可以直接绑定到组件的定义。

如果想通过名称传递则必须先对其进行注册。如果将组件本身传递给 `is` 而不是其名称，则不需要注册，例如在 `<script setup>` 中。

上方示例就是传递的组件定义

```vue
<template>
.....
  <component :is="views[active]"></component>
.....
</template>

<script setup>
.....    
const views = shallowRef([HomeView, CateView, CartView, UserView]);
</script>
```

### is

用于绑定动态组件。

- 预期：string | Component


```vue
<component :is="views[active]"></component>
```

# 内置组件

## KeepAlive

`<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。

### 基本使用

在组件基础章节中，我们已经介绍了通过特殊的 `<component>` 元素来实现[动态组件](https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components)的用法：

```vue
<component :is="activeComponent" />
```

默认情况下，一个组件实例在被替换掉后会被销毁。这会导致它丢失其中所有已变化的状态——当这个组件再一次被显示时，会创建一个只带有初始状态的新实例。

想要组件能在被“切走”的时候保留它们的状态。要解决这个问题，我们可以用 `<KeepAlive>` 内置组件将这些动态组件包装起来：

```vue
  <keep-alive :include="['HomeView']">
    <component :is="views[active]"></component>
  </keep-alive>
```

### 详细信息

`<KeepAlive>` 包裹动态组件时，会缓存不活跃的组件实例，而不是销毁它们。

任何时候都只能有一个活跃组件实例作为 `<KeepAlive>` 的直接子节点。

当一个组件在 `<KeepAlive>` 中被切换时，它的 `activated` 和 `deactivated` 生命周期钩子将被调用，用来替代 `mounted` 和 `unmounted`。这适用于 `<KeepAlive>` 的直接子节点及其所有子孙节点。

### 包含/排除

`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 `include` 和 `exclude` prop 来定制该行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：

```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

它会根据组件的 [`name`](https://cn.vuejs.org/api/options-misc.html#name) 选项进行匹配，所以组件如果想要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 `name` 选项。

> 在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，无需再手动声明。

### 缓存实例的生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为**不活跃**状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新**被激活**。

一个持续存在的组件可以通过 [`onActivated()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#onactivated) 和 [`onDeactivated()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#ondeactivated) 注册相应的两个状态的生命周期钩子：

```VUE
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```

请注意：

- `onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用。
- 这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件。

# 组件深入

## 组件 v-model

### 基本用法

`v-model` 可以在组件上使用以实现双向绑定。

从 Vue 3.4 开始，推荐的实现方式是使用 [`defineModel()`](https://cn.vuejs.org/api/sfc-script-setup.html#definemodel) 宏：

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()
</script>

<template>
  <span>My input</span> <input v-model="model">
</template>
```

父组件可以在子组件的引用标签上用 `v-model` 绑定一个值：

```vue
<!-- Parent.vue -->
<script setup>
import Child from './Child.vue'
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <Child v-model="msg" />
</template>
```

`defineModel()` 返回的值是一个 ref。它可以像其他 ref 一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用：

- 它的 `.value` 和父组件的 `v-model` 的值同步；
- 当它被子组件变更了，会触发父组件绑定的值一起更新。

#### 底层机制

`defineModel` 是一个便利宏。编译器将其展开为以下内容：

- 一个名为 `modelValue` 的 prop，本地 ref 的值与其同步；
- 一个名为 `update:modelValue` 的事件，当本地 ref 的值发生变更时触发。

在 3.4 版本之前，你一般会按照如下的方式来实现上述相同的子组件：

```vue
<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

然后，父组件中的 `v-model="foo"` 将被编译为：

```vue
<!-- Parent.vue -->
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>
```

如你所见，这显得冗长得多。然而，这样写有助于理解其底层机制。

因为 `defineModel` 声明了一个 prop，你可以通过给 `defineModel` 传递选项，来声明底层 prop 的选项：

```js
// 使 v-model 必填
const model = defineModel({ required: true })

// 提供一个默认值
const model = defineModel({ default: 0 })
```

### `v-model` 的参数

组件上的 `v-model` 也可以接受一个参数：

```vue
<MyComponent v-model:title="bookTitle" />
```

在子组件中，我们可以通过将字符串作为第一个参数传递给 `defineModel()` 来支持相应的参数：

```vue
<!-- MyComponent.vue -->
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```

如果需要额外的 prop 选项，应该在 model 名称之后传递：

```js
const title = defineModel('title', { required: true })
```

使用参数, 可以在单个组件引用上创建多个v-model双向绑定

### defineModel()

- 仅在 3.4+ 中可用

这个宏可以用来声明一个双向绑定 prop，通过父组件的 `v-model` 来使用。

在底层，这个宏声明了一个 model prop 和一个相应的值更新事件。如果第一个参数是一个字符串字面量，它将被用作 prop 名称；否则，prop 名称将默认为 `"modelValue"`。在这两种情况下，你都可以再传递一个额外的对象，它可以包含 prop 的选项和 model ref 的值转换选项。

```js
// 声明 "modelValue" prop，由父组件通过 v-model 使用
const model = defineModel()
// 或者：声明带选项的 "modelValue" prop
const model = defineModel({ type: String })

// 在被修改时，触发 "update:modelValue" 事件
model.value = "hello"

// 声明 "count" prop，由父组件通过 v-model:count 使用
const count = defineModel("count")
// 或者：声明带选项的 "count" prop
const count = defineModel("count", { type: Number, default: 0 })

function inc() {
  // 在被修改时，触发 "update:count" 事件
  count.value++
}
```

### 手动实现 v-model 的基本流程

1. **定义 `props` 接收 `modelValue`**： 使用 `defineProps` 定义接收 `modelValue` 的 prop，这是外部传入的数据。
2. **创建本地的 `ref`**： 在组件内部创建一个本地的 `ref` 来管理这个值，并手动将 `modelValue` 同步到这个 `ref`。
3. **监听本地 `ref` 的变化**： 当本地的 `ref` 发生变化时，手动触发 `emit` 事件（例如 `update:modelValue`）将更改通知父组件。

#### 手动实现代码示例

```vue
<script setup>
import { ref, watch } from 'vue';

// 1. 使用 defineProps 定义 modelValue
const props = defineProps({
  modelValue: [String, Number]  // 这里根据具体的数据类型定义
});

// 2. 创建一个本地的 ref，并将其初始值设置为 modelValue
const localValue = ref(props.modelValue);

// 3. 监听 modelValue 变化，并同步更新 localValue
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

// 4. 当 localValue 改变时，手动 emit 出 update:modelValue 事件
const emit = defineEmits(['update:modelValue']);
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <!-- 使用本地 ref 控制输入框的值 -->
  <input v-model="localValue" />
</template>
```

##### 解释

1. **`defineProps`**：接收父组件通过 `v-model` 传入的 `modelValue`。
2. **本地 `ref`**：手动创建了 `localValue` 这个本地的 `ref`，并初始化为 `modelValue` 的值。
3. **`watch`**：通过监听 `modelValue`，确保在父组件更新时同步更新 `localValue`。
4. **触发事件**：当 `localValue` 发生变化时，通过 `emit` 触发 `update:modelValue` 事件，把变更告知父组件，实现双向数据绑定。

#### 使用 `defineModel` 的实现

```vue
<script setup>
const modelValue = defineModel('modelValue')
</script>

<template>
  <input v-model="modelValue" />
</template>
```

##### 解释

**`defineModel`**：

- `defineModel('modelValue')` 会自动帮你创建一个与 `modelValue` 同步的本地 `ref`，无需手动使用 `defineProps` 和 `defineEmits`。
- 你可以直接使用 `modelValue` 作为响应式数据，就像使用普通的 `ref` 一样。

**双向绑定**：

- 在模板中，使用 `v-model="modelValue"` 实现双向数据绑定，这样当 `input` 元素的值发生变化时，本地的 `modelValue` 也会更新，并通过 `update:modelValue` 事件通知父组件。

#### 手动实现代码示例与上方"底层机制"小节对比

##### "底层机制"小节示例

```vue
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

##### 这个实现的特点：

1. **直接使用 `modelValue`**： 在这个示例中，直接使用了 `modelValue` prop 作为 `input` 元素的 `value`，并没有使用本地 `ref`。它是更直接的 `v-model` 实现方式。
2. **直接触发 `emit`**： 当 `input` 的值改变时，通过 `emit` 触发 `update:modelValue` 事件，将新的值传递给父组件。

##### 和"手动实现代码示例"的不同点：

1. **本地 `ref`**： 使用了一个本地的 `ref` 来同步 `modelValue`，这是为了处理一些复杂的场景，例如在本地对数据进行处理、延迟同步，或者不希望直接使用传入的 `modelValue` 值。
2. **直接绑定 vs 本地状态**： "底层机制"小节示例是最简单、最直接的实现方式，适用于不需要对 `modelValue` 进行本地处理的场景。而如果有更复杂的逻辑（比如在输入框中对数据进行处理，或控制同步时机），本地 `ref` 的方式会更灵活。
