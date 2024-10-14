# canvas

## 使用canvas实现动画

浏览器的渲染原理:在每一个渲染关键帧中需要重新绘制canvas动画 还要清除上一帧绘制的内容

### requestAnimationFrame()

**`window.requestAnimationFrame()`** 方法会告诉浏览器你希望执行一个动画。它要求浏览器在下一次重绘之前，调用用户提供的回调函数。

> **备注：**若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用 `requestAnimationFrame()`。`requestAnimationFrame()` 是一次性的。

#### 语法

```js
requestAnimationFrame(callback)
```

### 示例

```js
const ctx = document.querySelector('#canvas').getContext('2d')
// 在每一个渲染关键帧中绘制canvas,并清除上一次绘制
let step = 1
let startX = 0
let startY = 100
const lineLength = 100
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(startX + lineLength, startY)
  ctx.stroke()
  startX = startX + step
  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
```

## 全局透明度

### globalAlpha

Canvas 2D API 的 **`CanvasRenderingContext2D.globalAlpha`** 属性指定将被绘制到 canvas 上的形状或图像的 alpha（透明度）值。

#### 值

一个在 0.0（完全透明）到 1.0（完全不透明）之间的数字，包括两者在内。默认值是 1.0。超出该范围的值，包括 Infinity 和 NaN，将不会被设置，并且 globalAlpha 将保留其先前的值。

### 示例

绘制一个光晕的效果 通过设置透明度来实现

```js
const ctx = document.querySelector('#canvas').getContext('2d')
ctx.globalAlpha = 0.2
ctx.fillStyle = 'lightblue'
for (let i = 0; i < 6; i++) {
  ctx.beginPath()
  ctx.arc(100, 100, 10 + 10 * i, 0, 2 * Math.PI)
  ctx.fill()
}
```

若要设置局部每个图像的透明度, 可以在设置fillstyle时使用rgba形式的值

```js
ctx.fillStyle = "rbga(255,0,0,0.2)";
```

## 线段样式

### lineWidth

Canvas 2D API 的 **`CanvasRenderingContext2D.lineWidth`** 属性用于设置线宽。

#### 值

一个数字，指定线条的宽度（以坐标空间单位表示）。零、负数、Infinity 和 NaN 值将被忽略。默认值为 1.0。

```js
ctx.beginPath()
ctx.lineWidth = 10
ctx.moveTo(0, 0)
ctx.lineTo(100, 0)
ctx.stroke()
```

### lineCap

Canvas 2D API 的 **`CanvasRenderingContext2D.lineCap`** 属性用于指定如何绘制每一条线段的末端。

#### 值

- "butt"
  线条末端呈正方形。这是默认值。

- "round"
  线条末端呈圆形的。
- "square"
  线条末端呈方形，通过添加一个宽度与线条粗细相同且高度是粗细的一半的盒子来形成。

```js
;['butt', 'round', 'square'].forEach((lineCap, i) => {
  ctx.lineWidth = 15
  ctx.lineCap = lineCap
  ctx.beginPath()
  ctx.moveTo(25 + i * 50, 40)
  ctx.lineTo(25 + i * 50, 140)
  ctx.stroke()
})
```

### lineJoin

Canvas 2D API 的 **`CanvasRenderingContext2D.lineJoin`** 属性用于设置 2 个线段如何连接在一起。

这个属性在两个连接的线段具有相同方向时没有效果，因为在这种情况下不会添加连接区域。长度为零的退化线段（即所有端点和控制点处于完全相同的位置）也会被忽略。

#### 值

- "round"
  通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。圆角的半径是线段的宽度。

- "bevel"
  在相连部分的末端填充一个额外的以三角形为底的区域，每个部分都有各自独立的矩形拐角。

- "miter"
  通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置受到 miterLimit 属性的影响。默认值。

```js
//路径拐点样式
;['round', 'bevel', 'miter'].forEach((join, i) => {
  ctx.lineJoin = join
  ctx.beginPath()
  ctx.moveTo(200, 45 + i * 40)
  ctx.lineTo(240, 90 + i * 40)
  ctx.lineTo(280, 45 + i * 40)
  ctx.lineTo(320, 90 + i * 40)
  ctx.lineTo(360, 45 + i * 40)
  ctx.stroke()
})
```

## 动态虚线框(蚂蚁线)

### setLineDash()

