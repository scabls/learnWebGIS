### object-fit

```css
object-fit 属性指定元素的内容应该如何去适应指定容器的高度与宽度。

object-fit 一般用于 img 和 video 标签，一般可以对这些元素进行保留原始比例的剪切、缩放或者直接进行拉伸等。

可以通过使用 object-position 属性来切换被替换元素的内容对象在元素框内的对齐方式
```

#### 取值

```css
fill	默认，不保证保持原有的比例，内容拉伸填充整个内容容器。

contain	被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。

cover	被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。

none	保留原有元素内容的长度和宽度，也就是说内容不会被重置。	

scale-down	保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。
```

### 粘性定位

```css
position: sticky	
粘性定位，基于用户的滚动位置来定位。
粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。
它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。
```

```css
元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。
这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。
```

```css
使用
	设置定位的方式
		position:sticky
	设置最终固定定位的的偏移值(特定阈值)
		top:20px
```

### 媒体查询

**概念**
	可以针对不同的屏幕尺寸设置不同的样式
**使用**

```css
	@media
```

**注意**

```css
	从大屏幕到小屏幕
	@media(max-witdh:像素值){
		当前宽度下的样式
	}
	
	从小屏幕到大屏幕
	@media(min-witdh:像素值){
		当前宽度下的样式
	}
```

#### 多媒体查询语法

```css
@media media-type and (media-feature-rule) {
  /* CSS rules go here */
}
```

 media-type	媒体类型，告诉浏览器这段代码是用在什么类型的媒体上的（例如印刷品或者屏幕）；

```css
all	用于所有多媒体类型设备
print	用于打印机
screen	用于电脑屏幕，平板，智能手机等。
speech	用于屏幕阅读器
```

​		媒体类型是**可选**的，如果你没有在媒体查询中指示一个媒体类型的话，那么媒体查询默认会设为用于全部媒体类型

media-feature-rule	媒体表达式，是一个被包含的 CSS 生效所需的规则或者测试；

```css
max-width: 480px	不超过 480 像素时生效
min-width: 480px	不低于 480 像素时生效
```

一组 CSS 规则，会在测试通过且媒体类型正确的时候应用。

#### 更复杂的媒体查询

##### 媒体查询中的“与”逻辑

为了混合媒体特征，你可以以与在上面使用and很相同的方式，用and来混合媒体类型和特征。

```css
@media screen and (min-width: 400px) and (orientation: landscape) {
  body {
    color: blue;
  }
}
```

##### 媒体查询中的“或”逻辑

如果你有一组查询，且要其中的任何一个都可以匹配的话，那么你可以使用逗号分开这些查询。

```css
@media screen and (min-width: 400px), screen and (orientation: landscape) {
  body {
    color: blue;
  }
}
```

##### 媒体查询中的“非”逻辑

你可以用not操作符让整个媒体查询失效。这就直接反转了整个媒体查询的含义。因而在下面的例子中，文本只会在朝向为竖着的时候变成蓝色。

```css
@media not all and (orientation: landscape) {
  body {
    color: blue;
  }
}
```

### 属性计算过程

```css
概念
	任何一个 HTML 元素，都有一套完整的 CSS 样式，只不过你没有书写的样式，大概率可能会使用其默认值。
```

```css
计算过程
	1.确认声明值（程序员写的样式）
		如果有自己写的样式，优先使用自己的
	2.解决层叠冲突（在有多个声明时）
		1.比较源的重要性
			页面作者样式（自己写的） > 用户样式（浏览器用户定义的） > 用户代理样式（标签自带的）
		2.比较优先级
			如果来源相同，比较优先级，通过权重公式
		3.比较次序
			优先级相同时。写在下面的样式会覆盖写在上面的样式
	3.使用继承（没有自己声明样式的前提下）
		注意点：遵循就近原则
	4.使用默认值（没有自己声明的样式，也没有可以继承的样式，只能使用默认值）
```

```css
总结
	先看有没有程序员定义的样式->看标签有没有自带样式->有没有继承的->默认样式
```

### 布局和包含块

一个元素的尺寸和位置经常受其包含块（containing block）的影响。大多数情况下，包含块就是这个元素最近的祖先块元素的**内容区域**，但也不是总是这样。

当一个客户端代理（比如说浏览器）展示一个文档的时候，对于每一个元素，它都产生了一个盒子。每一个盒子都被划分为四个区域：

1. 内容区
2. 内边距区
3. 边框区
4. 外边距区

#### 包含块的影响

元素的尺寸及位置，常常会受它的包含块所影响。对于一些属性，例如 width, height, padding, margin，绝对定位元素的偏移值（比如 position 被设置为 absolute 或 fixed），当我们对其赋予百分比值时，这些值的计算值，就是通过元素的包含块计算得来。

