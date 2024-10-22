# OpenLayers

## 矢量图层

### 加载矢量图层

对于不同类型的layer对象, 其要求的source对象类型也不同, 矢量图层的类名和对应source的类名如下

- layer: VectorLayer
- source: VectorSource

VectorSource的配置项中, url可以是一个属性, 值是指向GeoJSON的路径(链接); 也可以是一个方法,方法返回的字符串将作为url的路径. 

如果设置了url, 则必须设置format选项, 值是一个GeoJSON对象

```js
// 在地图上加载一个矢量图层
const secondLayer = new VectorLayer({
  // 尝试加载地图矢量数据 GeoJSON格式
  // 发送请求获取数据
  source: new VectorSource({
    // url: 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
    url() {
      return 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
    },
    // 设置数据格式为GeoJSON,方法要先导入
    format: new GeoJSON(),
  }),
})
```

### 设置样式

VectorLayer

Style对象的每个选项的值也都是一个对象

如fill选项设置填充样式, 值是一个Fill对象; stroke选项设置描边样式, 值是一个Stroke对象

```js
// 在地图上加载一个矢量图层
const secondLayer = new VectorLayer({
  ....
  
  // 设置样式(无论做什么都要使用面向对象的方式)
  style: new Style({
    // 设置填充
    fill: new Fill({
      color: 'red',
    }),
    // 设置描边
    stroke: new Stroke({
      color: 'gold',
    }),
  }),
})
```

或者使用layer的setStyle()方法

### 获取source

我们知道,map可以获取view和layer, 那么layer是否可以获取source对象呢?

```js
map
  .getLayers()
  .item(0)
  .getSource()
```

layer的getSource就可获取配置给source选项的source对象

因为source的url通常是远程链接, 在获取source时发送了网络请求, 需要等请求完成后才能访问. 可以监听source的change事件来确定请求是否完成

```js
map
  .getLayers()
  .item(1)
  .getSource()
  .on('change', function () {
    // 当数据请求完毕后
		......
  })
```

## 要素(feature)

 VectorSource的url指向的是geojson文件, 文件中包含了若干个feature, 即要素.

我们可以通过 VectorSource的getFeatures()方法获取包含了当前source包含的feature构成的数组

```js
const source = map.getLayers().item(1).getSource()
const a1 = source.getFeatures()
```

通过数组的length属性获取feature数量

```js
map
  .getLayers()
  .item(1)
  .getSource()
  .on('change', function () {
    // 当数据请求完毕后
    const length = this.getFeatures().length
    const h1 = document.createElement('h1')
    h1.textContent = `中国一共有${length}个省`
    document.body.appendChild(h1)
    h1.style.position = 'absolute'
    h1.style.width = '100%'
    h1.style.textAlign = 'center'
    h1.style.pointerEvents = 'none'
  })
```

### 设置feature样式

feature的setStyle()方法可以为每个feature设置单独的样式

当无参数时, 将重设为layer的style; 将style对象作为参数传入时, 样式将被应用在feature

```js
const clickStyle = new Style({
  fill: new Fill({
    color: 'blue',
  }),
})

map.on('click', function (e) {
  const source = map.getLayers().item(1).getSource()
  // 将所以省份重置为默认样式
  source.getFeatures().forEach(feature => feature.setStyle())
  // 获取点击的经纬度
  const coordinate = e.coordinate
  // 根据点击的经纬度找到对应的省份feature
  const feature = source.getFeaturesAtCoordinate(coordinate)[0]
  // 设置点击的省份样式
  feature.setStyle(clickStyle)
})
```

本示例监听了map的点击事件, 通过事件对象的coordinate获取点击位置的经纬度坐标

```js
const coordinate = e.coordinate
```

使用VectorSource的getFeaturesAtCoordinate()方法获取一个包含feature的数组, 一般第一项就是被点击到的feature

```js
const feature = source.getFeaturesAtCoordinate(coordinate)[0]
```

调用feature的setStyle()方法, 将clickStyle样式对象作为参数, 设置feature的样式

```js
feature.setStyle(clickStyle)
```

### 创建要素并添加到矢量图层

我们也可以使用Feature类创建feature对象, 通过调用VectorSource的addFeature()方法, 可以将feature显示在VectorSource配置到的VectorLayer矢量图层

```js
const center = [114.964271, 35.935766]
const iconFeature = new Feature({
  geometry: new Point(center),
})
// 将feature(要素)添加到矢量图层中
vectorLayerr.getSource().addFeature(iconFeature)
```

Feature的geometry选项设置了feature的几何形状, 示例中使用了point对象, 并设置中心点为view的中心点

## 点要素

把Feature的geometry选项的值设为point对象, 即可创建点要素

### 给点要素添加图片和文字

给点要素设置样式时, style对象的image选项可以设置图片样式, 取值通常是个icon对象

```js
iconFeature.setStyle(
  new Style({
    image: new Icon({
      // 也可以添加canvas(通过img属性设置?)或者svg(通过src属性设置?)
      // img属性设置dom对象, src属性设置图片路径
      src: './地点.png',
      width: 40,
      height: 40,
      anchor: [0.5, 1],
    }),
  })
)
```

