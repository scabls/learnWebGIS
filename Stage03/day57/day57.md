# canvas

## `<canvas>`

`<canvas>` 元素可被用来通过 JavaScript（[Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) API 或 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) API）绘制图形及图形动画。

### 属性

- height
  该元素占用空间的高度，以 CSS 像素（px）表示，默认为 150。
- width
  该元素占用空间的宽度，以 CSS 像素（px）表示，默认为 300。

### 注意事项

#### 标签需要闭合

不同于 `<img>` 元素，` <canvas>`元素需要有闭合标签 (`</canvas>`).

#### 设置画布 (canvas) 的大小

直接在 html 标签中设置 width 和 height 属性或者使用 JavaScript 来指定画布尺寸，这将改变一个画布的水平像素和垂直像素数，就像定义了一张图片的大小一样。

可以使用 CSS 的 width 和 height 以在渲染期间缩放图像以适应样式大小，就像`<img>`元素一样。如果你发现`<canvas>`元素中展示的内容变形，你可以通过`<canvas>`自带的 height 和 width 属性进行相关设置，而不要使用 CSS。

> canvas的宽高属性设置了画布的实际像素尺寸
>
> css设置style的宽高, 是设置渲染出的尺寸

### 使用示例

```html
<canvas id="canvas" width="500" height="300"></canvas>
```

```js
// 1.拿到画布dom
const canvas = document.querySelector('#canvas')
// 2. 拿到canvas的上下文
const ctx = canvas.getContext('2d')
// 3.绘制一个亮蓝色矩形
ctx.fillStyle = 'lightblue'
ctx.fillRect(50, 20, 100, 100)
```

## 可替换元素

在 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 中，**可替换元素**（**replaced element**）的展现效果不是由 CSS 来控制的。这些元素是一种外部对象，它们外观的渲染，是独立于 CSS 的。