#### 确定包含块

##### 初始包含块（initial containing block）

对于浏览器而言，初始包含块的的大小等于视口 viewport 的大小。基点在画布的原点（视口左上角）。它是作为元素绝对定位和固定定位的参照物。

##### 对于非根元素（除了html以外的标签）

确定一个元素的包含块的过程完全依赖于这个元素的 **position 属性**：

1. 如果 position 属性为 static、relative 或 sticky，那么包含块由离它最近的**块容器（block container）**（比如说 inline-block, block 或 list-item 元素）的**内容区域（content area）的边缘**建立。也可能会建立格式化上下文 (比如说  table container, flex container, grid container, 或者是 block container 自身)。
2. 如果 position 属性为 absolute，包含块就是由它的最近的 position 的值不是 static （也就是值为fixed, absolute, relative 或 sticky）的祖先元素的**内边距区**的边缘组成。
3. 如果 position 属性是 fixed，在连续媒体的情况下 (continuous media) 包含块是 **viewport** ,在分页媒体 (paged media) 下的情况下包含块是分页区域 (page area)。
4. 如果 position 属性是 absolute 或 fixed，包含块也可能是由满足以下条件的最近父级元素的**内边距区**的边缘组成的
   1. transform 或 perspective 的值不是 none
   2. will-change 的值是 transform 或 perspective
   3. filter 的值不是 none 或 will-change 的值是 filter（只在 Firefox 下生效）。
   4. contain 的值是 layout、paint、strict 或 content（例如：contain: paint;）
   5. backdrop-filter 的值不是 none（例如：backdrop-filter: blur(10px);）

#### 根据包含块计算百分值

如上所述，当某些属性被赋予一个百分比值时，它的计算值取决于这个元素的包含块。以这种方式工作的属性包括**盒模型属性**和**偏移属性**：

1. height、top 及 bottom 属性根据包含块的 height 计算百分比值。
2. width、left、right、padding 和 margin 属性根据包含块的 width 计算百分比值。

### 网格布局（Grid）

```css
概念
	网格是一组相交的水平线和垂直线，它定义了网格的列和行。
	CSS 提供了一个基于网格的布局系统，带有行和列，可以让我们更轻松地设计网页，而无需使用浮动和定位。
```

```CSS
使用
	当一个 HTML 元素将 display 属性设置为 grid 或 inline-grid 后，它就变成了一个网格容器，这个元素的所有直系子元素将成为网格元素。
	display: grid
```

```css
组成
	网格列
		网格元素的垂直线方向称为列（Column）。
	网格行
		网格元素的水平线方向称为行（Row）。
	网格间距
		网格间距（Grid Gap）指的是两个网格单元之间的网格横向间距或网格纵向间距。
	网格线
		列与列，行与行之间的交接处就是网格线。grid属性会为我们创建编号的网格线来让我们来定位每一个网格元素。
			注：grid属性	grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, 以及 grid-auto-flow 的简写属性
```

#### 网格容器

```CSS
网格列/行
	grid-template-columns	定义了网格布局中的列的数量，它也可以设置每个列的宽度。
		属性值是一个以空格分隔的列表，其中每个值定义相对应列的宽度。
			注意：如果您在4列网格中有4个以上的网格元素，网格布局会生成新的一行放置该元素。
	grid-template-rows		设置每一行的高度。
		属性值是一个以空格分隔的列表，其中每个值定义相对应行的高度
	取值
		长度
		百分比
		flex	非负值，用单位 fr 来定义网格轨道大小的弹性系数。每个定义了 <flex> 的网格轨道会按比例分配剩余的可用空间。一个 fr 单位代表网格容器中可用空间的一等份。当外层用一个 minmax() 表示时，它将是一个自动最小值（即 minmax(auto, <flex>)）。

网格轨道
	
```

```css
网格容器其他属性
	justify-content 用于对齐容器内的网格，设置如何分配顺着弹性容器主轴(或者网格行轴) 的元素之间及其周围的空间。
		注意：网格的总宽度必须小于容器的宽度才能使 justify-content 属性生效。
	align-content 	用于设置垂直方向上的网格元素在容器中的对齐方式。
		注意：网格元素的总高度必须小于容器的高度才能使 align-content 属性生效。
	grid-auto-flow 	指定自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列
        row	默认值。 通过填充每一行来放置网格元素，在必要时增加新列。
        column	通过填充每一列来放置网格元素，在必要时增加新列
```

```css
网格间距
	column-gap	设置列之间的网格间距
	row-gap	设置行之间的网格间距
	gap		是 row-gap 和 column-gap 属性的简写，值以空格隔开
		默认值：0 0

间隙距离可以用任何长度单位包括百分比来表示，但不能使用fr单位。
```

