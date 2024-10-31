# OpenLayers

ol遵循面向对象的开发范式

## 创建基本地图

### 安装ol

```bash
pnpm i ol
```

### 导入ol样式

本次示例在`'./style.css'`中导入了ol.css

```css
@import 'node_modules/ol/ol.css';
```

如果在vite等环境下, 可以在js文件中引入

```js
import 'ol/ol.css'
```

### 设置地图容器的尺寸

```css
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
```

### 创建map对象

若使用vite集成工具, 记得在js文件中引入style.css

```js
import './style.css'
```

从ol中导入Map类,并创建map对象

```js
import { Map, View } from 'ol'
const map = new Map({})
```

一般在编辑器中会自动帮我们导入类

openlayers是严格的**面向对象**编程, 一切对象都通过类创建

通过target配置项将当前实例绑定到id为指定字符串的html元素

```js
const map = new Map({
  target: 'map', // 将当前的实例绑定到指定id的容器中
})
```

通过view选项设置视口,值是一个view对象

### 创建view对象

```js
const map = new Map({
  target: 'map', // 将当前的实例绑定到指定id的容器中
    // view表示视图, 可以配置中心点位置和缩放级别
  view: new View({
    // // ol在绘制地图时, 默认使用Web墨卡托投影(EPSG:3857), 需要将经纬度坐标转换到Web墨卡托坐标
    // center: fromLonLat([114.305469, 30.593823]),
    // 或者直接修改投影系统
    projection: 'EPSG:4326', // 4326表示WGS84坐标系
    center: [114.305469, 30.593823],
    // 缩放级别
    zoom: 10,
  }),
})
```

注意view的值是通过new View()创建的view的对象. 这里也可以在外部声明view对象, 然后使用ES6的属性简写给map对象的view属性赋值

```js
const view = new View({
  // // ol在绘制地图时, 默认使用Web墨卡托投影(EPSG:3857), 需要将经纬度坐标转换到Web墨卡托坐标
  // center: fromLonLat([114.305469, 30.593823]),
  // 或者直接修改投影系统
  projection: 'EPSG:4326', // 4326表示WGS84坐标系
  center: [114.305469, 30.593823],
  // 缩放级别
  zoom: 10,
})
const map = new Map({
  target: 'map', // 将当前的实例绑定到指定id的容器中
  // view表示视图, 可以配置中心点位置和缩放级别
  view,
})
```

View使用center选项设置中心点, 值是一个长度为2的一维数组, 第一个值表示x, 第二个值表示y。两个值都要是**Number类型**

因为view认使用的是EPSG:3857, 即墨卡托投影.  所以在使用经纬度设置center选项使, 要调用 fromLonLat()方法将经纬度转变成墨卡托坐标。

```js
center: fromLonLat([114.305469, 30.593823])
```

但是更方便的做法是直接设置投影坐标系为接收经纬度参数的坐标系, 通过projection选项设置

```js
projection: 'EPSG:4326', // 4326表示WGS84坐标系
```

设置之后, 在这个地图中所有的坐标, 都被视为经纬度。

zoom选项设置视图的初始缩放级别。

在设置完视图之后, 要向地图添加图层

### 向map添加layer

```js
const map = new Map({
  ....
  // layers表示地图上显示的图层,通常最下层是瓦片底图
  layers: [],
})
```

map的layers选项是一个数组, 数组每个元素都是一个指定类型的layer对象, 越靠后的layer叠加在越上层

最底层一般是瓦片图层(TileLayer), 顾名思义, 即使用无数瓦片似的图像拼接成一个大图像

```js
  layers: [
    // 绘制一个tile图层(底图)
    new TileLayer({
      // source表示图层对应的数据源, 瓦片图层需要使用数据源,
      // source: new OSM(), // 使用内置OSM底图
      // XYZ通用瓦片图层源
      source: new XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        wrapX: false, // 不重复加载瓦片
      }),
    }),
  ],
```

