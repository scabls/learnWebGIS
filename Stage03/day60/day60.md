# canvas

## 截图效果

```vue
<template>
  <div class="container">
    <input type="file" @change="handleFileChange" />
    <div class="canvas-area" v-show="file">
      <canvas
        id="canvas"
        ref="canvasRef"
        width="500"
        height="500"
        @mousedown="startDraw"
        @mousemove="drawing"
        @mouseup="endDraw"
        @mouseleave="endDraw"
        :style="{ border: file ? 'solid 1px #ccc' : 'none' }"
      ></canvas>
      <canvas class="mask" ref="maskRef" width="500" height="500" v-show="isMasked"></canvas>
      <canvas class="clip" ref="clipRef"></canvas>
    </div>
    <div class="btn" v-show="file">
      <button @click="clipImage">裁剪图片</button>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'

const canvasRef = useTemplateRef('canvasRef')
const maskRef = useTemplateRef('maskRef')
const clipRef = useTemplateRef('clipRef')

let ctx, maskCtx, clipCtx

const file = ref(null)
const startX = ref(0)
const startY = ref(0)
const endX = ref(0)
const endY = ref(0)
const isDrawing = ref(false)
const isMasked = ref(false)

const handleFileChange = event => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  file.value = event.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file.value)
  reader.onload = () => {
    const img = new Image()
    img.src = reader.result
    img.onload = () => {
      previewImage(img)
    }
  }
}
const previewImage = img => {
  if (img.width / img.height >= canvasRef.value.width / canvasRef.value.height) {
    ctx.drawImage(
      img,
      0,
      0,
      canvasRef.value.width,
      canvasRef.value.width * (img.height / img.width)
    )
  } else {
    ctx.drawImage(
      img,
      0,
      0,
      canvasRef.value.height * (img.width / img.height),
      canvasRef.value.height
    )
  }
}
const startDraw = event => {
  isDrawing.value = true
  startX.value = event.offsetX
  startY.value = event.offsetY
}
const endDraw = () => (isDrawing.value = false)
const drawing = event => {
  if (!isDrawing.value) return
  addMask()
  endX.value = event.offsetX
  endY.value = event.offsetY
  maskCtx.clearRect(
    startX.value,
    startY.value,
    endX.value - startX.value,
    endY.value - startY.value
  )
}
const addMask = () => {
  isMasked.value = true
  maskCtx.clearRect(0, 0, maskRef.value.width, maskRef.value.height)
  maskCtx.fillStyle = 'rgba(0, 0, 0, 0.5)'
  maskCtx.fillRect(0, 0, maskRef.value.width, maskRef.value.height)
}
const clipImage = () => {
  clipRef.value.width = Math.abs(endX.value - startX.value)
  clipRef.value.height = Math.abs(endY.value - startY.value)
  if (clipRef.value.width === 0 || clipRef.value.height === 0) return
  const imageData = ctx.getImageData(
    startX.value,
    startY.value,
    endX.value - startX.value,
    endY.value - startY.value
  )
  clipCtx.putImageData(imageData, 0, 0)
  isMasked.value = false
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d', { willReadFrequently: true })
  maskCtx = maskRef.value.getContext('2d')
  clipCtx = clipRef.value.getContext('2d')
})
</script>

<style lang="scss">
.container {
  .canvas-area {
    position: relative;
    width: 500px;
    height: 500px;
    margin-top: 1rem;
    &:hover {
      cursor: crosshair;
    }
    #canvas,
    .mask {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
    .mask {
      pointer-events: none;
    }
    .clip {
      position: absolute;
      top: 0;
      left: 600px;
    }
  }
  .btn {
    margin-top: 1rem;
  }
}
</style>
```

### 在 web 应用程序中使用文件

[在 web 应用程序中使用文件 - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications)

通过使用文件 API，web 内容可以要求用户选择本地文件，然后读取这些文件的内容。这种选择可以通过使用 HTML `<input type="file">` 元素或通过拖放来完成。

#### 访问被选择的文件

```html
<input type="file" id="input" multiple />
```

通过文件 API，我们可以访问 FileList，它包含了表示用户所选文件的 File 对象。

input 元素的 multiple 属性允许用户选择多个文件。

使用传统的 DOM 选择器访问一个被选择的文件：

```js
const selectedFile = document.getElementById("input").files[0];
```

#### 通过 change 事件访问被选择的文件

