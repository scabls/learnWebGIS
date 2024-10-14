# canvas

## 像素操作

### drawImage()

Canvas 2D API 的 **`CanvasRenderingContext2D.drawImage()`** 方法提供了多种在画布（Canvas）上绘制图像的方式。

#### 语法

```js
drawImage(image, dx, dy)
drawImage(image, dx, dy, dWidth, dHeight)
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```

![drawImage](day59.assets/canvas_drawimage.jpg)

- image
  绘制到上下文的元素。允许任何的画布图像源，例如：HTMLImageElement、SVGImageElement、HTMLVideoElement、HTMLCanvasElement、ImageBitmap、OffscreenCanvas 或 VideoFrame。
- sx 可选
  需要绘制到目标上下文中的，源 image 的子矩形（裁剪）的左上角 X 轴坐标。可以使用 3 参数或 5 参数语法来省略这个参数。
- sy 可选
  需要绘制到目标上下文中的，源 image 的子矩形（裁剪）的左上角 Y 轴坐标。可以使用 3 参数或 5 参数语法来省略这个参数。

- sWidth 可选
  需要绘制到目标上下文中的，源 image 的子矩形（裁剪）的宽度。如果不指定，整个矩形（裁剪）从坐标的 sx 和 sy 开始，到 image 的右下角结束。可以使用 3 参数或 5 参数语法来省略这个参数。使用负值将翻转这个图像。

- sHeight 可选
  需要绘制到目标上下文中的，image的矩形（裁剪）选择框的高度。可以使用 3 参数或 5 参数语法来省略这个参数。使用负值将翻转这个图像。

- dx
  源 image 的左上角在目标画布上 X 轴坐标。

- dy
  源 image 的左上角在目标画布上 Y 轴坐标。

- dWidth
  image 在目标画布上绘制的宽度。允许对绘制的图像进行缩放。如果不指定，在绘制时 image 宽度不会缩放。注意，这个参数不包含在 3 参数语法中。

- dHeight
  image 在目标画布上绘制的高度。允许对绘制的图像进行缩放。如果不指定，在绘制时 image 高度不会缩放。注意，这个参数不包含在 3 参数语法中。

#### 理解源元素大小

drawImage() 方法在绘制时使用源元素的以 CSS 像素为单位的固有尺寸。

例如，如果加载图像（Image）并在其构造函数中指定可选的大小参数，则必须使用所创建实例的 naturalWidth 和 naturalHeight 属性来正确计算裁剪和缩放区域等内容，而不是 element.width 和 element.height。如果元素是 `<video>` 元素，则 videoWidth 和 videoHeight 也是如此，依此类推。

#### 示例

实现css的 object-fit: cover 效果

```js
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

const img = new Image()
img.src = './nanoha.png'

let ImageData

img.addEventListener('load', function () {
  const imgRatio = img.naturalWidth / img.naturalHeight
  const canvasRatio = canvas.width / canvas.height
  let sx, sy, sWidth, sHeight
  // 计算裁剪的起始位置和尺寸
  // 实现css的 object-fit: cover 效果
  if (imgRatio > canvasRatio) {
    sHeight = img.naturalHeight
    sWidth = sHeight * canvasRatio
    sx = (img.naturalWidth - sWidth) / 2
    sy = 0
  } else {
    sWidth = img.naturalWidth
    sHeight = sWidth / canvasRatio
    sx = 0
    sy = (img.naturalHeight - sHeight) / 2
  }
  // 通过canvas绘制图片
  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height)
})
```

### getImageData() 

Canvas 2D API 的 CanvasRenderingContext2D.getImageData() 返回一个 ImageData 对象，用于描述 canvas 指定区域的隐含像素数据。

这个方法不受画布的变换矩阵影响。如果指定的矩形超出画布的边界，返回的 ImageData 对象中超出画布边界的像素将是透明黑色。

> 可以使用 putImageData() 方法将图像数据绘制到画布上。

#### 语法

```js
getImageData(sx, sy, sw, sh)
getImageData(sx, sy, sw, sh, settings)
```

##### 参数

- sx
  要提取 ImageData 的矩形左上角的 x 轴坐标。
- sy
  要提取 ImageData 的矩形左上角的 y 轴坐标。

