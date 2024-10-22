# OpenLayers

## Overlay

Overlay类可以将指定的dom元素显示到map的某个位置

### 创建并使用overlay对象

```js
const popup = new Overlay({
  element: document.querySelector('.popup'),
  position: [114.305445, 30.592862]
})
map.addOverlay(popup)
```

element选项指定作为要附加到地图上的dom元素, 可以是dom树中的, 也可以是各种方式创建的dom对象. 若指定的是dom树中的元素, 元素会脱离原本dom树.

position选项指定元素被添加到的地图上位置

element和position选项也可以通过Overlay的方法设置

```js
overlay.setElement(element)
overlay.setPosition(position)
```

或者是es6的属性简写形式

```js
const position = [114.305445, 30.592862]
const element = document.createElement('div')
const popup = new Overlay({
  element, 
  position, 
})
```

也有方法可以从overlay对象获取这两个属性

```js
overlay.getElement()
overlay.getPosition()
```

positioning选项设置元素相对于position的定位方式,取值有

> 'bottom-left', 'bottom-center', 'bottom-right', 'center-left', 'center-center', 'center-right', 'top-left', 'top-center', and 'top-right'

默认是'top-left',这个属性也有对应的get和set方法

创建的overlay对象可以通过map.addOverlay(overlay)将对象添加到地图上

### 示例

#### 点击时创建overlay

##### 方法一

这个方法每次点击都创建一个dom元素作为overlay添加到map上

```js
map.on('click', function (e) {
  const position = e.coordinate
  const element = document.createElement('div')
  element.textContent = `此处经纬度为：经度${position[0].toFixed(2)},纬度${position[1].toFixed(2)}`
  element.style.backgroundColor = 'lightblue'
  const popup = new Overlay({
    element, // 或者使用overlay.setElement(element)
    position, // 或者使用overlay.setPosition(position)
  })
  map.addOverlay(popup)
})
```

##### 方法二

只创建一个dom, 点击时更新位置和dom的textContent

```js
const element = document.createElement('div')
element.style.backgroundColor = 'lightblue'
const popup2 = new Overlay({
  element, // 或者使用overlay.setElement(element)
})
map.on('click', function (e) {
  const position = e.coordinate
  element.textContent = `此处经纬度为：经度${position[0].toFixed(2)},纬度${position[1].toFixed(2)}`
  popup2.setPosition(position)
  map.addOverlay(popup2)
})
```

注意: 当`popup2.setPosition(undefined)`时, overlay不再显示, 可使用这种方法取消overlay显示

## ol中的事件处理

现在有一个feature, 想监听它的鼠标悬浮事件, 但ol并没有给feature提供对应的事件, 所以我们可以手动向feature派发这个事件

```js
const vectorLayer = new VectorLayer({
  source: new VectorSource(),
})
const circle = new Feature({
  geometry: new Circle(center, 0.01),
})
circle.setStyle(
  new Style({
    fill: new Fill({
      color: 'red',
    }),
  })
)
vectorLayer.getSource().addFeature(circle)
map.addLayer(vectorLayer)
circle.on('mouseover', function () {
  this.setStyle(
    new Style({
      fill: new Fill({
        color: 'blue',
      }),
    })
  )
})
```

在map的鼠标移动事件处理器中, 通过map的forEachFeatureAtPixel()方法检测每个与像素相交的feature, 并对它们执行回调函数. 回调函数的第一个参数即为feature,(第二个参数是feature所属source的layer). 调用feature的dispatchEvent()方法, 为feature派发事件

配置对象的type项指定事件类型, event项指定原始事件对象

```js
// 自定义事件
map.on('pointermove', function (e) {
  // 给circle派发一个自定义事件
  map.forEachFeatureAtPixel(e.pixel, function (feature) {
    feature.dispatchEvent({ type: 'mouseover', event: e })
  })
})
```

第二个方式是通过map的getFeaturesAtPixel()获取与像素相交的所有要素。一般要素并不重合, 所有数组中仅有的一项就是我们需要的要素, 然后为要素派发事件. 但要注意做有没有要素的判断

```js
map.on('pointermove', function (e) {
  // 给circle派发一个自定义事件
  const features = map.getFeaturesAtPixel(e.pixel)
  if (features.length === 0) return
  features[0].dispatchEvent({ type: 'mouseover', event: e })
})
```

## Interaction

与map交互的相关类, 如选取要素的Select类, 绘制要素的Draw类

## 选取要素

在上一小节中map的两个方法: forEachFeatureAtPixel()和getFeaturesAtPixel()可以获取与像素相交的所有要素,通过配合map的某些事件可以达到选取要素的效果.

除此之外, 也可以使用select对象来选取要素

### 创建并使用select对象

```js
const select = new Select({
  // 设置触发条件
  condition() {
		condition: pointerMove,
  },
})
map.addInteraction(select)
select.on('select', function (e) {
  const feature = e.selected[0]
  if (!feature) return
  // 设置选中时的样式
  feature.setStyle(
    new Style({
      fill: new Fill({
        color: 'blue',
      }),
    })
  )
})
```