瓦片图层对象使用TileLayer类创建, source选项表示图层对应的数据源, 值是一个**根据图层类型不同而不同的source**对象,

OSM表示内置的底图, XYZ表示通用瓦片图层源

XYZ对象的url选项指定图源链接, wrapX 是一个布尔配置项，用于指定是否在水平方向上包裹世界。默认值为 true。

> 当 `wrapX` 设置为 `true` 时，地图将在水平方向上循环，这意味着当你在地图的右边时，继续滚动会回到地图的左边，形成一个无缝的环1。
>
> 当 `wrapX` 设置为 `false` 时，地图将只显示一个世界，不会在水平方向上循环1。

### 完整示例

```js
import './style.css'
// 在map容器中绘制一个地图
// ol遵循面向对象的开发范式
// ol中默认提供了一些底图服务
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { OSM, XYZ } from 'ol/source'
import { fromLonLat } from 'ol/proj'
const map = new Map({
  target: 'map', // 将当前的实例绑定到指定id的容器中
  // layers表示地图上显示的图层,通常最下层是瓦片底图
  layers: [
    // 绘制一个tile图层(底图)
    new TileLayer({
      // source表示图层对应的数据源, 瓦片图层需要使用数据源,
      // source: new OSM(), // 使用内置OSM底图
      // XYZ通用瓦片图层源
      source: new XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        wrapX: false, // 不重复加载瓦片
      }),
    }),
  ],
  // view表示视图, 可以配置中心点位置和缩放级别
  view: new View({
    // 武汉经纬度
    // // ol在绘制地图时, 默认使用Web墨卡托投影(EPSG:3857), 需要将经纬度坐标转换到Web墨卡托坐标
    // center: fromLonLat([114.305469, 30.593823]),
    // 或者直接修改投影系统
    projection: 'EPSG:4326', // 4326表示WGS84坐标系
    center: [114.305469, 30.593823],
    // 缩放级别
    zoom: 10,
  }),
})
```

## View

### extent配置项

extent:限制地图的显示范围[左下角经纬度，右上角经纬度]

```js
  view: new View({
    projection: 'EPSG:4326',
    center: [114.305469, 30.593025],
    zoom: 10,
    // extent:限制地图的显示范围[左下角经纬度，右上角经纬度]
    extent: [114.305469, 30.593025, 116.407394, 39.904211],
  }),
```

### 从map中获取view

map对象的getView()方法可以获取当前视图对象

```js
const view = map.getView() //获取视图对象
```

### 获取中心点

```js
const center = view.getCenter() //获取视图的中心点坐标
```

### 获取缩放级别

```js
view.getZoom()
```

### 设置中心点

```js
view.setCenter([116.407394, 39.904211])
```

#### 直接更新中心点后可能会出现的问题

当我们通过getCenter()方法获取中心点center数组后, 更改center数组, 并将数组传入setCenter()方法重新设置中心点, 此时view可能并不会立刻到新的中心点, 这时候就需要调用map的render()方法重新渲染地图

```js
    // // 重新设置中心点
    view.setCenter(center)
    // // 重新渲染地图
    map.render()
```

### 设置缩放级别

```js
view.setZoom(12)
```

### 动画过渡

view的animate()方法可以设置view的中心点和缩放等配置并使用动画效果过渡

```js
  // 动画效果
  view.animate({
    center: [116.407394, 39.904211],
    zoom: view.getZoom() + 2,
    duration: 1000,
  })
```

