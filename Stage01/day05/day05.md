### 盒子模型

#### 概念

##### 思想

元素都是盒子！盒子有空间，可以精准布局

##### 分类

行盒：行级元素

​		可在一行显示

​		*内容决定宽高*

块盒：块级元素

​		强制换行

​		初始：内容决定高，宽度为父级元素宽

​		但是*宽高可定义*

#### 互转

​	display: inline 默认值，行内元素

​	display: block，块级元素

​	display: inline-block; 行内块

> ​	  /* inline-block的特点，可以在一行显示，初始宽高由内容决定，但是可以设置宽高 */
>
> ​      /* 让块级水平排布可以这样设置为inline-block，但不推荐，有弊端 */
>
> ​      /* 弊端：代码中出现换行会导致块级元素有间隙，影响布局 */

##### display属性

```css
display 属性设置元素是否被视为块或者内联元素以及用于子元素的布局，例如流式布局、网格布局或弹性布局。
形式上，display 属性设置元素的内部和外部的显示类型
	none	使元素不再显示，其对布局不会有影响（文档渲染得好像这个元素并不存在）。所有的后代元素也不会再显示。为了使元素占据一个它通常占据的空间，但实际上没有渲染任何东西，应该使用 visibility 属性。
```

##### 特殊的img

​		**可替换元素**

```
使用 CSS 添加样式

	<img> 是一个可替换元素。它的 display 属性的默认值是 inline，但是它的默认分辨率是由被嵌入的图片的原始宽高来确定的，使得它就像 inline-block 一样。你可以为 <img> 设置 border/border-radius、padding/margin、width、height 等 CSS 属性。

	<img> 没有基线（baseline），这意味着，当在一个内联格式化上下文（inline formatting context）中使用 vertical-align: baseline 时，图像的底部将会与容器的文字基线对齐。

	你可以使用 object-position 属性将图形定位在元素的框内，并使用 object-fit 属性调整框内图像的大小（例如，如果图像需要裁剪，则其是否需要调整以符合框的大小，或填满整个框）。

	根据图像的类型，其可能会有一个原始的宽和高（原始分辨率）。对于一些类型的图像，原始分辨率并不是必要的。比如说，SVG 图像，如果它们的根 <svg> 元素没有 width 或 height 属性，SVG 图像就可以没有原始分辨率。
```



#### css属性书写顺序

```css
    /* 书写顺序
    1.布局属性 display
    2.尺寸属性 width height
    3.背景属性 background
    4.盒子模型相关属性 margin padding border
    5.其他样式（字体、文本、对齐、行高）----行高一定要放在字体连写的后面
    6.点缀属性（圆角、阴影、光标小手）
    */
```

#### 组成

**边框**

​	*border*

​	边框宽度 边框样式 边框颜色

​	属于盒子内

**内边距**

​	*padding*

​	盒子内部：边框与内容之间的填充距离

**外边距**

​	*margin*

​	盒子外部：边框外的填充距离

### 边框&内边距

#### 边框 border

##### border

简写属性，**有顺序**，复合了：border-width, border-style 和 border-color。

每个属性只能写**一个值**，设置全方向的属性。

简写普遍特点:缺少值会自动插入默认值，注意样式覆盖

##### border-width

简写属性，**有顺序**，**顺时针**，复合了：border-top-width，border-right-width，border-bottom-width，border-left-width

取值：

​	一个值	全

​	两个值	上下	左右

​	三个值	上	左右	下

​	四个值	顺时针	上	右	左	下

​	*可以理解为省略值自动插入默认值，默认值是对面位置的值*

##### border-style

简写属性，**有顺序**，**顺时针**，默认值是none

​	border-top-style

​	第一个值位置是top，取值简写方式如border-width

```
none   定义无边框。

hidden  与 "none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。

dotted  定义点状边框。在大多数浏览器中呈现为实线。

dashed  定义虚线。在大多数浏览器中呈现为实线。

solid  定义实线。

double  定义双线。双线的宽度等于 border-width 的值。
```

##### border-color

简写属性，**有顺序**，**顺时针**

​	border-top-color 

​	第一个值位置是top，取值简写方式如border-width

##### border-radius

简写属性，**有顺序**，**顺时针**，border-top-left-radius、border-top-right-radius、border-bottom-right-radius、 border-bottom-left-radius

​	第一个值位置是top-left，取值简写方式如border-width

```
当使用一个半径时确定一个圆形，当使用两个半径时确定一个椭圆。这个（椭）圆与边框的交集形成圆角效果。
	对于椭圆，前者是半长轴，后者是半短轴
```

```
<length>
<length> 定义圆形半径或椭圆的半长轴，半短轴。负值无效。

<percentage>
使用百分数定义圆形半径或椭圆的半长轴，半短轴。水平半轴相对于盒模型的宽度；垂直半轴相对于盒模型的高度。负值无效。
```

##### 单一方向上的边框

*border-方位*

- border-top
- border-right
- border-bottom
- border-left

以border-top为例，是border-top-width、 border-top-style、border-top-color的简写，**有顺序**

​	简写普遍特点:缺少值会自动插入默认值，注意样式覆盖

​	*常用于取代 hr 分割内容*

#### 内边距 padding

设置盒子边框和内容之间的间隙，在**盒子内**