可以（但不是强制的）通过 `change` 事件访问 [`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)。你需要使用 [`EventTarget.addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 添加 `change` 事件的处理器，像这样：

```js
const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files; /* 现在你可以处理文件列表 */
}
```

在本此实例中, 通过v-on指令绑定了change事件

```vue
<input type="file" @change="handleFileChange" />
```

```js
const handleFileChange = event => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  file.value = event.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file.value)
  reader.onload = () => {
    const img = new Image()
    img.src = reader.result
    img.onload = () => {
      previewImage(img)
    }
  }
}
```

注意vue的事件处理器中,即使是普通函数,this也没有绑定在事件处理器所在dom元素上, 需要通过事件参数event的属性event.target访问触发事件的dom元素或者event.currentTarget访问事件处理器绑定的dom元素

#### 使用FileReader读取文件

FileReader 接口允许 Web 应用程序**异步读取**存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

文件对象可以从用户使用 `<input>` 元素选择文件而返回的 FileList 对象中获取，或者从拖放操作的 DataTransfer 对象中获取。

FileReader 只能访问用户明确选择的文件内容，无论是使用 HTML `<input type="file">` 元素还是通过拖放。它不能用于从用户的文件系统中按路径名读取文件。要按路径名读取客户端文件系统上的文件，请使用文件系统访问 API。要读取服务器端文件，请使用 fetch()，如果跨源读取，则需要 CORS 权限。

##### readAsDataURL()

FileReader 接口的 readAsDataURL() 方法用于读取指定的 Blob 或 File 对象的内容。当读操作完成时，readyState 属性变为 DONE，并触发 loadend 事件。此时，**result 属性包含作为 data: URL 的数据**，将文件的数据表示为 base64 编码字符串。

> 备注：如果不先删除 Base64 编码数据前面的 Data-URL 声明，则 blob 的 result 无法直接解码为 Base64。要仅检索 Base64 编码的字符串，请首先从结果中删除 `data:*/*;base64`,。

##### load 事件

FileReader 接口的 load 事件在成功读取文件时触发。

在 addEventListener() 等方法中使用事件名称，或设置事件处理器属性。

```js
addEventListener("load", (event) => {});

onload = (event) => {};
```

在本次示例中, 因为文件是异步读取, 所以要侦听load事件保证文件读取完毕

img对象从src加载数据也是一个异步操作,因此用 load 事件来保证在加载完毕之后使用这个图片

是注册事件处理器还是使用事件处理器属性, 此处也有需要注意的地方, 将在之后做详细解释 

#### 使用对象 URL读取文件

DOM 的 URL.createObjectURL() 和 URL.revokeObjectURL() 方法让你创建简单的 URL 字符串，可以用来引用任何可以用 DOM File 对象引用的数据，包括用户电脑中的本地文件。

当你需要在 HTML 中通过 URL 来引用一个 File 对象时，你可以创建一个对象 URL，就像这样：

```js
const objectURL = window.URL.createObjectURL(fileObj);
```

这个对象 URL 是一个标识 File 对象的字符串。每次你调用 URL.createObjectURL()，都会创建一个唯一的对象 URL，即使你已经为该文件创建了一个对象 URL。每一个 URL 都必须被释放。虽然它们会在文档卸载时自动释放，但如果你的页面动态地使用它们，你应该通过调用 URL.revokeObjectURL() 明确地释放它们：

```js
URL.revokeObjectURL(objectURL);
```


像本次示例中, 在将objectURL赋值给img.src后, 在img的load事件处理器中释放url

```js
const handleFileChange = event => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  file.value = event.target.files[0]
  const img = new Image()
  img.src = URL.createObjectURL(file.value);
  img.onload = () => {
    previewImage(img)
    URL.revokeObjectURL(img.src);
  }
}
```

### 普通变量的使用

响应式变量需要消耗性能, 当无需响应性的时候, 可以使用普通变量, 比如示例中的ctx

```js
let ctx, maskCtx, clipCtx
```

### canvas实现object-fit:contain效果

比较图片和画布的宽高比, 当图片宽高比大于画布的时. 保持比例缩放后, 图片高度小于画布高度, 要处理绘制高度; 当图片宽高比小于画布的时, 说明保持比例缩放后, 图片宽度小于画布宽度, 要处理绘制宽度

```js
const previewImage = img => {
  if (img.width / img.height >= canvasRef.value.width / canvasRef.value.height) {
    ctx.drawImage(
      img,
      0,
      0,
      canvasRef.value.width,
      canvasRef.value.width * (img.height / img.width)
    )
  } else {
    ctx.drawImage(
      img,
      0,
      0,
      canvasRef.value.height * (img.width / img.height),
      canvasRef.value.height
    )
  }
}
```

### 事件处理器实现方式的选择

事件处理函数的注册通常使用onevent 属性或者EventTarget.addEventListener。

在示例中, 监听了input:file的change事件, 并在事件处理函数中, 设置了reader对象和img对象load事件的事件处理器属性。

现在注册事件处理函数更推荐addaddEventListener的方式, 但要注意避免重复注册事件处理函数。

load事件的事件处理函数是在change事件处理函数中注册的, 所以每次运行change事件处理函数时都会对reader对象和img对象进行事件处理函数注册。

本次示例中, reader对象和img对象都是局部变量, 每次函数运行时建立, 运行结束后销毁, 不会存在重复注册的情况, 所以可以放心使用addEventListener方式。

```js
const handleFileChange = event => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  file.value = event.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file.value)
  reader.onload = () => {
    const img = new Image()
    img.src = reader.result
    img.onload = () => {
      previewImage(img)
    }
  }
}
```

#### 在事件处理函数中对函数外部对象进行事件处理器注册

若在事件处理函数中对一个全局变量进行事件处理函数注册, 那么就可能会重复注册。

> addEventListener() 的工作原理是将实现 EventListener 的函数或对象添加到调用它的 EventTarget 上的指定事件类型的事件侦听器列表中。如果要绑定的函数或对象已经被添加到列表中，该函数或对象不会被再次添加。
>
> 如果先前向事件侦听器列表中添加过一个匿名函数，并且在之后的代码中调用 addEventListener 来添加一个功能完全相同的匿名函数，那么之后的这个匿名函数也会被添加到列表中。
>
> 实际上，即使使用完全相同的代码来定义一个匿名函数，这两个函数仍然存在区别，在循环中也是如此。

> 箭头函数也是匿名函数

除此之外, 若添加的函数是在当前事件处理函数内声明的, 那么即使名称相同, 它们也会被视为不同函数, 会被重复添加。

所以在事件处理函数中使用addEventListener()对一个全局变量进行事件处理函数注册时, 较好的解决方法是先在所处的事件处理函数中外部声明要注册的函数或将匿名函数赋值给某个变量, 对于这样的具名函数, 每次要对其进行注册时, 就会被判断为同一函数, 不再添加。

但我们应该避免在一个对象的事件处理函数中对非函数作用域内创建的对象进行事件处理函数注册, 因为一不小心就会造成重复添加。

需求这样的场景可能是, 我们要在对象的某个事件触发后, 在对象的另一个事件触发时再进行某些操作。比如按下鼠标左键后移动才能拖动等, 于是想到了在mousedown事件处理器中注册mousemove事件处理器。但实际上可以有更好的处理方法。

可以设置一个全局的开关变量, 并同时注册mousedown事件处理器和mousemove事件处理器, 在mousedown事件处理函数中更改开关变量的值, 比如设为true; 在mousemove事件处理函数中, 对开关变量进行判断, 这里推荐使用卫语句, 如果开关变量为false, 就直接返回, 停止执行函数。 再在mouseup事件事件处理函数中将开关变量设为false。

在本次示例中, 就是如此处理的:

```vue
<canvas
   id="canvas"
   ref="canvasRef"
   width="500"
   height="500"
   @mousedown="startDraw"
   @mousemove="drawing"
   @mouseup="endDraw"
   @mouseleave="endDraw"
   :style="{ border: file ? 'solid 1px #ccc' : 'none' }"
></canvas>
```

```js
const isDrawing = ref(false)
......
const startDraw = event => {
  isDrawing.value = true
  ......
}
const endDraw = () => (isDrawing.value = false)
const drawing = event => {
  if (!isDrawing.value) return
	......
}
```

> vue中自然而然就会想到这样的处理方法, 但是原生js就可能会选择先后注册的方式

### css

####  pointer-events

pointer-events CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 target

当此属性未指定时，visiblePainted值的相同特征适用于 SVG（可缩放矢量图形）内容。

除了指示该元素不是鼠标事件的目标之外，值none表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西。

##### 提示

使用`pointer-events`来阻止元素成为鼠标事件目标不一定意味着元素上的事件侦听器永远不会触发。如果元素后代明确指定了`pointer-events`属性并允许其成为鼠标事件的目标，那么指向该元素的任何事件在事件传播过程中都将通过父元素，并以适当的方式触发其上的事件侦听器。当然，位于父元素但不在后代元素上的鼠标活动都不会被父元素和后代元素捕获（鼠标活动将会穿过父元素而指向位于其下面的元素）。

本次示例中mask位于canvas的上方, 而事件绑定在canvas上, 为了穿透mask到达canvas,对mask设置pointer-events: none;

```vue
<canvas
  id="canvas"
 ref="canvasRef"
  width="500"
  height="500"
  @mousedown="startDraw"
  @mousemove="drawing"
  @mouseup="endDraw"
  @mouseleave="endDraw"
  :style="{ border: file ? 'solid 1px #ccc' : 'none' }"
></canvas>
<canvas class="mask" ref="maskRef" width="500" height="500" v-show="isMasked"></canvas>
```

```css
.mask {
  pointer-events: none;
}
```

#### inset

CSS 属性 inset 为简写属性，对应于 top、right、bottom 和 left 属性。其与 margin 简写属性具有相同的多值语法。

```css
/* 长度值 */
inset: 10px; /* 应用于所有边 */
inset: 4px 8px; /* 上下 | 左右 */
inset: 5px 15px 10px; /* 上 | 左右 | 下 */
inset: 2.4em 3em 3em 3em; /* 上 | 右 | 下 | 左 */

/* 包含块的宽度（左或右）或高度（上或下）的百分比 */
inset: 10% 5% 5% 5%;

/* 关键词值 */
inset: auto;

/* 全局值 */
inset: inherit;
inset: initial;
inset: revert;
inset: revert-layer;
inset: unset;
```

##### 初始值 

每个方向的初始值都是auto

## 可绘制和拖动图形的画板

```js
class Rect {
  constructor(startX, startY, color) {
    this.startX = startX
    this.startY = startY
    this.color = color
    this.endX = startX
    this.endY = startY
  }

  get minX() {
    return Math.min(this.startX, this.endX)
  }
  get maxX() {
    return Math.max(this.startX, this.endX)
  }
  get minY() {
    return Math.min(this.startY, this.endY)
  }
  get maxY() {
    return Math.max(this.startY, this.endY)
  }

  draw = ctx => {
    ctx.fillStyle = this.color
    ctx.fillRect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY)
    ctx.strokeStyle = 'white'
    ctx.strokeRect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY)
  }
  isInside = (x, y) => {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY
  }
}

class Circle {
  constructor(startX, startY, color) {
    this.startX = startX
    this.startY = startY
    this.color = color
    this.endX = startX
    this.endY = startY
  }
  get radius() {
    return Math.hypot(this.startX - this.endX, this.startY - this.endY)
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.stroke()
  }
  isInside(x, y) {
    return Math.hypot(x - this.startX, y - this.startY) <= this.radius
  }
}

export { Rect, Circle }
```

```vue
<template>
  <div class="draw-shapes">
    <div class="input">
      <input type="color" id="inputColor" v-model="color" />
      <select v-model="shapeType">
        <option value="rect">矩形</option>
        <option value="round">圆形</option>
      </select>
    </div>
    <div class="canvas-area">
      <canvas
        width="500"
        height="300"
        id="canvas"
        ref="canvas"
        @mousedown.left="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="stopMouseMove"
        @mouseout="stopMouseMove"
        @contextmenu.prevent="toggleMenu"
      ></canvas>
      <div
        class="right-click-menu"
        v-show="showMenu"
        @click="clearCanvas"
        @contextmenu.prevent="toggleMenu"
      >
        清空画布
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'
import { Rect, Circle } from '@/classes'

const canvas = useTemplateRef('canvas')

const shapeType = ref('rect')
const canMove = ref(false)
const isShape = ref(false)
const hasCreated = ref(false)
const startX = ref(0)
const startY = ref(0)
const color = ref('#000000') /* 一定要有有效初始值 */
const shapes = ref([])
const showMenu = ref(false)
const menuX = ref('')
const menuY = ref('')

let currentShape, ctx, currentIndex

const handleMouseDown = event => {
  canMove.value = true
  startX.value = event.offsetX
  startY.value = event.offsetY
  currentIndex = shapes.value.findLastIndex(shape => shape.isInside(startX.value, startY.value))
  if (currentIndex != -1) isShape.value = true
}
const handleMouseMove = event => {
  if (!canMove.value) return
  if (isShape.value) return moveShape(event)
  if (!hasCreated.value) return createShape()
  currentShape.endX = event.offsetX
  currentShape.endY = event.offsetY
}
const createShape = () => {
  switch (shapeType.value) {
    case 'rect':
      currentShape = new Rect(startX.value, startY.value, color.value)
      break
    case 'round':
      currentShape = new Circle(startX.value, startY.value, color.value)
      break
  }
  shapes.value.push(currentShape)
  hasCreated.value = true
}
const moveShape = event => {
  const dx = event.offsetX - startX.value
  const dy = event.offsetY - startY.value
  shapes.value[currentIndex].startX += dx
  shapes.value[currentIndex].startY += dy
  shapes.value[currentIndex].endX += dx
  shapes.value[currentIndex].endY += dy
  startX.value = event.offsetX
  startY.value = event.offsetY
}
const stopMouseMove = () => {
  canMove.value = false
  isShape.value = false
  hasCreated.value = false
}
const toggleMenu = event => {
  showMenu.value = !showMenu.value
  if (!showMenu.value) return
  menuX.value = event.offsetX + 'px'
  menuY.value = event.offsetY + 'px'
}
const clearCanvas = () => {
  showMenu.value = false
  shapes.value = []
}

const drawShapes = () => {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  shapes.value.forEach(shape => {
    shape.draw(ctx)
  })
  requestAnimationFrame(drawShapes)
}
requestAnimationFrame(drawShapes)

onMounted(() => {
  ctx = canvas.value.getContext('2d')
})
</script>

<style lang="scss" scoped>
$menu-left: v-bind(menuX);
$menu-top: v-bind(menuY);
.draw-shapes {
  .input {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  .canvas-area {
    position: relative;
    width: min-content;
    margin: 1rem auto;
    #canvas {
      display: block;
      width: 500px;
      height: 300px;
      background-color: antiquewhite;
      border: 1px solid black;
    }
    .right-click-menu {
      position: absolute;
      left: $menu-left;
      top: $menu-top;
      background-color: #eee;
      padding: 0.2rem 0.4rem;
      box-shadow: 0.3px 0.5px 1px #333;
    }
  }
}
</style>
```

### 为什么使用面向对象?

这次依旧使用到了面向对象编程。那么为什么选择了面向对象呢?

我们要绘制很多形状, 每个形状都有自己的绘制信息, 比如起始坐标和绘制颜色等, 形状也分种类, 不同的种类存储的信息和绘制方式也不同, 当鼠标点击到画布上时, 还要判断鼠标是否落在了形状上。

要处理这么多信息, 我们应该把每个形状都抽象成一个对象, 在属性中记录绘制信息, 在方法中实现根据绘制信息绘制图像和判断鼠标的落点是否点击到了自己。因为形状分圆形和矩形, 它们的绘制信息,绘制方法以及落点判断方法也不同, 所以应该抽象成两类。于是我们声明了不同的类, 并使用类创建一个个实例。将这些实例添加到数组中, 定义一个函数遍历数组中的对象并调用对象的绘制方法。

因为绘制会不断更新对象的属性, 而又要将属性即时的绘制出来, 相当于一个动画过程。所以使用requestAnimationFrame()调用我们声定义的函数。

> 备注：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用 requestAnimationFrame()。requestAnimationFrame() 是一次性的。

### 拖动实现

在判断落点时, 选择获取index, 通过使用shapes.value结合index访问到指定对象

```js
const handleMouseDown = event => {
  canMove.value = true
  startX.value = event.offsetX
  startY.value = event.offsetY
  currentIndex = shapes.value.findLastIndex(shape => shape.isInside(startX.value, startY.value))
  if (currentIndex != -1) isShape.value = true
}
```

```js
const moveShape = event => {
  const dx = event.offsetX - startX.value
  const dy = event.offsetY - startY.value
  shapes.value[currentIndex].startX += dx
  shapes.value[currentIndex].startY += dy
  shapes.value[currentIndex].endX += dx
  shapes.value[currentIndex].endY += dy
  startX.value = event.offsetX
  startY.value = event.offsetY
}
```

那为什么不使用Array.prototype.findLast()直接获取对象 ,修改获取到的对象不就好了吗?

> 是的, 是可以的... 写这篇笔记是在写代码的一天之后, 当时直接获取对象并修改, 失败了...也没有仔细排查bug, 而是在耗费数次尝试的时间试错之后, 换了方法... 但今天写笔记不信邪又试了一次, 成功了...心情复杂
>
> 但奇怪的是, 我清楚的记得昨天是获取到的普通对象, 今天是对象的代理, 原因不明

```js
const handleMouseDown = event => {
  canMove.value = true
  startX.value = event.offsetX
  startY.value = event.offsetY
  currentShape = shapes.value.findLast(shape => shape.isInside(startX.value, startY.value))
  if (currentShape) isShape.value = true
}
```

```js
const moveShape = event => {
  const dx = event.offsetX - startX.value
  const dy = event.offsetY - startY.value
  currentShape.startX += dx
  currentShape.startY += dy
  currentShape.endX += dx
  currentShape.endY += dy
  startX.value = event.offsetX
  startY.value = event.offsetY
}
```

### 类的getter字段(属性访问器)

示例中get开头的字段, 便是属性访问器

```js
class Circle {
  get radius() {
    return Math.hypot(this.startX - this.endX, this.startY - this.endY)
  }
}
```

*getter 字段*允许我们像访问“实际属性”一样操作某些东西。**`get`** 语法将对象属性绑定到查询该属性时将被调用的函数。

有时需要允许访问返回动态计算值的属性，或者你可能需要反映内部变量的状态，而不需要使用显式方法调用。在 JavaScript 中，可以使用 *getter* 来实现。

比如我们有了一个对象, 访问它的radius属性

```js
const circle = new Circle()
console.log(circle.radius)
```

如果一个字段仅有一个 getter 而没有 setter，它将是只读的。

### contextmenu事件

contextmenu 事件会在用户尝试打开上下文菜单时被触发。该事件通常在鼠标点击右键或者按下键盘上的菜单键时被触发，如果使用菜单键，该上下文菜单会被展示 到所聚焦元素的左下角，但是如果该元素是一棵 DOM 树的话，上下文菜单便会展示在当前这一行的左下角。

任何没有被禁用的鼠标右击事件 (通过调用事件的 preventDefault() 方法) 将会使得 contextmenu 事件在目标元素上被触发。

在本次示例, 监听了canvas的contextmenu事件并阻止了默认行为, 实现了自定义右键菜单

```vue
<canvas
        width="500"
        height="300"
        id="canvas"
        ref="canvas"
        @mousedown.left="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="stopMouseMove"
        @mouseout="stopMouseMove"
        @contextmenu.prevent="toggleMenu"
></canvas>
```

```js
const toggleMenu = event => {
  showMenu.value = !showMenu.value
  if (!showMenu.value) return
  menuX.value = event.offsetX + 'px'
  menuY.value = event.offsetY + 'px'
}
```

# MySQL

```mysql
# 排序(降序desc;升序asc;默认升序)
select salary, name
from employee
where ismale = 1
order by salary desc;

# 分页 limit m,n 表示跳过m条数据,查询n条数据 m:(page-1)*pageSize n:pageSize
select salary, name
from employee
where ismale = 1
order by salary
limit 10,10;

# 多表查询(联表查询)
# 1.笛卡尔积

# distinct可以对查询的结果进行去重, 一般用作单列查询的去重

# 2.外连接 通过外键连接的表之间的查询
# 查询员工所在部门的信息和员工的信息
# 当右表没有对应左表的记录时,这条记录也会显示
select *
from department d
         left join employee e on e.deptId = d.id;
# 内连接
# 当右表没有对应左表的记录时,这条记录不会显示
select *
from department d
         inner join employee e on e.deptId = d.id;

# sql的内置函数
# 数学类, 聚合类, 字符类, 日期类
# 聚合类
# count 计算指定列的记录数量
select count(id) as '员工数量'
from employee;
# avg 平均数
select avg(salary) as '平均工资'
from employee;
# sum 求和
select sum(salary) as '员工工资总和'
from employee;
# min max
select min(salary) as '最低工资', max(salary) as '最高工资'
from employee;
# 字符类
# truncate(m,n) 将数字截取到几位小数
select truncate(avg(salary), 1) as '平均工资'
from employee;
# 日期类
# curdate
select curdate();

# 分组
select location '员工住址', count(id)
from employee
group by location
```