- sw
  要提取 ImageData 的矩形的宽度。正值向右延伸，负值向左延伸。

- sh
  要提取 ImageData 的矩形的高度。正值向下延伸，负值向上延伸。

- settings 可选
  一个具有以下属性的对象：
  - colorSpace：指定图像数据的颜色空间。可以设置为 "srgb" 表示 sRGB 色彩空间，或 "display-p3" 表示 display-p3 色彩空间。

##### 返回值

包含指定矩形的画布图像数据的 ImageData 对象。

### ImageData

ImageData 接口描述 `<canvas>` 元素的一个隐含像素数据的区域。使用 ImageData() 构造函数创建或者使用和 canvas 在一起的 CanvasRenderingContext2D 对象的创建方法： createImageData() 和 getImageData()。也可以使用 putImageData() 设置 canvas 的一部分。

#### 属性

- ImageData.data 只读
  Uint8ClampedArray 描述了一个一维数组，包含以 RGBA 顺序的数据，数据使用 0 至 255（包含）的整数表示。
- ImageData.height 只读
  无符号长整型（unsigned long），使用像素描述 ImageData 的实际高度。

- ImageData.width 只读
  无符号长整型（unsigned long），使用像素描述 ImageData 的实际宽度。

### putImageData()

Canvas 2D API 的 CanvasRenderingContext2D.putImageData() 方法用于将数据从已有的 ImageData 对象绘制到画布上。如果提供了一个被污染的矩形，则只绘制该矩形的像素。此方法不受画布变换矩阵的影响。

> 备注：可以使用 getImageData() 方法从画布中获取图像数据

#### 语法

```js
putImageData(imageData, dx, dy)
putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
```

- imageData
  一个 ImageData 对象，包含像素值数组。

- dx
  目标画布中放置图像数据的水平位置（x 坐标）。

- dy
  目标画布中放置图像数据的垂直位置（y 坐标）。

- dirtyX 可选
  提取图像数据的左上角的水平位置（x 坐标）。默认为 0。

- dirtyY 可选
  提取图像数据的左上角的垂直位置（y 坐标）。默认为 0。

- dirtyWidth 可选
  要绘制的矩形的宽度。默认为图像数据的宽度。

- dirtyHeight 可选
  要绘制的矩形的高度。默认为图像数据的高度。

### 示例

复制canvas图像

```js
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = canvas.offsetWidth //500
canvas.height = canvas.offsetHeight //300

const canvas2 = document.querySelector('#canvas2')
const ctx2 = canvas2.getContext('2d')
canvas2.width = canvas2.offsetWidth
canvas2.height = canvas2.offsetHeight

const btn = document.querySelector('#copyBtn')

const img = new Image()
img.src = './nanoha.png'

let ImageData

img.addEventListener('load', function () {
  const imgRatio = img.naturalWidth / img.naturalHeight
  const canvasRatio = canvas.width / canvas.height
  let sx, sy, sWidth, sHeight
  // 计算裁剪的起始位置和尺寸
  // 实现css的 object-fit: cover 效果
  if (imgRatio > canvasRatio) {
    sHeight = img.naturalHeight
    sWidth = sHeight * canvasRatio
    sx = (img.naturalWidth - sWidth) / 2
    sy = 0
  } else {
    sWidth = img.naturalWidth
    sHeight = sWidth / canvasRatio
    sx = 0
    sy = (img.naturalHeight - sHeight) / 2
  }
  // 通过canvas绘制图片
  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height)
  // 获取canvas的像素信息
  ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  console.log('🚀 ~ ImageData:', ImageData)
  // 60000条,每四条对应一个像素的rgba
})

btn.addEventListener('click', function () {
  ctx2.putImageData(ImageData, 0, 0)
})
```

## 马赛克效果

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite App</title>
  <style>
    #img,
    #canvas2 {
      width: 500px;
      height: 300px;
    }
    #img {
      object-fit: cover;
    }
  </style>
</head>
<body>
  <div id="app">
    <img src="nanoha.png" id="img" />
    <button id="copyBtn">click</button>
    <canvas id="canvas2"></canvas>
  </div>
  <script type="module" src="/main.js"></script>