Select的condition选项设置可以触发select的map事件, 需要将conditon选项的值设为ol内置的Condition函数(需要导入).默认是singleClick

```js
import { pointerMove } from 'ol/events/condition'
const select = new Select({
  condition: pointerMove,
})
```

调用map的addInteraction()方法将select对象添加到map

```js
map.addInteraction(select)
```

监听select对象的select事件, 当select事件由指定的map事件触发后, 可以获取选取到的要素数组, 一般第一项也是唯一一项就是我们期望选取的要素

```js
select.on('select', function (e) {
  const feature = e.selected[0]
  if (!feature) return
  // 设置选中时的样式
  feature.setStyle(
    new Style({
      fill: new Fill({
        color: 'blue',
      }),
    })
  )
})
```

当选中要素时, 会触发select事件, 此时可以通过事件对象e的selected属性获取所有被选中的要素.在事件处理函数中可以设置要素被选中时的样式(即仅在被选中时生效)(不设置时有默认的选中样式)

当被选中的要素不被选中时(比如示例中的鼠标移开), 还会触发一次select事件.可以通过selected数组的长度或者数组第一项是否是undefined(布尔值为false)来区分选中和取消选中两次状态,并处理不同的逻辑, 如下方示例所示:

```js
const select = new Select({
  condition: pointerMove,
})
......
select.on('select', function (e) {
  const feature = e.selected[0]
  if (feature) {
    popUp.setPosition(feature.getProperties().center)
    cursor.value = 'pointer'
    return
  } else {
    popUp.setPosition(undefined)
    cursor.value = 'default'
  }
})
```

这个示例的vectorLayer只有单一的feature作为地图的指定区域阴影遮罩, 在鼠标悬浮在feature上时设置overlay的坐标为feature的center, 并将鼠标的样式设置为了pointer. 在离开feature区域时, 将overlay的坐标设置为undefined隐藏overlay, 并将鼠标样式设置为默认

## 绘制要素

### 创建并使用draw对象

```js
const vectorSource = vectorLayer.getSource()
const strokeStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(255, 0, 0, 0.5)',
    width: 4,
  }),
})
```

```js
// 停止绘制: 左键双击 右键 滚轮
const drawLine = new Draw({
  type: 'LineString',
  source: vectorSource,
  // 绘制时的样式
  style: strokeStyle,
})
map.addInteraction(draw)
```

type选项指定绘制的feature形状(geometry),source选项指定要添加到的source对象,

style选项指定提供样式的style对象, 这里的样式仅在绘制时生效

若要绘制完成的feature应用同样的样式,需要监听draw的drawend事件, 通过事件对象拿到绘制完成的feature并设置样式

```js
// 绘制结束时, 拿到绘制的feature
drawLine.on('drawend', function (e) {
  // 绘制结束后的样式
  e.feature.setStyle(strokeStyle)
})
```

最后不要忘记, 将draw对象添加到map对象上

```js
map.addInteraction(draw)
```

建议: 防止忘记添加, 最好创建完对象就添加到map

### 示例: 通过点击按钮开启绘制

准备三个draw对象,并设置绘制进行和完成时的样式

```js
const drawLine = new Draw({
  type: 'LineString',
  source: vectorSource,
  style: strokeStyle,
})
const drawCircle = new Draw({
  type: 'Circle',
  source: vectorSource,
  // 绘制时的样式
  style: fillStyle,
})
const drawPolygon = new Draw({
  type: 'Polygon',
  source: vectorSource,
  // 绘制时的样式
  style: fillStyle,
})
// 绘制结束时, 拿到绘制的feature
drawCircle.on('drawend', function (e) {
  // 绘制结束后的样式
  e.feature.setStyle(fillStyle)
})
drawPolygon.on('drawend', function (e) {
  e.feature.setStyle(fillStyle)
})
drawLine.on('drawend', function (e) {
  e.feature.setStyle(strokeStyle)
})
```

#### 方法一

将所有draw对象都添加到map对象上, 并通过Draw的setActive()方法将激活状态设为false, 当点击按钮时将所有draw的激活状态设为false,再将对应的draw对象的激活状态设为true

```js
const interactionArr = [drawLine, drawCircle, drawPolygon]
interactionArr.forEach(draw => map.addInteraction(draw))
const disableDraw = () => interactionArr.forEach(draw => draw.setActive(false))
disableDraw()
const btns = document.querySelectorAll('.btn')
btns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    disableDraw()
    interactionArr[i].setActive(true)
  })
})
```

涉及api:`draw.setActive()`,参数是Boolean类型

#### 方法二

点击按钮时, 将所有draw对象从map移除, 再将对应draw对象添加到map

```js
const interactionArr = [drawLine, drawCircle, drawPolygon]
const removeDraw = () => interactionArr.forEach(draw => map.removeInteraction(draw))
const btns = document.querySelectorAll('.btn')

btns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    removeDraw()
    map.addInteraction(interactionArr[i])
  })
})
```

涉及api:`map.removeInteraction()`,参数是要移除的draw对象

## 控件

```js
// 地图控件
const fullScreenControl = new FullScreen()
map.addControl(fullScreenControl)
```