Icon类的img选项取值是一个dom对象,比如canvas, src选项是一个路径, 指向图片文件或svg文件.

anchor选项设置图片的锚点(和point重合的点), 默认值是[0.5,05],即图片中心, 本示例设置为了底部中心.

text选项可以设置文字样式(像设置标签)

```js
const iconFeature = new Feature({
  geometry: new Point(center),
})
// 给点要素添加图片
iconFeature.setStyle(
  new Style({
    text: new Text({
      text: '中心点',
      font: '16px sans-serif',
      fill: new Fill({
        color: 'black',
      }),
      offsetY: 30,
    }),
  })
)
```

#### 完整示例

```js
const iconFeature = new Feature({
  geometry: new Point(center),
})
// 给点要素添加图片
iconFeature.setStyle(
  new Style({
    image: new Icon({
      // 也可以添加canvas(通过img属性设置?)或者svg(通过src属性设置?)
      // img属性设置dom对象, src属性设置图片路径
      src: './地点.png',
      width: 40,
      height: 40,
    }),
    text: new Text({
      text: '中心点',
      font: '16px sans-serif',
      fill: new Fill({
        color: 'black',
      }),
      offsetY: 30,
    }),
  })
)
```

## 圆形要素

Feature的geometry选项设置为circle对象

```js
// 在地图上加载一个矢量图层
const vectorLayer = new VectorLayer({
  source: new VectorSource({}),
})
map.addLayer(vectorLayer)

// 鼠标点击时,以点为中心画圆
map.on('click', function (e) {
  const coordinate = e.coordinate
  const feature = new Feature({
    geometry: new Circle(coordinate, 0.1),
  })
  feature.setStyle(
    new Style({
      fill: new Fill({ color: 'red' }),
    })
  )
  vectorLayer.getSource().addFeature(feature)
})

```

注意, 若未配置VectorLayer的source选项, 则 vectorLayer.getSource()会获取到null, 所以即使是个配置项为空的vectorSource对象, 也要设置给vectorLayer的source选项

## 线形要素

Feature的geometry选项设置为lineString对象

```js
// 鼠标点击时,以添加线
map.on('click', function (e) {
  const coordinate = e.coordinate
  const feature = new Feature({
    geometry: new LineString([coordinate, [coordinate[0] + 0.1, coordinate[1] + 0.1]]),
  })
  feature.setStyle(
    new Style({
      stroke: new Stroke({
        color: 'red',
        width: 10,
      }),
    })
  )
  secondLayer.getSource().addFeature(feature)
})
```

## 多边形要素

Feature的geometry选项设置为Polygon对象

```js
// 鼠标点击时,绘制多边形
map.on('click', function () {
  const feature = new Feature({
    geometry: new Polygon([
      [
        [116.46, 39.92],
        [121.48, 31.22],
        [113.23, 23.16],
        [116.46, 39.92],
      ],
    ]),
  })
  feature.setStyle(
    new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.5)',
      }),
    })
  )
  secondLayer.getSource().addFeature(feature)
})
```

注意Polygon类的参数是一个三维数组. 最外层数组的每个元素是一个数组, 表示一个多边形; 多边形数组的每个元素也是一个数组,表示每个点的坐标. **注意多边形数组的坐标要`闭合`, 即第一个坐标数组和最后一个坐标数组相同**

## 清除要素

```js
source.clear()
```

## 两点之间连线

点击的两点之间连线

```js
import TileLayer from 'ol/layer/Tile'
import './style.css'
import { Feature, Map, View } from 'ol'
import { XYZ } from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import { LineString, Point } from 'ol/geom'
import Icon from 'ol/style/Icon'
import Stroke from 'ol/style/Stroke'

const map = new Map({
  target: 'map',
})
const view = new View({
  projection: 'EPSG:4326',
  center: [116.46, 39.92],
  zoom: 10,
})
const tileLayer = new TileLayer({
  source: new XYZ({
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
    wrapX: false,
  }),
})
const vectorLayer = new VectorLayer({})
const source = new VectorSource()
map.setView(view)
map.addLayer(tileLayer)
map.addLayer(vectorLayer)
vectorLayer.setSource(source)

let doNotClear = 0
const coordinates = []
const pointStyle = new Style({
  image: new Icon({
    src: './地点.png',
    width: 32,
    height: 32,
    anchor: [0.5, 1],
  }),
})
const lineStyle = new Style({
  stroke: new Stroke({
    color: 'blue',
    width: 3,
  }),
})

map.on('click', function (e) {
  doNotClear = (doNotClear + 1) % 3
  if (!doNotClear) {
    source.clear()
    return
  }
  const iconFeature = new Feature({
    geometry: new Point(e.coordinate),
  })
  iconFeature.setStyle(pointStyle)
  source.addFeature(iconFeature)
  switch (doNotClear) {
    case 1:
      coordinates[0] = e.coordinate
      break
    case 2:
      coordinates[1] = e.coordinate
      const lineFeature = new Feature({
        geometry: new LineString(coordinates),
      })
      lineFeature.setStyle(lineStyle)
      source.addFeature(lineFeature)
      break
  }
})
```