</body>
```

因为img的样式是cover, 所以在canvas中也要和模仿出cover效果

```js
const canvas2 = document.querySelector('#canvas2')
canvas2.width = canvas2.offsetWidth
canvas2.height = canvas2.offsetHeight
const ctx2 = canvas2.getContext('2d')

const btn = document.querySelector('#copyBtn')
const img = document.querySelector('#img')

btn.addEventListener('click', function () {
  drawMosaic(img)
})

const drawMosaic = img => {
  const canvas = document.createElement('canvas')
  const { width, height, naturalWidth, naturalHeight } = img
  canvas.width = width
  canvas.height = height
  const imgRatio = naturalWidth / naturalHeight
  const canvasRatio = width / height
  let sx, sy, sWidth, sHeight
  if (imgRatio > canvasRatio) {
    sHeight = naturalHeight
    sWidth = sHeight * canvasRatio
    sx = (naturalWidth - sWidth) / 2
    sy = 0
  } else {
    sWidth = naturalWidth
    sHeight = sWidth / canvasRatio
    sx = 0
    sy = (naturalHeight - sHeight) / 2
  }
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height)
  const imageData = ctx.getImageData(0, 0, width, height)
  createMosaic(ctx2, imageData)
}
const createMosaic = (ctx, imageData) => {
  const { width, height, data } = imageData
  const blockSize = 20
  for (let i = 0; i < width; i += blockSize) {
    for (let j = 0; j < height; j += blockSize) {
      const index = (i + j * width) * 4
      // 当前每个block的第一个索引值就是index [index,index+1,index+2,indx+3]
      const [r, g, b, a] = [
        data[index],
        data[index + 1],
        data[index + 2],
        data[index + 3] / 255 /* 注意a的格式差别 */,
      ]
      // 将当前block内的像素信息都填充为rgba的值
      ctx.fillStyle = `rgba(${r},${g},${b},${a})`
      ctx.fillRect(i, j, blockSize, blockSize)
    }
  }
}
```

要正确理解循环时如何选取的index

> 当代码难以理解时, 去以数学的角度思考, 再尝试将数学转换为编程

## 满天星

```html
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #canvas {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(26, 57, 119);
  }
</style>
</head>
<body>
  <div id="app">
    <canvas id="canvas"></canvas>
  </div>
  <script type="module" src="/main.js"></script>
</body>
```

使用面向对象编程的思维

小球移动的处理

- 时间戳
- 速度
- 边界处理
- 连线

```js
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

class Point {
  constructor(radius = 10, color = 'white') {
    this.radius = radius
    this.color = color
    // 随机设置点的初始位置
    this.x = getRandom(radius, canvas.width - radius)
    this.y = getRandom(radius, canvas.height - radius)
  }

  // 设置每个点的移动速度
  xSpeed = getRandom(-100, 100)
  ySpeed = getRandom(-100, 100)
  // 保存绘制时的时间戳
  drawTime = null

  draw = () => {
    // 要让绘制的点移动起来, 根据存放的xspeed和yspeed来计算在x轴和y轴的移动距离 从而重新计算点的坐标
    if (this.drawTime) {
      // 此时说明已经绘制过点了, 要计算间隔的时间
      const duration = (Date.now() - this.drawTime) / 1000
      // 根据时间差来计算移动的距离
      const distanceX = this.xSpeed * duration
      const distanceY = this.ySpeed * duration
      // 根据移动的距离重新计算点的坐标
      this.x += distanceX
      this.y += distanceY
      // 当碰撞到边界的时候, 反弹
      // 左边
      if (this.x < this.radius) {
        this.x = this.radius
        this.xSpeed = -this.xSpeed
      }
      // 右边
      if (this.x > canvas.width - this.radius) {
        this.x = canvas.width - this.radius
        this.xSpeed = -this.xSpeed
      }
      // 上边
      if (this.y < this.radius) {
        this.y = this.radius
        this.ySpeed = -this.ySpeed
      }
      // 下边
      if (this.y > canvas.height - this.radius) {
        this.y = canvas.height - this.radius
        this.ySpeed = -this.ySpeed
      }
    }
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    // 保存当前的时间戳
    this.drawTime = Date.now()
  }
}