> By default, the animation lasts one second and uses in-and-out easing. You can customize this behavior by including `duration` (in milliseconds) and `easing` options (see [`ol/easing`](https://openlayers.org/en/latest/apidoc/module-ol_easing.html)).

## 加载多个图层

一个source对象可以有多个url, 后设置的url会叠加在前者之上. 但为了方便管理, 多个url就设置多个图层对象, 分别在它们的source中设置一个url.

```js
  layers: [
    new TileLayer({
      source: new XYZ({
        // 一个source可以有多个url,会依次加载
        // 高德地图有不同的瓦片图层 矢量,卫星影像,标记图层
        // 矢量图层
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        // // 影像图层
        // url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}',
        // // 标记图层
        // url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
        wrapX: false,
      }),
    }),
    // 叠加多个图层,默认后面的图层会叠在前面的图层之上
    new TileLayer({
      source: new XYZ({
        // 影像图层
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}',
        wrapX: false,
      }),
    }),
    new TileLayer({
      source: new XYZ({
        // 标记图层
        url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
        wrapX: false,
      }),
    }),
  ],
```

#### 获取layer

##### getAllLayers

map的getAllLayers()方法会从所有layerGroup中获取所有layer

```js
const layers = map.getAllLayers()
layers[0].setZIndex(1)
layers[1].setZIndex(0)
layers[2].setZIndex(0)
```

##### getLayers()

获取与当前地图相关的layer的collection, 每项都是一个Layer对象 这时可以调用collection的getArray()方法获取由所有layer组成的数组, 进而访问每个layer

```js
const layers = map.getLayers().getArray()
layers[0].setZIndex(0)
layers[1].setZIndex(1)
layers[2].setZIndex(1)
```

或者使用item()方法根据index直接访问每个layer

```js
const layers = map.getLayers()
layers.item(0).setZIndex(0)
layers.item(1).setZIndex(1)
layers.item(2).setZIndex(1)
```

#### 图层切换

每个tileLayer或者其他类型的layer都可以通过调用etZIndex(zindex)方法改变自己的层级

上一小节在介绍获取layer的不同方法时便展示了此方法

```js
const layers = map.getLayers()
layers.item(0).setZIndex(0)
```

## 更好的代码结构

对于view和layer, 除了在实例化map对象的同时创建并将其设置在对应属性, 还可以在map对象创建之前先创建, 然后使用es6的对象属性简写直接将同名变量作为对应属性, 这点在*创建view对象*这一小节已经展示过。但除此之外, 还可以完全将这几个对象在结构上解耦, 调用map的方法将view对象和layer对象设置为自己的view和layer

### map.setView

```js
const map = new Map({
  target: 'map',
})
const view = new View({
  projection: 'EPSG:4326',
  center: [114.24, 30.59],
  zoom: 10,
})
map.setView(view)
```

### map.addLayer

```js
const map = new Map({
  target: 'map',
})
const vetorLayer = new TileLayer({})
const satelliteLayer = new TileLayer({})
const markLayer = new TileLayer({})
map.addLayer(vetorLayer)
map.addLayer(satelliteLayer)
map.addLayer(markLayer)
```

### 抽离source

是的, layer的source也可以抽离, 然后调用layer.setSource()方法为layer设置source

```js
layer.setSource(source)
```

但不是所有的抽离都是必须的!

### 完整实例

```js
import { Map, View } from 'ol'
import './style.css'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
const map = new Map({
  target: 'map',
})
const view = new View({
  projection: 'EPSG:4326',
  center: [114.24, 30.59],
  zoom: 10,
})
const vetorLayer = new TileLayer({
  source: new XYZ({
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
    wrapX: false,
  }),
})
const satelliteLayer = new TileLayer({
  source: new XYZ({
    // 影像图层
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}',
    wrapX: false,
  }),
})
const markLayer = new TileLayer({
  source: new XYZ({
    // 标记图层
    url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    wrapX: false,
  }),
})
map.setView(view)
map.addLayer(vetorLayer)
map.addLayer(satelliteLayer)
map.addLayer(markLayer)
```

## 静态图片图层

layer: ImageLayer

source: ImageStatic

很少直接加载静态图片 推荐使用矢量图层加载图片

# CSS

## 尺寸属性中的'auto'关键字

## 重排,重绘