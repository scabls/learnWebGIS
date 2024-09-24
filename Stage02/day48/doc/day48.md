# Vue

## 单文件组件 CSS 功能

### 组件作用域 CSS

当 `<style>` 标签带有 `scoped` attribute 的时候，它的 CSS 只会影响当前组件的元素，和 Shadow DOM 中的样式封装类似。使用时有一些注意事项，不过好处是不需要任何的 polyfill。它的实现方式是通过 PostCSS 将以下内容：

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

转换为：

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

#### 子组件的根元素

使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

#### 深度选择器

处于 `scoped` 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 `:deep()` 这个伪类：

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

上面的代码会被编译成：

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

> 通过 `v-html` 创建的 DOM 内容不会被作用域样式影响，但你仍然可以使用深度选择器来设置其样式。

如果不使用深度选择器:

```vue
<style scoped>
.a .b {
  /* ... */
}
</style>

```

则会被编译成:

```css
.a[data-v-f3f3eg9] .b[data-v-f3f3eg9] {
  /* ... */
}
```

# CSS

## 文本换行相关属性

### white-space

CSS **`white-space`** 属性用于设置如何处理元素内的[空白字符](https://developer.mozilla.org/zh-CN/docs/Glossary/Whitespace)。

这个属性指定了两件事：

- 空白字符是否[合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符)，以及如何合并。
- 是否换行，以及如何换行。

> 要使单词可以在*其内部*被截断，请使用 [`overflow-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap)、[`word-break`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break) 或 [`hyphens`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/hyphens) 代替。

#### 语法

##### 值

`white-space` 属性可以被指定为从下面的值列表中选择的单个关键字，或者是表示 [`white-space-collapse`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space-collapse) 和 [`text-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap) 属性的简写的两个值。

- `normal`

  连续的空白符会被[合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符)。源码中的换行符会被当作空白符来处理。并根据填充行框盒子的需要来换行。

- `nowrap`

  和 `normal` 一样[合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符)空白符，但阻止源码中的文本换行。

- `pre`

  连续的空白符会被保留。仅在遇到换行符或 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br) 元素时才会换行。

- `pre-wrap`

  连续的空白符会被保留。在遇到换行符或 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br) 元素时，或者根据填充行框盒子的需要换行。

- `pre-line`

  连续的空白符会被[合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符)。在遇到换行符或 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br) 元素时，或者根据填充行框盒子的需要换行。

- `break-spaces`

  与 `pre-wrap` 的行为相同，除了：任何保留的空白序列总是占用空间，包括行末的。每个保留的空白字符后（包括空白字符之间）都可以被截断。这样保留的空间占用空间而不会挂起，从而影响盒子的固有尺寸（最小内容——`min-content`——大小和最大内容——`max-content`——大小）。

下面的表格总结了各种 `white-space` 关键字值的行为：

|                | 换行符 | 空格和制表符 | 文本换行 | 行末空格 | 行末的其他空白分隔符 |
| :------------- | :----- | :----------- | :------- | :------- | :------------------- |
| `normal`       | 合并   | 合并         | 换行     | 移除     | 挂起                 |
| `nowrap`       | 合并   | 合并         | 不换行   | 移除     | 挂起                 |
| `pre`          | 保留   | 保留         | 不换行   | 保留     | 不换行               |
| `pre-wrap`     | 保留   | 保留         | 换行     | 挂起     | 挂起                 |
| `pre-line`     | 保留   | 合并         | 换行     | 移除     | 挂起                 |
| `break-spaces` | 保留   | 保留         | 换行     | 换行     | 换行                 |