##### 显式网格与隐式网格

```

```

##### minmax() 函数

```css
minmax() 函数为一个行/列的尺寸设置了取值范围。比如设定为 minmax(100px, auto)，那么尺寸就至少为 100 像素，并且如果内容尺寸大于100 像素则会根据内容自动调整。
```

##### 自动使用多列填充

```css
某些情况下，我们需要让网格自动创建很多列来填满整个容器。
通过设置grid-template-columns属性，我们可以实现这个效果，不过这一次我们会用到 repeat() 函数中的一个关键字auto-fill来替代确定的重复次数。
而函数的第二个参数，我们使用minmax()函数来设定一个行/列的最小值，以及最大值 1fr。
    .container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-auto-rows: minmax(100px, auto);
      grid-gap: 20px;
    }
你应该能看到形成了一个包含了许多至少 200 像素宽的列的网格，将容器填满。随着容器宽度的改变，网格会自动根据容器宽度进行调整，每一列的宽度总是大于 200 像素，并且容器总会被列填满。
```

#### 网格元素

```css
网格线
	第一条线的起始点与文档书写模式相关。在英文中，第一条列分隔线（即网格边缘线）在网格的最左边而第一条行分隔线在网格的最上面。而对于阿拉伯语，第一条列分隔线在网格的最右边，因为阿拉伯文是从右往左书写的。

我们根据这些分隔线来放置元素，通过以下属性来指定从那条线开始到哪条线结束。
	grid-column-start，grid-column-end	定义了网格元素列的开始和结束位置。
	grid-row-start，grid-row-end			定义了网格元素行的开始和结束位置。

这些属性的值均为分隔线序号，你也可以用以下缩写形式来同时指定开始与结束的线。
    grid-column		grid-column-start 和 grid-column-end 属性的简写属性。
    grid-row		grid-row-start 和 grid-row-end 属性的简写属性
	grid-area		grid-row-start, grid-column-start, grid-row-end 以及 grid-column-end 属性的简写
注意开始与结束的线的序号要使用 / 符号分开。

使用网格线可以实现跨行跨列放置元素
```

```css
跨列	grid-column	
我们可以参考列线序号来设置网格元素，也可以使用关键字 "span" 来定义元素将跨越的列数。
    第 1 列开始，在第 5 列前结束
        .item1 {
            grid-column: 1 / 5;
        }
        /*可以理解为：第一个数字是当前所在列数，第二个数字是（当前列数+要跨列数）
        但两个数字的实际含义是列线的编号！*/

    "item1" 跨越 3 列
        .item1 {
            grid-column: 1 / span 3;
        }

    "item2" 跨越 3 列
        .item2 {
            grid-column: 2 / span 3;
        }
        列线写法：
        .item2 {
            grid-column: 2 / 5;
        }
```

```css
跨行	grid-row 属性
我们可以参考行线序号来设置网格元素，也可以使用关键字 "span" 来定义元素将跨越的行数。
    第 1 行开始，在第 4 行前结束
    .item1 {
        grid-row: 1 / 4;
    }
    /*可以理解为：第一个数字是当前所在行数，第二个数字是（当前行数+要跨行数）
    但两个数字的实际含义是行线的编号！*/

    "item1" 跨越 2 行
    .item1 {
        grid-row: 1 / span 2;
    }

    "item2" 跨越 2 行
    .item2 {
        grid-row: 2 / span 2;
    }
    列线写法：
    .item2 {
        grid-row: 2 / 4;
    }
```

```css
同时跨行跨列	grid-area 属性
	"item8" 从第 1 行开始和第 2 列开始， 第 5 行和第 6 列前结束。
        .item8 {
            grid-area: 1 / 2 / 5 / 6;
        }

	"item8" 从第 2 行开始和第 1 列开始， 横跨 2 行 3 列。
        .item8 {
          grid-area: 2 / 1 / span 2 / span 3;
        }

grid-area 属性可以对网格元素进行命名。
命名的网格元素可以通过容器的 grid-template-areas 属性来引用。

	item1 命名为 "myArea", 并跨越五列
        .item1 {
            grid-area: myArea;
        }
        .grid-container {
            grid-template-areas: 'myArea myArea myArea myArea myArea';
        }
grid-template-areas
每行由单引号内 ' '或双引号内" " 定义，以空格分隔。
    需要填满网格的每个格子
    对于某个横跨多个格子的元素，重复写上那个元素grid-area属性定义的区域名字
    所有名字只能出现在一个连续的区域，不能在不同的位置出现
    一个连续的区域必须是一个矩形
    使用.符号，让一个格子留空。 .号表示没有名称的网格项
```

