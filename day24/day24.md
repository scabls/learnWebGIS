## 王者荣耀案例实现

### JS

#### 步骤

1. 发送请求，获取所有英雄数据，将数据渲染到页面上
2. 实现页面上层区域自定义单选框的单选效果（点击哪一个则选中，其余的取消选中）
3. 实现页面上层区域自定义单选框的数据筛选（根据选中的单选框，筛选下方的英雄数据）
4. 实现页面上层区域的搜索功能

#### 改进

1. 将数据渲染的方法使用数组的map方法来实现
2. 将设置自定义单选框的单选样式抽取成一个方法
   - 没有使用排他思想,先找出之前选中的自定义单选框取消选中,然后让当前点击的单选框选中

## grid布局

### repeat函数

#### 定义与用法

repeat() 函数表示轨道列表的重复片段，允许以更紧凑的形式写入大量显示重复模式的列或行。

该函数可以用于 CSS Grid 属性中 grid-template-columns 和 grid-template-rows。

#### 语法

```css
/* <track-repeat> values */
repeat(4, 1fr)
repeat(4, [col-start] 250px [col-end])
repeat(4, [col-start] 60% [col-end])
repeat(4, [col-start] 1fr [col-end])
repeat(4, [col-start] min-content [col-end])
repeat(4, [col-start] max-content [col-end])
repeat(4, [col-start] auto [col-end])
repeat(4, [col-start] minmax(100px, 1fr) [col-end])
repeat(4, [col-start] fit-content(200px) [col-end])
repeat(4, 10px [col-start] 30% [col-middle] auto [col-end])
repeat(4, [col-start] min-content [col-middle] max-content [col-end])

/* <auto-repeat> values */
repeat(auto-fill, 250px)
repeat(auto-fit, 250px)
repeat(auto-fill, [col-start] 250px [col-end])
repeat(auto-fit, [col-start] 250px [col-end])
repeat(auto-fill, [col-start] minmax(100px, 1fr) [col-end])
repeat(auto-fill, 10px [col-start] 30% [col-middle] 400px [col-end])

/* <fixed-repeat> values */
repeat(4, 250px)
repeat(4, [col-start] 250px [col-end])
repeat(4, [col-start] 60% [col-end])
repeat(4, [col-start] minmax(100px, 1fr) [col-end])
repeat(4, [col-start] fit-content(200px) [col-end])
repeat(4, 10px [col-start] 30% [col-middle] 400px [col-end])
```

可以看到repeat接受两个参数，第一个参数是**重复次数**，第二个参数是**轨道定义**

##### 重复次数

###### 固定次数 (`<count>`)

可以是一个正整数，表示轨道定义将被重复的次数。

例如：`repeat(3, 100px)` 表示重复 `100px` 的轨道定义 3 次。

###### 自动填充 (`auto-fill`)

尽可能多地重复轨道定义，使得轨道填满网格容器，即使这些轨道是空的。

根据容器尺寸的设置，重复次数有如下情况：

1. **网格容器在相关轴上有明确的*或* 最大尺寸时**：

   - **最大可能的重复次数**：如果网格容器的尺寸是*明确的*或*有最大限制*（例如指定了宽度width或最大高度max-height），CSS Grid 会计算可以放置多少轨道（列或行），确保网格不会溢出容器。这意味着它会尝试填充尽可能多的轨道，而不导致内容超出容器的边界。

   - **最大轨道大小**：如果轨道的大小是明确的（例如 `grid-template-columns: repeat(auto-fill, 200px);`），那么在计算时，每个轨道都会被视为其最大尺寸（即 `200px`）。如果轨道大小是不确定的，那么它会按照最小轨道大小来计算。

   - **考虑网格间隙**：在计算重复次数时，还会考虑 `grid-gap`（网格间隙）的大小。

   - **如果任何重复次数都会导致溢出**：如果不论重复多少次都会导致网格内容溢出容器，那么重复次数会被设置为 1。

2. **网格容器在相关轴上有明确的最小尺寸时**：
   - **最小可能的重复次数**：如果网格容器的尺寸是明确的最小尺寸（例如 `min-width` 或 `min-height` 被定义），CSS Grid 会计算满足最小尺寸所需的最小轨道数量。这意味着它会确保至少有足够的轨道来满足容器的最小尺寸要求。

3. **否则，轨道列表只重复一次**：
   - **未明确容器尺寸**：如果网格容器没有明确的最大或最小尺寸，那么 `repeat()` 函数的指定轨道列表将只重复一次。

###### 自动适应 (`auto-fit`)

与 `auto-fill` 类似，但会“折叠”空的轨道。仅保留实际需要的轨道，空轨道将被移除。

