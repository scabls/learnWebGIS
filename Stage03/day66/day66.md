# MapBox

## 创建地图

### 安装npm包

```bash
pnpm i mapbox-gl
```

### 导入样式

在vite环境中, 可以在style.css中导入样式

```css
@import './node_modules/mapbox-gl/dist/mapbox-gl.css';
```

> 不要忘记在js文件中导入style.css

或者在js文件中导入样式

```js
import 'mapbox-gl/dist/mapbox-gl.css'
```

### 导入mapbox包

在js文件中导入mapbox包

```js
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"(node.js环境下)
```

### 设置key

设置mapboxgl的accessToken属性

```js
mapboxgl.accessToken = '<your key>'
```

### 创建地图实例

```js
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/standard',
  projection: 'globe',
  center: [114.24, 30.59],
  zoom: 4,
})
```

注意这里是通过mapboxgl对象调用的Map类, 也可以解构赋值单独拿到Map类

> 前面设置key时不解构赋值是因为, import导入的变量类似用const声明, 对于简单类型的值无法修改

```js
import { Map } from 'mapbox-gl'
const map = new Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/standard',
  projection: 'globe',
  center: [114.24, 30.59],
  zoom: 4,
})
```

container选项将地图容器设置为id是指定值的dom元素. 

style选项设置地图样式,包括数据源和图层等, 这里使用的是内置样式.

projection选项设置投影系统, globe表示3D球形; center选项设置视图中心点; zoom选项设置视图缩放级别.

## 自定义地图样式

style选项的值可以是一个对象,在这个对象中可以设置version,sources,layers等属性.

sources属性值是一个对象, 对象的属性名将作为每个source的名称, 属性值是一个对象, 在source对象中设置source的type,tile和tileSize等属性

layers属性是一个数组,每个元素是一个layer对象,layer对象有id,type,source等属性, source属性的值即为要绑定的surce的名称

```js
const map = new mapboxgl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
        ],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'base-layer',
        type: 'raster',
        source: 'raster-tiles',
      },
    ],
  },
  projection: 'globe',
  center: [114.27, 30.59],
  zoom: 5,
})
```

## 相机移动(Camera)

Map的有几个属性是设置相机相关的, 如前面提到的zoom, 设置地图视窗的缩放级别

```js
const map = new mapboxgl.Map({
  container: 'map',
  ......
  // pitch: 设置俯仰角度
  pitch: 0,
  // bearing: 设置航向(旋转)角度
  bearing: 0,
})
```

对于这两个属性, 也可以调用Map的'Camera'相关的方法获取和设置

```js
map.getPitch()
map.setPitch()
map.getBearing()
map.setBearing()
```

相机移动相关的方法有:

- map.flyTo()

```js
map.flyTo({
  // 北京经纬度
  center: [116.46, 39.92],
  zoom: 10,
  pitch: 30,
  bearing: 30,
  // 习惯在flyTo中使用speed
  // speed 0-1 值越大速度越快
  speed: 0.2,
})
```

- map.easeTo()

```js
map.easeTo({
  // 北京经纬度
  center: [116.46, 39.92],
  zoom: 10,
  pitch: 30,
  bearing: 30,
  // 习惯在easeTo中使用duration
  // duraion 动画持续时间，单位毫秒
  duration: 2000,
})
```

使用easeTo做一个地球自转效果

```js
let isSpinning = true
function rotateWorld() {
  if (!isSpinning) return
  const center = map.getCenter()
  center.lng += 100
  map.easeTo({
    center,
    duration: 2000,
    // easing: t => t,表示匀速运动
    easing: t => t,
  })
}
rotateWorld()
map.on('moveend', function () {
  rotateWorld()
})
map.on('drag', function () {
  isSpinning = false
})
map.on('dblclick', function () {
  isSpinning = true
})
```

这里使用map的getCenter()获取了中心点, 设置了easeTo的过渡函数

其他相机移动方法还有:

- jumpTo()

```js
map.jumpTo({
  center: [116.46, 39.92],
  zoom: 10,
  pitch: 30,
  bearing: 30,
})
```

- panTo()

```js
map.panTo([116.46, 39.92], {
  duration: 2000,
  zoom: 10,
  pitch: 30,
  bearing: 30,
})
```

- rotateTo()

```js
map.rotateTo(30, {
  duration: 2000,
})
```

## 添加canvas到map

```js
// 绘制一个canvas到mapbox底图上
const canvas = document.createElement('canvas')
canvas.width = 256
canvas.height = 256
const ctx = canvas.getContext('2d')
ctx.beginPath()
ctx.arc(128, 128, 100, 0, 2 * Math.PI)
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
ctx.fill()
map.on('style.load', function () {
  // 在style加载完成后，将canvas添加到底图
  map.addSource('canvas-source', {
    type: 'canvas',
    canvas, // canvas:canvas,
    // 写入四个位置坐标，分别对应左上角、右上角、右下角、左下角
    coordinates: [
      [114.27, 30.59],
      [114.27 + 10, 30.59],
      [114.27 + 10, 30.59 - 10],
      [114.27, 30.59 - 10],
    ],
  })
  // 将数据源添加到底图
  map.addLayer({
    id: 'canvas-layer',
    type: 'raster',
    source: 'canvas-source',
  })
})
```

对map的操作, 除了异步操作(如点击事件处理), 最好放在map的syle.load事件处理器中, 或者直接放在load事件处理器中, 会在地图加载完毕之后再执行.

使用Map的addSource()方法添加canvas类型的source对象, 第一个参数是source对象的对象名,第二个参数就是source对象.

source对象的type属性指定为canvas类型, canvas属性设置canvas数据源, 可以是canvas元素的id字符串或者是canvas元素.

coordinates属性设置放置位置.

数据源要在地图上展示要创建layer, 使用Map.addLayer()方法将使用指定source的layer对象添加到地图

# MySQL

## sequelize

### 增删改操作