class View {
  constructor(points = 20, maxDistance = 500) {
    this.points = points
    this.maxDistance = maxDistance
    // 初始化整个视图的时候,要创建数组来存放所有的点
    this.pointsArray = new Array(points).fill().map(() => new Point(10))
  }

  draw = () => {
    // 先清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 遍历所有的点,调用draw方法绘制
    this.pointsArray.forEach((point, index) => {
      point.draw()
      // 判断点之间的距离 如果小于限制,则连接起来
      this.pointsArray.forEach((otherPoint, otherIndex) => {
        if (otherIndex <= index) return
        const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y)
        if (distance >= this.maxDistance) return
        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(otherPoint.x, otherPoint.y)
        // 根据距离设置连线的颜色透明度
        ctx.strokeStyle = `rgba(255,255,255,${1 - distance / this.maxDistance})`
        ctx.stroke()
      })
    })
    requestAnimationFrame(this.draw)
  }
}

const view = new View()
requestAnimationFrame(view.draw)
```

### 类

```js
class MyClass {
  // 构造函数
  constructor() {
    // 构造函数体
  }
  // 实例字段
  myField = "foo";
  // 实例方法
  myMethod() {
    // myMethod 体
  }
  // 静态字段
  static myStaticField = "bar";
  // 静态方法
  static myStaticMethod() {
    // myStaticMethod 体
  }
  // 静态块
  static {
    // 静态初始化代码
  }
  // 字段、方法、静态字段、静态方法、静态块都可以使用私有形式
  #myPrivateField = "bar";
}
```

#### 构造函数

类最重要的工作之一就是作为对象的“工厂”。例如，当我们使用 Date 构造函数时，我们期望它给我们一个新的对象，这个对象代表了我们传入的日期数据，而且我们可以使用该实例所暴露的其他方法来操作它。在类中，实例的创建是通过**构造函数**来完成的。

```js
class MyClass {
  // 构造函数
  constructor() {
    // 构造函数体
  }
}
```

每一次调用 new 都将创建一个新的实例。

在类的构造函数里，this 的值指向新创建的实例。你可以赋予它新的属性，或者读取已有的属性。

this 的值将自动作为 new 的结果返回。不建议从构造函数中返回任何值——因为如果你返回一个非原始类型的值，它将成为 new 表达式的值，而 this 的值将被丢弃。

#### 公共字段

公共字段使得实例可以获得属性，且它们常常独立于构造函数的参数。(即实例属性的值不依赖构造函数的参数)

```js
class MyClass {
  luckyNumber = Math.random();
}
console.log(new MyClass().luckyNumber); // 0.5
console.log(new MyClass().luckyNumber); // 0.3
```

公共字段几乎等价于将一个属性赋值给 `this`。例如，上面的例子也可以转换为：

```js
class MyClass {
  constructor() {
    this.luckyNumber = Math.random();
  }
}
```

不要在公共字段中使用this访问实例属性, 因为公共实例字段会在基类的构造时（**构造函数主体运行之前**）或子类的 `super()` 返回后添加到实例中。当公共字段求值时, 实例还未创建。

若属性求值需要依赖this访问其他属性, 或者可以直接使用构造函数的参数, 则可以将属性定义在构造函数中。(注意格式)

### 数组

#### Array() 构造函数

Array() 构造函数用于创建 Array 对象。

##### 语法

```js
new Array()
new Array(element0)
new Array(element0, element1)
new Array(element0, element1, /* … ,*/ elementN)
new Array(arrayLength)