简单来说，它们的内容不受当前文档的样式的影响。CSS 可以影响可替换元素的位置，但不会影响到可替换元素自身的内容。某些可替换元素，例如 [`iframe`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 元素，可能具有自己的样式表，但它们不会继承父文档的样式。

CSS 能对可替换元素产生的唯一影响在于，部分属性支持控制元素内容在其框中的位置或定位方式。

### 可替换元素

典型的可替换元素:

```html
<iframe>
<video>
<embed>
<img>
```

有些元素仅在特定情况下被作为可替换元素处理，例如：

```html
<option>
<audio>
<canvas>
<object>
```

HTML 规范也说了` <input>` 元素可替换，因为 "image" 类型的` <input>` 元素就像 `<img>` 一样被替换。但是其他形式的控制元素，包括其他类型的 `<input>` 元素，被明确地列为非可替换元素（non-replaced element）。该规范用术语小挂件（Widget）来描述它们默认的限定平台的渲染行为。

用 CSS content 属性插入的对象是匿名的可替换元素。它们并不存在于 HTML 标记中，因此是“匿名的”。

### CSS 与可替换元素

CSS 在某些情况下会对可替换元素做一些特殊处理，比如计算外边距（margin）和一些 auto 的具体值。

需要注意的是，一部分（并非全部）可替换元素，其本身具有的尺寸和基线（baseline）会被一些 CSS 属性（例如 vertical-align）加入计算之中。只有可替换元素才能具有这种自带值。

#### 控制内容框中的对象位置

某些 CSS 属性可用于指定可替换元素中包含的内容对象在该元素的盒区域内的位置或定位方式。这些属性的具体定义可以在 CSS3 Images 规范中找到：

- object-fit
  指定可替换元素的内容对象在元素盒区域中的填充方式。（有些类似于 background-size ）
- object-position
  指定可替换元素的内容对象在元素盒区域中的位置。（类似于 background-position ）

## Canvas API

### HTMLCanvasElement

通过HTMLCanvasElement.getContext()方法返回canvas 的上下文，如果上下文没有定义则返回 null .

当参数为`'2d'`时,建立一个 CanvasRenderingContext2D 二维渲染上下文。

#### 实例属性

##### width

HTMLCanvasElement.width 属性是一个对应` <canvas>` 元素 CSS 像素 width 的正整数。当这个属性没有指定时，或者被赋予一个不合法的值，比如一个负值，默认使用 300.

这是其中之一，另一个是 HTMLCanvasElement.height, 它们控制了 canvas 的大小尺寸。

##### height

HTMLCanvasElement.height 属性是一个正整数 ，使用了`<canvas>` 元素的 HTML 属性height来反映该元素高度的 CSS 像素值。当该属性没有被定义，或被定义为一个无效值（如负值）时，将使用150作为它的默认值。

控制 canvas 元素大小的属性有两个，这是其中一个，还有一个是HTMLCanvasElement.width。

#### 实例方法

##### getContext()

HTMLCanvasElement.getContext() 方法返回canvas 的上下文，如果上下文没有定义则返回 null .

在同一个 canvas 上以相同的 contextType 多次调用此方法只会返回同一个上下文。

###### 语法

```
getContext(contextType)
getContext(contextType, contextAttributes)
```

contextType参数是一个指示使用何种上下文的 DOMString, 为`'2d'`时,建立一个 CanvasRenderingContext2D 二维渲染上下文。

```js
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
```

### CanvasRenderingContext2D

#### 实例属性

##### fillStyle

指定用于形状内部的颜色、渐变或图案。默认样式为 #000（黑色）。

值可以是以下之一：

- 作为 CSS `<color>` 值解析的字符串。
- CanvasGradient 对象（线性或径向渐变）。
- CanvasPattern 对象（重复的图像）。

```js
ctx.fillStyle = 'lightblue'
ctx.fillRect(50, 20, 100, 100)
```

注意: 样式要在绘制之前设置

##### strokeStyle

指定用于形状描边（轮廓）的颜色、渐变或图案。默认值是 #000（黑色）。

值可以是以下之一：

- color
  解析为 CSS `<color>` 值的字符串。
- gradient
  CanvasGradient 对象（线性或径向渐变）。

- pattern
  CanvasPattern 对象（重复图像）。

```js
ctx.strokeStyle = 'green'
ctx.strokeRect(50, 20, 100, 100)
```

注意: 样式要在绘制之前设置

##### lineWidth

用于设置线宽

> 线可以通过 stroke()、strokeRect() 和 strokeText() 方法绘制。

值时一个数字，指定线条的宽度（以坐标空间单位表示）。零、负数、Infinity 和 NaN 值将被忽略。默认值为 1.0。

```js
ctx.strokeStyle = 'green'
ctx.lineWidth = 5
ctx.strokeRect(50, 20, 100, 100)
```

注意: 样式要在绘制之前设置

#### 实例方法

##### fillRect()

用于绘制一个矩形，并根据当前的 fillStyle 进行填充。

这个方法是直接在画布上绘制填充，并不修改当前路径，所以在这个方法后面调用 fill() 或者 stroke() 方法并不会对这个方法有什么影响。

###### 语法

```js
fillRect(x, y, width, height)
```

fillRect() 方法绘制一个填充了内容的矩形，这个矩形的开始点（左上点）在 (x, y) ，它的宽度和高度分别由 width 和 height 确定，填充样式由当前的 fillStyle 决定。

- x
  矩形起始点的 x 轴坐标。

- y
  矩形起始点的 y 轴坐标。
- width
  矩形的宽度。正值向右延伸，负值向左延伸。

- height
  矩形的高度。正值向下延伸，负值向上延伸。

无返回值(undefined)

```js
ctx.fillStyle = 'lightblue'
ctx.fillRect(50, 20, 100, 100)
```

##### strokeRect()

根据当前的 strokeStyle 和其它设置描绘一个矩形的描边（轮廓）。

此方法直接绘制到画布而不修改当前路径，因此任何后续 fill() 或 stroke() 调用对它没有影响。

###### 语法

```js
strokeRect(x, y, width, height)
```

strokeRect() 方法绘制一个描边矩形，其起点为 (x, y)，其大小由 width 和 height 指定。

- x
  矩形起点的 x 轴坐标。

- y
  矩形起点的 y 轴坐标。

- width
  矩形的宽度。正值在右侧，负值在左侧。

- height
  矩形的高度。正值在下，负值在上。

无返回值(undefined)

```js
ctx.strokeStyle = 'green'
ctx.lineWidth = 5
ctx.strokeRect(50, 20, 100, 100)
```

##### clearRect()

通过把像素设置为透明黑色以达到擦除一个矩形区域的目的。

> 如果没有正确使用路径，clearRect() 可能会导致意想之外的结果。请确保在调用 clearRect() 之后开始绘制新内容前调用 beginPath() 。

###### 语法

```js
clearRect(x, y, width, height)
```

clearRect() 方法在一个矩形区域内将所有像素都设置成透明黑色（rgba(0,0,0,0)）。矩形区域的左上角在 (x, y)，其大小由 width 和height 指定。

- x
  矩形起点的 x 轴坐标。
- y
  矩形起点的 y 轴坐标。

- width
  矩形的宽度。正值向右，负值向左。

- height
  矩形的高度。正值向下，负值向上。

无返回值(undefined)

```js
const button = document.querySelector('button')
button.addEventListener('click', function () {
  ctx.clearRect(0, 0, 1000, 600) //(起始x,起始y,宽,高)
})
```

##### beginPath()

用于通过清空子路径列表开始一个新路径。当你想创建一个新的路径时，调用此方法。

> 要创建一个新的子路径，即与当前画布状态匹配的路径，可以使用 CanvasRenderingContext2D.moveTo()。

无参数, 无返回值

##### moveTo()

用于在给定的 (x，y) 坐标处开始一个新的子路径。

###### 语法

```js
moveTo(x, y)
```

- x
  点的 x 轴（横）坐标。
- y
  点的 y 轴（纵）坐标。

无返回值(undefined)

##### lineTo()

将当前子路径的最后一个点与指定的 (x, y) 坐标用直线段相连，从而将一个直线段添加到当前子路径中。

和其他修改当前路径的方法一样，这个方法并不直接渲染任何内容。要将路径绘制到画布上，你可以使用 fill() 或 stroke() 方法。

###### 语法

```js
lineTo(x, y)
```

- x
  直线终点的 x 轴坐标。

- y
  直线终点的 y 轴坐标。

无返回值(undefined)

##### closePath()

从当前点添加一条直线到当前子路径的起点。如果形状已经闭合或只有一个点，此函数将不执行任何操作。

该方法并不直接在画布上绘制任何内容。你可以使用 stroke() 或 fill() 方法来渲染路径。

无参数, 无返回值

##### stroke()

根据当前的描边样式，绘制当前或指定的路径。

描边与路径的中心对齐，也就是说，描边的一半位于路径的内侧，另一半位于外侧。

描边使用非零环绕规则进行绘制，这意味着路径交叉点仍会被填充。

###### 语法

```js
stroke()
stroke(path)
```

path: 要描边的 Path2D 路径。

无返回值

##### fill()

用于根据当前的 fillStyle，填充当前或给定的路径。

###### 语法

```js
fill()
fill(path)
fill(fillRule)
fill(path, fillRule)
```

无返回值

##### arc()

将一个圆弧添加到当前子路径中。

语法

```js
arc(x, y, radius, startAngle, endAngle)
arc(x, y, radius, startAngle, endAngle, counterclockwise)
```

`arc()` 方法创建一个以坐标 `(x, y)` 为中心，以 `radius` 为半径的圆弧。路径从 `startAngle` 开始，到 `endAngle` 结束，路径方向由 `counterclockwise` 参数决定（默认为顺时针方向）。

- x
  圆弧中心（圆心）的 x 轴坐标。
- y
  圆弧中心（圆心）的 y 轴坐标。

- radius
  圆弧的半径。必须为正值。

- startAngle
  圆弧的起始点，从 x 轴方向开始计算，以弧度为单位。

- endAngle
  圆弧的终点，从 x 轴方向开始计算，以弧度为单位。

- counterclockwise 可选
  可选的布尔值，如果为 true，逆时针绘制圆弧，反之，顺时针绘制。默认为 false（顺时针）。

##### quadraticCurveTo()

用于新增二次贝塞尔曲线路径。它需要 2 个点。第一个点是控制点，第二个点是终点。起始点是当前路径最新的点——在创建二次贝赛尔曲线之前，可以使用 moveTo() 方法进行改变。

###### 语法

```js
quadraticCurveTo(cpx, cpy, x, y)
```

- cpx
  控制点的 x 轴坐标。
- cpy
  控制点的 y 轴坐标。

- x
  终点的 x 轴坐标。

- y
  终点的 y 轴坐标。

```js
ctx.beginPath()
ctx.moveTo(100, 100)
ctx.quadraticCurveTo(120, 160, 200, 200)
ctx.stroke()
```

#### 示例

##### 绘制填充矩形

```js
ctx.fillStyle = 'lightblue'
ctx.fillRect(50, 20, 100, 100)
```

##### 绘制描边矩形

```js
ctx.strokeStyle = 'green'
ctx.lineWidth = 5
ctx.strokeRect(50, 20, 100, 100)
```

##### 清除画布

```js
const button = document.querySelector('button')
button.addEventListener('click', function () {
  ctx.clearRect(0, 0, 1000, 600) //(起始x,起始y,宽,高)
})
```

##### 直线路径绘制矩形并描边填充

```js
// 落笔
ctx.beginPath()
// 确认开始绘图的位置
ctx.moveTo(100, 30)
// 移动画笔
ctx.lineTo(200, 30)
ctx.lineTo(200, 130)
ctx.lineTo(100, 130)
ctx.closePath()
// 加上描边(渲染路径)
ctx.stroke()
// 填充
ctx.fillStyle = 'lightblue'
ctx.fill()
```

##### 绘制半圆

```js
// 3. 绘制圆弧路径
ctx.beginPath()
ctx.arc(100, 160, 50, 0, Math.PI, true)
ctx.closePath()

ctx.stroke()
ctx.fillStyle = 'lightblue'
ctx.fill()
```

# css

## clip-path

clip-path CSS 属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。

可以利用这个css属性绘制各自形状

```css
div {
    width: 200px;
    height: 200px;
    background-color: lightblue;
    /* 使用剪切路径绘制形状为三角形 */
    clip-path: polygon(50% 0%, 50% 100%, 100% 50%);
}
```

辅助网站:[CSS3剪贴路径（Clip-path）在线生成器工具 - 代码工具 - 脚本之家在线工具 (jb51.net)](https://tools.jb51.net/code/css3path)

# mysql

mysql是最流行的关系型数据库(存放的是多个表 非常类似与excel表格 有的表之前可能存在关系 所以叫关系型数据库)
数据库软件=>管理本机的数据库=>创建自己的数据库=>创建表=>创建记录

若要在任意终端通过mysql命令访问mysql,需要设置环境变量

## 相关命令

##### 查看版本

```
mysql --version
```

##### 连接mysql

```bash
mysql -u -root -p
```

##### 查看数据库列表

```mysql
show databases;
```

> 注意, mysql的命令, 语句末尾要加分号

##### 创建数据库

```mysql
create database xxx;
```

##### 使用指定数据库

```mysql
use xxx;
```

##### 查看表格

```mysql
show tables;
```

##### 删除数据库

```mysql
drop database xxx;
```

##### 创建表

> 每个表至少含有一个列
>
> 列要用括号扩起

```mysql
create table teacher_table
(
    teacher_name varchar(100) not null  comment '老师姓名'
);
```

若初始设置多个列,用逗号隔开

```mysql
create table teacher_table
(
    teacher_name varchar(100) not null  comment '老师姓名',
    teacher_gender int not null  comment '老师性别'
);
```

##### 创建列

```mysql
alter table stu_table 
	add column stu_gender int not null comment '学生性别';
```

> colum可以省略

##### 重命名列

```mysql
alter table stu_table
    change stu_gender stu_sex int not null comment '学生性别';
```

##### 删除列

```mysql
alter table stu_table
    drop column stu_birthday;
```

##### 删除表

```mysql
drop table teacher_table;
```

## 数据类型

mysql中数据类型可以分为 以下几类:

1. 整型 int
2. 浮点型 
   - float 
   - decimal(m,n)  m:数字位数,n:小数位数
3. 字符串类型
   -  varchar(n) 不定长字符串 :小于等于n
   - char(n) 定长字符串
4. 日期
   - (年月日)date 
   - 时间(日分秒)time 
   - datetime