简写属性，**有顺序**，**顺时针**，padding-top、padding-right、padding-bottom、padding-left

​	第一个值位置是top，取值简写方式如border-width

### 盒子尺寸问题

```
一开始设置的宽高，是内容区的宽高，不是元素盒子宽高

border和padding都会附加到content的初始宽高上，呈现为元素的最终宽高
width(宽度) + padding(内边距) + border(边框) = 元素实际宽度
height(高度) + padding(内边距) + border(边框) = 元素实际高度
```

#### 自动内减属性

```
box-sizing 定义如何计算一个元素的总宽度和总高度，主要设置是否需要加上内边距(padding)和边框等。
	可继承
```

```
content-box 是默认值。
	如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
	width = 内容的宽度
	height = 内容的高度
	width(宽度) + padding(内边距) + border(边框) = 元素实际宽度
	height(高度) + padding(内边距) + border(边框) = 元素实际高度
```

```
border-box告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的。
    也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，
    内容区的实际宽度是 width 减 去(border + padding) 的值。
    大多数情况下，这使得我们更容易地设定一个元素的宽高。
    	注：border-box 不包含 margin。
    width = border + padding + 内容的宽度
    height = border + padding + 内容的高度
    	注意：当内容区尺寸无法再缩减时，盒子依旧会扩展
```

#### 尺寸不会被撑大的情况

```
对于block，不设置width时，为默认值auto，方框将沿行向扩展，以填充其容器中的可用空间。在大多数情况下，盒子会变得与其容器一样宽，占据可用空间的 100%。
此时设置左右内边距，content的width因为是auto，所以会自动调整，适应父元素的宽度
```

#### padding的应用场景

```
应用场景：对于inline-block，因为限制宽度，当内容超出宽度时，会自动换行。
取消宽度设置，变为auto，宽度根据内容自动适应，设置左右内边距改变间距
```

### 外边距详解

```
作用
    设置盒子与盒子的间隙，不参与盒子宽高计算，仅仅是空白
取值
    可以取一到四个值，按照顺时针上右下左赋值，如果某一边没有，看对面
	和padding类似
单独设置单一方向上的外边距
    margin-方位词
```

#### 应用

```css
清除默认样式

/* Body自带8像素的外边距，在精准布局的时候，需要清除默认外边距的影响 */

ul {
    margin: 0;
    padding: 0;
    list-style: none;
    /* 必须要加上这个属性才能彻底去掉小圆点样式 */
}
```



### 外边距情况分析

#### 正常情况

水平排布的两个盒子，设置左边盒子的右外边距，设置右边盒子的左外边距，最终二者间隙为margin值的和

#### 合并情况

垂直排布的两个盒子，设置上边盒子的下外边距，设置下边盒子的上外边距，最终二者间隙为margin中的较大值

​	应用：垂直方向上的距离，只需设置其中一个元素的外边距即可

#### 塌陷情况

**现象**

​      	互相嵌套的**块级**元素，给子元素设置**margin-top**，导致父元素一起向下移动（塌陷）

**原因**

​		父子元素的**margin-top**值是紧贴一块的，给子元素设置margin-top，会作用在父元素上，导致二者一起塌陷

**解决方式**

​        给父子元素添加间隙，让他们的margin不紧贴在一块

​	***目前最佳方案***

​        给父元素添加**padding-top**，使其与子元素间隔一段距离，避免父子元素一起塌陷

​        为了防止内边距撑大盒子，使用**box-sizing: border-box;**

​	***其他方案***

​		border-top：0.1px solid #000; 

​		padding-top：0.1px; 

​		overflow：hidden;

​		display：inline-block;

​		float：left; 

##### margin-bottom的塌陷情况

互相嵌套的**块级**元素，父元素的**高度为auto**。当子元素和父元素的margin-bottom紧贴在一起，对子元素设置margin-bottom时，子元素的margin-bottom会穿透父元素的边框。

### 常见文档布局

#### 标准流

默认布局

**流式布局**

*块级元素*

​	从上往下，垂直排列，独占一行

*行级元素*

​	从左到右，水平排列，空间不够才换行

#### 浮动

可以让元素漂浮起来，实现块元素水平排布

​	早期：图文混排

​	现在：页面布局

```
float属性指定一个盒子（元素）是否应该浮动。


值		描述
left	元素向左浮动。
right	元素向右浮动。
none	默认值。元素不浮动，并会显示在其在文本中出现的位置。

```

```
浮动元素的特点
	1,浮动元素会脱标(脱离标准流),在标准流中不占位置,相当于从地面飘向了天空
	2,浮动元素比标准流级别高,可以覆盖标准流中的元素
	3,下一个浮动元素会在上一个浮动元素的基础上进行水平排布(实现了块元素水平排布)

浮动布局比行内块布局的好处
	行内块布局,如果元素有换行,就会产生间隙
	浮动布局,没有这个问题,浮动也是一个主流布局方式
```

```
使用浮动布局注意点
    需要给浮动元素所在父元素添加高度,如果不设置高度,它里面的子元素浮动之后,就会脱离标准流,无法撑开标准流父元素的高度
    profile 和 information 浮动之后,无法撑起标准流中container的高度,就会导致页面出现问题

目前的解决方案: 给container添加高度
```