Array()
Array(element0)
Array(element0, element1)
Array(element0, element1, /* … ,*/ elementN)
Array(arrayLength)
```

> 备注：调用 Array() 时可以使用或不使用 new。两者都会创建一个新的 Array 实例。

- elementN
  Array 构造函数会根据给定的元素创建一个 JavaScript 数组，但是当仅有一个参数且为数字时除外（详见下面的 arrayLength 参数）。注意，后者仅适用于用 Array 构造函数创建数组，而不适用于用方括号创建的数组字面量。

- arrayLength
  如果传递给 Array 构造函数的唯一参数是介于 0 到 2^32 - 1（含）之间的整数，这将返回一个新的 JavaScript 数组，其 length 属性设置为该数字（注意：这意味着一个由 arrayLength 个空槽组成的数组，而不是具有实际 undefined 值的槽——参见稀疏数组）。

#### Array.prototype.fill()

fill() 方法用一个固定值填充一个数组中从起始索引（默认为 0）到终止索引（默认为 array.length）内的全部元素。它返回修改后的数组。

##### 语法

```js
fill(value)
fill(value, start)
fill(value, start, end)
```

###### 参数

- value
  用来填充数组元素的值。注意所有数组中的元素都将是这个确定的值：如果 value 是个对象，那么数组的每一项都会引用这个元素。
- start 可选
  基于零的索引，从此开始填充，转换为整数。

  - 负数索引从数组的末端开始计算，如果 start < 0，则使用 start + array.length。
  - 如果 start < -array.length 或 start 被省略，则使用 0。
  - 如果 start >= array.length，没有索引被填充。
- end 可选
  基于零的索引，在此结束填充，转换为整数。fill() 填充到但不包含 end 索引。
  - 负数索引从数组的末端开始计算，如果 end < 0，则使用 end + array.length。
  - 如果 end < -array.length，则使用 0。
  - 如果 end >= array.length 或 end 被省略，则使用 array.length，导致所有索引都被填充。
  - 如果经标准化后，end 的位置在 start 之前或之上，没有索引被填充。

###### 返回值

经 value 填充修改后的数组。

## 方框进度条

```vue
<template>
  <RectProgress :list="list" />
</template>

<script setup>
import RectProgress from './components/RectProgress.vue'
import { ref } from 'vue'
const list = ref([
  {
    color: 'lightblue',
    title: 'Item 1',
    number: 450,
  },
  {
    color: 'lightgreen',
    title: 'Item 2',
    number: 350,
  },
  {
    color: 'pink',
    title: 'Item 3',
    number: 350,
  },
  {
    color: 'purple',
    title: 'Item 4',
    number: 350,
  },
])
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
```

难点在于每次绘制起点和终点的位置判断并进行相应的处理

- 记录每次绘制的起点坐标和所在边
- 设置四个拐点坐标
- 计算总绘制距离和每项的绘制距离
- 根据所在边不同计算起点坐标距对应拐点的距离, 并于此次绘制长度进行比较
  - 绘制长度小于等于距离, 直接绘制, 绘制后更新起点坐标
  - 绘制长度大于距离, 先绘制到拐点的线段, 之后更新起点坐标,所在边和绘制距离, 再次调用绘制方法

使用递归这点也难想到

- 如何使用递归

因为每次绘制无论位置如何, 都有一些相同的操作, 把这些操作抽离到switch条件语句之前

在switch的case子句的js表达式中, 若有const,let等声明, 可以将表达式用{}括起来形成块级作用域, 这样在不同条件下就可以重新声明了

```vue
<template>
  <article class="rect-progress">
    <canvas id="canvas" ref="canvasRef"></canvas>
    <section class="list-area">
      <div class="list-item" v-for="(item, index) in list" :key="index">
        <span :style="{ backgroundColor: item.color }"></span>
        <span>{{ item.title }}</span>
        <span>{{ item.number }} $</span>
      </div>
    </section>
  </article>
</template>

<script setup>
import { useTemplateRef, onMounted } from 'vue'

const { list } = defineProps({
  list: {
    type: Array,
    required: true,
  },
})

const canvas = useTemplateRef('canvasRef')