经常与`minmax()`函数搭配使用

##### 轨道定义

###### 单一轨道大小 (`<track-size>`)：

- 可以是一个长度值（如 `100px`、`1fr`、`min-content`、`max-content`）或一个 `minmax()` 函数，定义每个轨道的大小。
- 例如：`repeat(3, 100px)` 表示 3 个 `100px` 宽的列。

###### 多个轨道大小的组合：

- 可以是多个轨道大小的组合，这些组合会作为一个整体进行重复。
- 例如：`repeat(2, 100px 1fr)` 表示重复 2 次，每次包含一个 `100px` 和一个 `1fr` 的轨道。

###### 命名网格线 (`<line-name>`)：

- 可以在轨道大小之间插入命名的网格线，这些网格线可以用来定位网格项。
- 例如：`repeat(3, [col-start] 100px [col-end])` 表示 3 个轨道，每个轨道的开始和结束都定义了命名的网格线。

###### 混合使用：

- 可以在 `repeat()` 内部混合使用多个轨道大小和命名网格线。
- 例如：`repeat(2, 10px [start] 20% [middle] auto [end])` 表示重复 2 次，每次包含三个不同大小的列，并且每列之间有命名的网格线。

### minmax函数

#### 定义与用法

CSS函数 minmax() 定义了一个长宽范围的闭区间，它与CSS 网格布局一起使用

#### 语法

```css
/* <inflexible-breadth>, <track-breadth> values */
minmax(200px, 1fr)
minmax(400px, 50%)
minmax(30%, 300px)
minmax(100px, max-content)
minmax(min-content, 400px)
minmax(max-content, auto)
minmax(auto, 300px)
minmax(min-content, auto)

/* <fixed-breadth>, <track-breadth> values */
minmax(200px, 1fr)
minmax(30%, 300px)
minmax(400px, 50%)
minmax(50%, min-content)
minmax(300px, max-content)
minmax(200px, auto)

/* <inflexible-breadth>, <fixed-breadth> values */
minmax(400px, 50%)
minmax(30%, 300px)
minmax(min-content, 200px)
minmax(max-content, 200px)
minmax(auto, 300px)
```

此函数包含两个参数，*最小值* 和 *最大值*.

每个参数分别是`<length>`、`<percentage>`、`<flex>`的一种，或者是`max-content`、`min-content`、或`auto`之一。

如果 *最大值* < *最小值*，则*最大值*被忽略并且 `minmax(最小值, 最大值)` 被看成*最小值*。`flex` 值作为最大值时设置网格轨道的弹性系数；作为最小值时无效。

### 自动按列排布填充

#### 需求

网格单元按列自动填充，达到最大高度后新开一列。若网格单元不足以填满一列，则容器高度适应为网格单元的排列高度

#### 做法

##### 设置grid-auto-flow

**`grid-auto-flow`** 属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。

###### 取值

- row
  - 该关键字指定自动布局算法按照通过逐行填充来排列元素，在必要时增加新行。如果既没有指定 row 也没有 column，则默认为 row。
- column
  - 该关键字指定自动布局算法通过逐列填充来排列元素，在必要时增加新列。

按照需求，设置如下

```css
grid-auto-flow: column;
```

##### 设置grid-template-rows

使用repeat()函数，重复次数使用自动适应`auto-fit`，轨道定义使用固定尺寸。

```css
grid-template-rows: repeat(auto-fit, 1.15rem);
```

为什么不使用自动填充`auto-fill`呢？因为我们需要的是网格单元不足以填满一列时，则容器高度适应为网格单元的排列高度。若使用`auto-fill`，就会使用空轨道填充，直到达到最大高度。

##### 设置gap

`gap` 属性是用来设置网格行与列之间的间隙，该属性是`row-gap` 和 `column-gap`的简写形式。

根据需求设置gap。

```css
row-gap: 0.4rem;
column-gap: 1.8rem;
或者
gap: 0.4rem 1.8rem
```

##### 设置max-height

看需求是指定最大行数还是最大高度，后者直接设定最大高度即可。但若需求指定的最大行数，则取值需要计算。

若指定最大10行。

根据之前设置的`box-sizing: border-box`，`max-height`包含边框和内边距。

假设设置了`padding: 1rem`和`border: 1px solid #ccc`。

结合轨道尺寸和行gap。

至少需要高度为

```css
10 * 1.15 * 16 + 9 * 0.4 * 16 + 2 * 1 * 16 + 2 * 1 = 275.6px
```

则我们可以将`max-height`设置为275.6px。当然也可以稍微大一点，但增大的值一定要小于轨道尺寸+行间隙，否则就又会加一行