> **备注：** **空格**和**其他空白分隔符**之间存在区别。定义如下：
>
> - [空格](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#空格)
>
>   空格（U+0020）、制表符（U+0009）和分段符（例如换行）
>
> - [其他空白分隔符](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#其他空白分隔符)
>
>   Unicode 中定义的所有其他空格分隔符（已定义为空格的分隔符除外）。
>
> 如果空白字符被*挂起*，那么它可能会影响框的固有尺寸的测量结果。

### word-break

CSS 属性 `word-break` 指定了怎样在单词内断行。

#### 语法

##### 值

- `normal`

  使用默认的断行规则。

- `break-all`

  对于 non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行。

- `keep-all`

  CJK 文本不断行。Non-CJK 文本表现同 `normal`。

- `break-word` 已弃用

  他的效果是`word-break: normal` 和 `overflow-wrap: anywhere` 的合，不论 [`overflow-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap)的值是多少。

> 与 `word-break: break-word` 和 `overflow-wrap: break-word`（详见 [`overflow-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap)）对比，`word-break: break-word` 将在文本可能溢出其容器的确切位置创建一个断点。

### overflow-wrap

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性 **`overflow-wrap`** 应用于行级元素，用来设置浏览器是否应该在一个本来不能断开的字符串中插入换行符，以防止文本溢出其行向盒。

> 与 [`word-break`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break) 相比，`overflow-wrap` 仅在无法将整个单词放在自己的行而不会溢出的情况下才会产生换行。
>
> 这个属性原本属于微软扩展的一个非标准、无前缀的属性，叫做 `word-wrap`，后来在大多数浏览器中以相同的名称实现。目前它已被更名为 [`overflow-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap)，`word-wrap` 相当于其别称。

#### 语法

##### 值

- `normal`

  行只能在正常的单词断点（例如两个单词之间的空格）处换行。

- `anywhere`

  为防止溢出，如果行中没有其他可接受的断点，则不可断的字符串（如长词或 URL）可能会在任何时候换行。在断点处不会插入连字符。在计算最小内容内在大小时，会考虑由单词换行引入的软换行机会。

- `break-word`

  与 anywhere 值相同，如果行中没有其他可接受的断点，则允许在任意点将通常不可断的单词换行，但在计算最小内容内在大小时不考虑断字引入的软换行机会。

## text相关属性

### text-overflow

**`text-overflow`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性用于确定如何提示用户存在隐藏的溢出内容。其形式可以是裁剪、显示一个省略号（“`…`”）或显示一个自定义字符串。

`text-overflow` 属性并不会强制“溢出”事件的发生，因此为了能让文本能够溢出容器，你需要在元素上添加几个额外的属性：[`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 和 [`white-space`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)。例如：

```css
overflow: hidden;
white-space: nowrap;
```

`text-overflow` 属性只对那些在块级元素溢出的内容有效，但是必须要与块级元素*内联*（inline）方向一致（举个反例：文本无法在盒子的下方溢出）。

#### 语法

`text-overflow` 属性可能被赋予一个或者两个值。如果赋一个值，指的行末溢出行为（从左至右的文本右末端，从右至左的文本左末端）。如果赋两个值，第一个值指定行左端溢出行为，第二个值指定行右端溢出行为。

- 关键字之一：`clip`、`ellipsis`、`fade`
- 函数 `fade()`：传入 `<length>` 或 `<percentage>` 来控制淡出距离
- 一个字符串 `<string>`。

##### 值

- `clip`

  默认值。这个关键字会在[内容区域](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)的极限处截断文本，因此可能会在单词的中间发生截断。如果你的目标浏览器支持 `text-overflow: ''`，为了能在两个单词过渡处截断，你可以使用一个空字符串值（`''`）作为 `text-overflow` 属性的值。

- `ellipsis`

  这个关键字会用一个省略号（`'…'`、`U+2026 HORIZONTAL ELLIPSIS`）来表示被截断的文本。这个省略号被添加在[内容区域](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)中，因此会减少显示的文本。如果空间太小以至于连省略号都容纳不下，那么这个省略号也会被截断。

- `<string>` 实验性

  [`string`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/string) 用来表示被截断的文本。字符串内容将被添加在[内容区域](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)中，所以会减少显示出的文本。如果空间太小以至于连字符串本身都容纳不下，那么这个字符串也会被截断。

- `fade` 实验性

  这个关键字将会截断行内溢出文本并在完全透明的行边缘添加一个淡出特效。

- `fade( <length> | <percentage> )` 实验性

  这个函数将会截断行内溢出文本并在完全透明的行边缘添加一个淡出特效。 参数决定淡出特效的距离。[``](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage) 以行宽而定。小于 `0` 的值视为 0。大于行宽的值视为行宽。

##### 隐藏溢出文本并设置省略号样式

```css
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
```