onMounted(() => {
  // 定义canvas画布的宽高
  canvas.value.width = canvas.value.offsetWidth
  canvas.value.height = canvas.value.offsetHeight
  // 定义一下边的长度
  const length = canvas.value.height - 40
  // 定义起始点的位置
  const startX = (canvas.value.width - length) / 2
  const startY = 20
  // 1 2 3 4分别表示上右下左
  const position = { x: startX, y: startY, p: 1 }
  // 记录一下4个拐点的位置
  const inflectionPoint = [
    { x: startX, y: startY },
    { x: startX + length, y: startY },
    { x: startX + length, y: startY + length },
    { x: startX, y: startY + length },
  ]
  // 计算出要绘制的线段总长度
  const totalLength = length * 4
  // 计算出每项的长度
  const totalNumber = list.reduce((acc, cur) => acc + +cur.number, 0) /* 总份数 */
  list.map(item => {
    item.lineLength = (item.number / totalNumber) * totalLength
    return item
  })
  const ctx = canvas.value.getContext('2d')
  const drawLine = (position, inflectionPoint, ctx, item) => {
    // 将当前画笔位置信息取出来
    const { x, y, p } = position
    const { color, lineLength } = item
    // 根据位置绘制
    ctx.strokeStyle = color
    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(x, y)
    switch (p) {
      case 1: {
        // 画笔在上方 计算起始点距离右上角的距离
        const distance = inflectionPoint[1].x - x
        if (lineLength <= distance) {
          ctx.lineTo(x + lineLength, y)
          ctx.stroke()
          position.x += lineLength
        } else {
          ctx.moveTo(x, y)
          ctx.lineTo(inflectionPoint[1].x, y)
          ctx.stroke()
          position.x = inflectionPoint[1].x
          item.lineLength -= distance
          position.p++
          drawLine(position, inflectionPoint, ctx, item)
        }
        break
      }
      case 2:
        {
          // 画笔在右方 计算起始点距离右下角的距离
          const distance = inflectionPoint[2].y - y
          if (lineLength <= distance) {
            ctx.lineTo(x, y + lineLength)
            ctx.stroke()
            position.y += lineLength
          } else {
            ctx.lineTo(x, inflectionPoint[2].y)
            ctx.stroke()
            position.y = inflectionPoint[2].y
            item.lineLength -= distance
            position.p++
            drawLine(position, inflectionPoint, ctx, item)
          }
        }
        break
      case 3:
        {
          // 画笔在下方 计算起始点距离左下角的距离
          const distance = x - inflectionPoint[3].x
          if (lineLength <= distance) {
            ctx.lineTo(x - lineLength, y)
            ctx.stroke()
            position.x -= lineLength
          } else {
            ctx.lineTo(inflectionPoint[3].x, y)
            ctx.stroke()
            position.x = inflectionPoint[3].x
            item.lineLength -= distance
            position.p++
            drawLine(position, inflectionPoint, ctx, item)
          }
        }
        break
      case 4:
        {
          // 画笔在左方 计算起始点距离左上角的距离
          const distance = y - inflectionPoint[0].y
          if (lineLength <= distance) {
            ctx.lineTo(x, y - lineLength)
            ctx.stroke()
            position.y -= lineLength
          } else {
            ctx.lineTo(x, inflectionPoint[0].y)
            ctx.stroke()
            position.y = inflectionPoint[0].y
            item.lineLength -= distance
          }
        }
        break
    }
  }
  list.forEach(item => drawLine(position, inflectionPoint, ctx, item))
})
</script>

<style lang="scss" scoped>
.rect-progress {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  .list-area {
    .list-item {
      display: flex;
      align-items: center;
      span {
        &:first-child {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        &:nth-child(2) {
          flex: 1;
        }
      }
    }
  }
}
</style>
```

# MySQL

```mysql
# 单表查询
use xzd_practice;
# 查询所有
select *
from employee;
# 查询指定列并起别名
select name as '员工姓名', salary '工资'
from employee;
# 条件查询
# case表达式新建查询结果列
select name '员工姓名', case when salary >= 10000 then '高工资' when salary >= 5000 then '中工资' else '低工资' end as '工资等级'
from employee;

# 每列仅显示符合条件的记录
select name, salary
from employee
where salary >= 10000;

#case表达式多个条件
select name '员工姓名', salary '工资',case when salary >= 10000 then '高工资' when salary >= 5000 then '中工资' else '低工资' end '工资等级'
from employee;

# 与关系
select name,salary,ismale
from employee
where salary>=10000 and ismale=1;

# 或关系
select name,salary,ismale
from employee
where salary>=10000 or ismale=0;

# 范围
select name,salary,ismale
from employee
where salary between 8000 and 12000;

# like表示模糊查询 %表示0或多个 _表示一个字符
select name,salary
from employee
where name like '花%';
select name,salary
from employee
where name like '花_';

# 查询空值null
select name,location
from employee
where location is null;
```