Canvas 2D API 的 CanvasRenderingContext2D 接口的 setLineDash() 方法用于在描线时使用虚线模式。它使用一组值来指定描述模式的线和间隙的交替长度。

#### 语法

```js
setLineDash(segments)
```

- segments

  一个数组，包含一组描述交替绘制线段和间隙（坐标空间单位）长度的数字。如果数组元素的数量是奇数，数组的元素会被复制和拼接。例如，[5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。如果数组为空，则虚线列表会被清空，线条描边将恢复为实线。

```js
// 虚线
ctx.beginPath();
ctx.setLineDash([5, 15]);//实线长度,空白长度
ctx.moveTo(0, 50);
ctx.lineTo(300, 50);
ctx.stroke();

// 实线
ctx.beginPath();
ctx.setLineDash([]);
ctx.moveTo(0, 100);
ctx.lineTo(300, 100);
ctx.stroke();
```

### lineDashOffset

Canvas 2D API 的 **`CanvasRenderingContext2D.lineDashOffset`** 属性用于设置虚线偏移量或者称为“相位”。

#### 值

一个浮点数，指定线条虚线的偏移量。默认值为 0.0。

```js
ctx.beginPath()
ctx.strokeStyle = 'red'
ctx.setLineDash([10, 2]) //实线长度,空白长度
ctx.lineDashOffset = 9 //虚线偏移量(逆时针偏移)
ctx.moveTo(50, 100)
ctx.lineTo(300, 100)
ctx.stroke()
```

### 蚂蚁线

```js
const ctx = document.querySelector('#canvas').getContext('2d')
// 实现蚂蚁线框
let offset = 0
const draw = () => {
  offset += 0.1
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.setLineDash([4, 2])
  ctx.lineDashOffset = -offset
  ctx.strokeRect(30, 30, 100, 100)
  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
```

## 渐变色

### createLinearGradient()

Canvas 2D API 的 **`CanvasRenderingContext2D.createLinearGradient()`** 方法根据两个给定的坐标值所构成的线段创建渐变。

该方法返回一个线性 CanvasGradient。想要将其应用于形状，需要首先把这个渐变赋值给属性 fillStyle 或者 strokeStyle。

> 备注：渐变坐标是全局的，即相对于当前的坐标空间。当应用于形状时，这些坐标并不是相对于形状本身的坐标。

#### 语法

```js
createLinearGradient(x0, y0, x1, y1)
```

createLinearGradient() 方法需要指定四个参数，分别表示渐变线段的起点和终点。

- x0
  起点的 x 轴坐标。

- y0
  起点的 y 轴坐标。
- x1
  终点的 x 轴坐标。

- y1
  终点的 y 轴坐标。

返回值: 一个根据指定线段初始化的线性 CanvasGradient。

### createRadialGradient()

Canvas 2D API 的 CanvasRenderingContext2D.createRadialGradient() 方法使用两个圆的坐标和大小绘制径向渐变。

这个方法返回 CanvasGradient。要将其应用于形状，必须首先将渐变赋值给 fillStyle 或 strokeStyle 属性。

> 备注：渐变坐标是全局的，即相对于当前的坐标空间。当应用于形状时，这些坐标并不是相对于形状本身的坐标。

#### 语法

```js
createRadialGradient(x0, y0, r0, x1, y1, r1)
```

createRadialGradient() 方法由六个参数指定，三个参数定义渐变的起始圆，另外三个参数定义渐变的结束圆。

- x0
  开始圆形的 x 轴坐标。

- y0
  开始圆形的 y 轴坐标。

- r0
  开始圆形的半径。必须为非负有限值。

- x1
  结束圆形的 x 轴坐标。

- y1
  结束圆形的 y 轴坐标。

- r1
  结束圆形的半径。必须为非负有限值。

返回值: 一个使用指定的两个圆初始化的径向 CanvasGradient。

### addColorStop()

CanvasGradient.addColorStop() 方法为给定的 canvas 渐变添加一个由偏移值（offset）和颜色值（color）指定的色标。

#### 语法

```js
addColorStop(offset, color)
```

- offset
  一个在 0 到 1 之间（包含边界）的数字，表示色标的位置。0 表示渐变的起始位置，1 表示渐变的结束位置。

- color
  一个 CSS `<color>` 值，表示色标的颜色。

### 示例

#### 线性渐变

填充范围最好和渐变范围保持一致

```js
const ctx = document.querySelector('#canvas').getContext('2d')

// 在矩形中填充一个渐变的颜色

const linearGradient = ctx.createLinearGradient(0, 0, 100, 100) //起点x,起点y,终点x,终点y
// 设置渐变的颜色
linearGradient.addColorStop(0, 'gold')
linearGradient.addColorStop(0.5, 'blue')
linearGradient.addColorStop(1, 'green')

ctx.fillStyle = linearGradient
ctx.fillRect(0, 0, 100, 100)
```

#### 径向渐变

```js
const ctx = document.querySelector('#canvas').getContext('2d')

// 在矩形中填充一个径向渐变的颜色

const radialGradient = ctx.createRadialGradient(0, 0, 20, 50, 50, 30)
// 设置渐变的颜色
radialGradient.addColorStop(0, 'gold')
radialGradient.addColorStop(0.5, 'blue')
radialGradient.addColorStop(1, 'green')

ctx.fillStyle = radialGradient
ctx.fillRect(0, 0, 100, 100)
```

## 图案

### createPattern()

Canvas 2D API 的 CanvasRenderingContext2D.createPattern() 方法用于使用指定的图像或重复创建图案。此方法返回一个 CanvasPattern 对象。

这个方法并不直接在画布上绘制任何内容。它所创建的图案必须赋值给 CanvasRenderingContext2D.fillStyle 或 CanvasRenderingContext2D.strokeStyle，之后才会应用于接下来的绘制操作。

#### 语法

```js
createPattern(image, repetition)
```

##### 取值

- image
  用作图案图像的图像。可以是下列之一：

  - HTMLImageElement（<img>）
  - SVGImageElement（<image>）
  - HTMLVideoElement（<video>，通过使用视频捕获）
  - HTMLCanvasElement（<canvas>）
  - ImageBitmap
  - OffscreenCanvas
  - VideoFrame
  - repetition

- 一个指示如何重复图案图像的字符串。可能的值包括：

  - "repeat"（两个方向都重复）
  - "repeat-x"（仅水平方向重复）
  - "repeat-y"（仅垂直方向重复）
  - "no-repeat"（两个方向都不重复）

  null 值与空字符串（""）的处理方式相同：两者都是 "repeat" 的同义词。

##### 返回值

CanvasPattern: 描述图案的不透明对象

如果 image 没有完全加载（即 HTMLImageElement.complete 是 false），则返回 null。

### HTMLImageElement

image对象

#### 构造器

##### Image()

创建一个image对象实例,  等同于 `document.createElement('img')`.实例不在dom树中

```js
new Image()
new Image(width)
new Image(width, height)
```

#### 属性

##### src

设置图像来源

#### 事件

##### load

获取图像是个耗时操作, 而load 事件会在图片加载完成后立即执行。

```js
addEventListener("load", (event) => {});

onload = (event) => {};
```

### 示例

```js
const ctx = document.querySelector('#canvas').getContext('2d')

const img = new Image()
img.src =
  'https://img0.baidu.com/it/u=4029422113,1235624534&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=450'
img.addEventListener('load', function () {
  // 向ctx中添加图案
  const pattern = ctx.createPattern(img, 'repeat')
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, 200, 110)
})
```

## 阴影

### shadowColor

Canvas 2D API 的 CanvasRenderingContext2D.shadowColor 属性用于描述阴影颜色。

请注意，在进行填充时，阴影的渲染不透明度会受到 fillStyle 颜色的不透明度的影响；或在进行描边时，受到 strokeStyle 颜色的不透明度的影响。

> 备注：只有当 shadowColor 属性设置为非透明值时，阴影才会被绘制。其中的 shadowBlur、shadowOffsetX 或 shadowOffsetY 属性中至少有一个必须是非零的。

#### 值

一个被解析为 CSS `<color>` 值的字符串。默认值是完全透明的黑色。

### shadowOffsetX

Canvas 2D API 的**CanvasRenderingContext2D.shadowOffsetX** 属性用于描述阴影水平偏移距离。

> 备注：只有当 shadowColor 属性设置为非透明值时，阴影才会被绘制。其中的 shadowBlur、shadowOffsetX 或 shadowOffsetY 属性中至少有一个必须是非零的。

#### 值

一个浮点数，指定阴影在水平方向上的偏移距离。正值向右偏移，负值向左偏移。默认值为 0（无水平偏移）。Infinity 和 NaN 值将被忽略。

### shadowOffsetY

Canvas 2D API 的 CanvasRenderingContext2D.shadowOffsetY 属性用于描述阴影垂直偏移距离。

> 备注：只有当 shadowColor 属性设置为非透明值时，阴影才会被绘制。其中的 shadowBlur、shadowOffsetX 或 shadowOffsetY 属性中至少有一个必须是非零的。
>

#### 值

一个浮点数，指定阴影在垂直方向上的偏移距离。正值向上偏移，负值向下偏移。默认值为 0（无垂直偏移）。Infinity 和 NaN 值将被忽略。

### shadowBlur

Canvas 2D API 的 CanvasRenderingContext2D.shadowBlur 属性用于描述模糊效果程度。默认值是 0（没有模糊）。

> 备注：只有当 shadowColor 属性设置为非透明值时，阴影才会被绘制。其中的 shadowBlur、shadowOffsetX 或 shadowOffsetY 属性中至少有一个必须是非零的。

#### 值

一个非负浮点数，指定阴影模糊的级别，其中 0 表示没有模糊，数字越大表示模糊程度越高。这个值不对应于像素数量，并且不受当前变换矩阵的影响。默认值为 0。负数、Infinity 和 NaN 将被忽略。

### 示例

```js
const ctx = document.querySelector('#canvas').getContext('2d')

// 可以通过一系列属性控制阴影
ctx.shadowColor = 'grey'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10
ctx.shadowBlur = 10

ctx.fillStyle = 'red'
ctx.fillRect(50, 50, 100, 100)
```

## 文本绘制

### fillText()

Canvas 2D API 的 CanvasRenderingContext2D 对象的方法 fillText() 用于在指定的坐标上绘制文本字符串，并使用当前的 fillStyle 对其进行填充。存在一个可选参数，其指定了渲染文本的最大宽度，用户代理将通过压缩文本或使用较小的字体大小来实现。

此方法会直接绘制到画布上，而不会修改当前路径，因此任何后续的 fill() 或 stroke() 调用都不会对其产生影响。

文本根据 font、textAlign、textBaseline 和 direction 属性所定义的字体和文本布局来渲染。

> 备注：如果需要绘制字符串中字符的轮廓，需要调用其上下文的 strokeText() 方法。

#### 语法

```
fillText(text, x, y)
fillText(text, x, y, maxWidth)
```

- text
  要作为渲染上下文的文本字符串。使用当前的 font、textAlign、textBaseline 和 direction 设置值对文本进行渲染。

- x
  开始绘制文本的点的 X 轴坐标，单位为像素。

- y
  开始绘制文本的基线的 Y 轴坐标，单位为像素。

- maxWidth 可选
  文本渲染后的最大像素宽度。如果未指定，则文本宽度没有限制。但是，如果提供了该值，用户代理将调整字距，选择水平方向更紧凑的字体（如果有这种字体或可以在不降低质量的情况下生成这种字体），或缩小字体大小，以便在指定宽度内容纳文本。

### strokeText()

Canvas 2D API 的 CanvasRenderingContext2D 的 strokeText() 方法用于在指定的坐标处对文本字符串的字符进行描边（即绘制轮廓）。一个可选的参数允许指定渲染文本的最大宽度，用户代理可以通过压缩文本或使用较小的字体大小来实现这一目标。

这个方法直接绘制到画布上，而不修改当前路径，因此任何后续的 fill() 或 stroke() 调用对它没有影响。

> 备注：使用 fillText() 方法来填充文本字符，而不是仅绘制它们的轮廓。

#### 语法

```js
strokeText(text, x, y)
strokeText(text, x, y, maxWidth)
```

- text
  一个字符串，指定要在上下文中渲染的文本字符串。文本根据 font、textAlign、textBaseline 和 direction 指定的设置进行渲染。

- x
  绘制文本的起始点的 x 轴坐标。

- y
  绘制文本的起始点的 y 轴坐标。

- maxWidth 可选
  渲染后文本的最大宽度。如果未指定，则文本的宽度没有限制。然而，如果提供了此值，用户代理将调整字距，选择水平方向更加紧凑的字体（如果有可用的或在不损失质量的情况下生成的字体），或者缩小到更小的字体大小，以使文本适应指定的宽度。

### font

Canvas 2D API 的 CanvasRenderingContext2D.font 属性指定绘制文字所使用的当前字体样式。使用和 CSS 字体描述符相同的字符串值。

#### 值

一个被解析为 CSS font 值的字符串。默认字体为 10 像素的无衬线体（sans-serif）。

### 示例

```js
const ctx = document.querySelector('#canvas').getContext('2d')

ctx.fillStyle = 'red'
ctx.font = '48px serif'
ctx.fillText('hello world', 100, 100)

ctx.strokeStyle = 'blue'
ctx.font = 'bold 48px serif'
ctx.strokeText('你好 世界', 100, 200)
```

## 变换

注意, 重复调用变换不会重置变换状态, 而是再上一次变换的基础上进行变换

### translate()

Canvas 2D API 的 **`CanvasRenderingContext2D.translate()`** 方法用于对当前网格添加平移变换。

#### 语法

```js
translate(x, y)
```

translate() 方法通过在网格上将画布和原点沿x轴方向移动 x 单位和y轴方向移动 y 单位，向当前矩阵添加一个平移变换。

- x
  在水平方向上移动的距离。正值向右移动，负值向左移动。

- y
  在垂直方向上移动的距离。正值向下移动，负值向上移动。

注意: 移动后再次调用translate(), 原点和方向以上一次变换后的为准, 而不是参照最初始状态

### rotate()

Canvas 2D API 的 **`CanvasRenderingContext2D.rotate()`** 方法用于在变换矩阵中增加旋转

#### 语法

```js
rotate(angle)
```

- angle

  顺时针旋转的弧度。如果你想通过角度值计算，可以使用公式： degree * Math.PI / 180 。

旋转中心点一直是 canvas 的原点。如果想改变中心点，你可以通过 translate() 方法移动画布。

### scale()

Canvas 2D API 的 CanvasRenderingContext2D.scale() 方法用于根据水平和垂直方向，为 canvas 单位添加缩放变换。

默认情况下，在 canvas 中一个单位实际上就是一个像素。例如，如果我们将 0.5 作为缩放因子，最终的单位会变成 0.5 像素，并且形状的尺寸会变成原来的一半。相似的方式，我们将 2.0 作为缩放因子，将会增大单位尺寸变成两个像素。形状的尺寸将会变成原来的两倍。

#### 语法

```
scale(x, y)
```

- x
  水平方向的缩放因子。负值会将像素沿垂直轴翻转。值为 1 表示没有水平缩放。
- y
  垂直方向的缩放因子。负值会将像素沿水平轴翻转。值为 1 表示没有垂直缩放。

#### 水平或垂直翻转

你可以使用 scale(-1, 1) 来将上下文水平翻转，使用 scale(1, -1) 来将其垂直翻转。在这个示例中，单词“Hello world!”被水平翻转。

请注意，调用 fillText() 方法时指定了一个负的 x 坐标。这是为了调整负的缩放因子：-280 * -1 变成了 280，并且文本从该点向左绘制。

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.scale(-1, 1);
ctx.font = "48px serif";
ctx.fillText("Hello world!", -280, 90);
// 将当前变换矩阵重置为单位矩阵
ctx.setTransform(1, 0, 0, 1, 0, 0);
```

### 示例

```js
const ctx = document.querySelector('#canvas').getContext('2d')

ctx.translate(100, 100) /* 改变坐标原点 */
ctx.rotate(-Math.PI / 2) /* 旋转坐标系,正值顺时针,负值逆时针 */
ctx.scale(0.5, 0.5) /* 缩放坐标系 */
ctx.moveTo(0, 0)
ctx.lineTo(100, 0)
ctx.stroke()

ctx.rotate(-Math.PI / 2)
ctx.moveTo(0, 0)
ctx.lineTo(100, 0)
ctx.stroke()
```

## 状态

### save()

Canvas 2D API 的 CanvasRenderingContext2D.save() 方法用于通过将当前状态放入栈中，以保存 canvas 的完整状态。

#### 绘制状态

保存到栈中的绘制状态有下面部分组成：

- 当前的变换矩阵。
- 当前的剪切区域。
- 当前的虚线列表。
- 以下属性当前的值：strokeStyle、fillStyle、globalAlpha、lineWidth、lineCap、lineJoin、miterLimit、lineDashOffset、shadowOffsetX、shadowOffsetY、shadowBlur、shadowColor、globalCompositeOperation、font、textAlign、textBaseline、direction、imageSmoothingEnabled。

#### 语法

```js
save()
```

### restore()

Canvas 2D API 的 CanvasRenderingContext2D.restore() 方法用于通过在绘制状态栈中弹出顶部的条目，将 canvas 恢复到最近的保存状态。如果没有保存状态，此方法不做任何改变。

#### 语法

```js
restore()
```

### 示例

此示例使用 save() 方法保存当前状态，并使用 restore() 进行恢复。所以，稍后你可以使用当前状态绘制一个矩形。

```js
const ctx = document.querySelector('#canvas').getContext('2d')

// 保存当前状态
ctx.save()
ctx.fillStyle = 'red'
ctx.fillRect(50, 50, 100, 100)
// 恢复到最近一次调用 save() 保存的状态
ctx.restore()

ctx.fillRect(150, 150, 100, 100)
```

save()和restore()应该成对出现, 这样在两者之间做的变换不会影响后续操作

```js
// 保存状态1
ctx.save()
 变换
 绘图
// 保存状态2
ctx.save()
变换
绘图
// 恢复状态2
ctx.restore()
// 恢复状态1
ctx.restore()
绘图
```

## 动态时钟

```js
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

const drawClock = () => {
  ctx.save()
  // 准备基本的预设
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.scale(0.4, 0.4)
  ctx.rotate(-Math.PI / 2)
  ctx.lineWidth = 8
  ctx.lineCap = 'round'
  // 绘制小时刻度线
  ctx.save() // 存储状态, 绘制完后取出状态, 不让绘制过程中的状态改变影响后续绘制
  for (let i = 0; i < 12; i++) {
    ctx.beginPath()
    ctx.moveTo(100, 0)
    ctx.lineTo(120, 0)
    ctx.stroke()
    ctx.rotate(Math.PI / 6)
  }
  ctx.restore()
  // 绘制分钟刻度线
  ctx.save()
  ctx.lineWidth = 5
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath()
      ctx.moveTo(115, 0)
      ctx.lineTo(120, 0)
      ctx.stroke()
    }
    ctx.rotate(Math.PI / 30)
  }
  ctx.restore()
  //绘制动态的三根针
  // 获取时分秒
  const time = new Date()
  const sec = time.getSeconds()
  const min = time.getMinutes()
  const hour = time.getHours() % 12
  // 绘制时针
  ctx.save()
  ctx.rotate((hour + min / 60 + sec / 60 / 60) * (Math.PI / 6))
  ctx.beginPath()
  ctx.lineWidth = 14
  ctx.moveTo(-20, 0)
  ctx.lineTo(80, 0)
  ctx.stroke()
  ctx.restore()
  // 绘制分针
  ctx.save()
  ctx.rotate((min + sec / 60) * (Math.PI / 30))
  ctx.beginPath()
  ctx.lineWidth = 10
  ctx.moveTo(-25, 0)
  ctx.lineTo(112, 0)
  ctx.stroke()
  ctx.restore()
  // 绘制秒针
  ctx.save()
  ctx.rotate(sec * (Math.PI / 30))
  ctx.beginPath()
  ctx.lineWidth = 8
  ctx.strokeStyle = 'red'
  ctx.moveTo(-30, 0)
  ctx.lineTo(84, 0)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, 10, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(92, 0, 10, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
  ctx.restore()
  requestAnimationFrame(drawClock)
}
requestAnimationFrame(drawClock)
```

# MySQL

## 关系型数据库的关系

- 一对一的关系

  两张表的记录是一一对应的, 其实这种关系时可以把两张表合并, 但这种情况相对少见

- 一对多的关系

  班级表和学生表 班级可以有多个学生, 一个学生只属于一个班级 利用外键实现绑定

- 多对多的关系

  学生表和老师表 学生可以有多个老师, 老师可以有多个学生 必需通过一个中间表来实现

数据表设置中 通常会将其中的一列设置为主键, 具有唯一性和不可更改性, 无业务含义

## 操作

### 插入记录

```mysql
insert into stu_table(stu_name, stu_gender, stu_class_id)
values ('大马哈', 0, 1);
```

### 修改记录

```mysql
update stu_table
set stu_class_id=2
where stu_name = '大马哈'
```

### 删除记录

```mysql
delete
from stu_table
```

