# L7

## 配合mapbox

与mapbox可配合使用

> L7 地理可视化侧重于地理数据的可视化表达，地图层需要依赖第三方地图，第三方地图通过 Scene 统一创建管理，只需要通过 Scene 传入地图配置项即可。

将l7.Scene的map属性设为l7.Mapbox的实例, 并设置l7.Mapbox的mapInstance属性将mapboxgl.Map的实例传入

```js
mapboxgl.accessToken = import.meta.env.VITE_TOKEN
map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [114.293, 30.588],
  zoom: 1,
  projection: 'globe',
})
scene = new Scene({
  id: 'map',
  map: new Mapbox({
    mapInstance: map,
  }),
  logoVisible: false,
})
```

任何scene的操作, 都应确保scene的已经加载完毕, 这点与mapbox相同

```js
map.on('style.load', () => {
  fog()
})
scene.on('loaded', () => {
  useControl(scene, map)
})
```

## 添加组件

在l7中, 称control之类的控件为组件

```js
import {
  Control,
  Scale,
  Zoom,
  Fullscreen,
  MouseLocation,
  Logo,
  MapTheme,
} from '@antv/l7'

export default (scene, map) => {
  const zoom = new Zoom({
    position: 'topleft',
  })
  const fullscreen = new Fullscreen({
    position: 'topright',
  })
  const scale = new Scale({
    position: 'rightbottom',
  })
  const mouseLocation = new MouseLocation({
    position: 'rightbottom',
  })
  const logo = new Logo({
    position: 'leftbottom',
    href: 'http://www.x-zd.com',
    img: 'http://www.x-zd.com/themes/simpleboot3_web/public/web/images/image/logo_03.png',
  })
  const mapTheme = new MapTheme({
    position: 'topright',
    options: [
      {
        text: '白天导航地图',
        value: 'mapbox://styles/mapbox/navigation-day-v1',
        img: '/themes/navigation-day-v1.png',
      },
      {
        text: '夜间导航地图',
        value: 'mapbox://styles/mapbox/navigation-night-v1',
        img: '/themes/navigation-night-v1.png',
      },
      {
        text: '标记卫星图',
        value: 'mapbox://styles/mapbox/satellite-streets-v12',
        img: '/themes/satellite-streets-v12.png',
      },
      {
        text: '普通卫星图',
        value: 'mapbox://styles/mapbox/satellite-v9',
        img: '/themes/satellite-v9.png',
      },
    ],
  })
  const controls = {
    zoom,
    fullscreen,
    mapTheme,
    mouseLocation,
    scale,
    logo,
  }

  for (const key in controls) {
    scene.addControl(controls[key])
  }

  scale.hide()

  map.on('zoom', () => {
    const nowZoom = map.getZoom()
    if (nowZoom < 5) scale.hide()
    else scale.show()
  })
}
```

注意与mapbox的不同, l7组件的位置是在实例化时的配置选项中设置的

而mapbox是在添加到map时设置的

```js
map.addControl(mapboxdirection, 'top-left')
```

## 自定义Control组件

和mapbox的自定义控件相似, 但是mapbox是自己独立定义一个类,l7是使用基类

使用基类创建实例后, 在onAdd方法中创建组件绑定的dom并设置操作逻辑, 方法返回绑定的dom

```js
const direction = new Control({
  name: 'direction',
  position: 'topleft',
})
const mapboxdirection = new MapboxDirections({
  accessToken: import.meta.env.VITE_TOKEN,
})
direction.onAdd = () => {
  const container = document.createElement('div')
  container.textContent = '导航'
  container.classList.add('l7-button-control')
  let showDirection = false
  container.addEventListener('click', () => {
    showDirection = !showDirection
    if (showDirection) {
      map.addControl(mapboxdirection, 'top-left')
    } else {
      map.removeControl(mapboxdirection)
    }
  })
  return container
}
```

上述实现了一个l7的自定义组件, 点击时向map添加mapboxdirection插件, 再点击就移除

注意正确导入插件(plugin)的类和样式

> vscode在自动导入类的时候可能会出错, 最好确认一下和css目录是否一样

```js
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
```

## 在vue3中使用

mapboxgl.Map和l7.Scene的实例化一般在**onMounted**中进行, 因为指定的地图容器一般是当前SFC的template中, 而在mounted之前, 要绑定的dom节点还未渲染.

可以将为了在onMounted回调函数外也能访问map和scene, 可以在先用let声明两个变量, 在onMounted中赋值为对应实例

```js
let map, scene
```

也可以使用ref, 在onMounted重新对其value赋值, 但注意响应式是会消耗性能的!

# Mapbox

## 雾化效果

```js
const fog = () => {
  const center = map.getCenter()
  // 添加雾化效果
  // 将效果跟中心点经度关联起来
  // 使用hsl格式的颜色，明度随中心点经度变化
  map.setFog({
    color: `hsl(0, 0%, ${Math.abs(center.lng) / 360})`,
    'high-color': `hsl(0, 0%, ${Math.abs(center.lng) / 360})`,
  })
}
```

## 地球自转

```js
let map, scene, requestID

const { isRotating } = storeToRefs(useMapStore())

const rotateEarth = () => {
  const center = map.getCenter()
  // 旋转地球并考虑经度边界(-180, 180)
  center.lng = ((center.lng + 180 + 0.1) % 360) - 180
  map.setCenter(center)
  requestID = requestAnimationFrame(rotateEarth)
}

watch(isRotating, () => {
  if (isRotating.value) {
    requestID = requestAnimationFrame(rotateEarth)
  } else {
    cancelAnimationFrame(requestID)
  }
})
```

注意在requestAnimationFrame的回调中也会再调用requestAnimationFrame, 为了能够取消, 要更新requestID

> 感觉和setInterval类似

# Vue

## 使用定时器更新展示时间

```vue
<template>
  <header class="top-header">
    <section class="date-time">
      <div class="date">{{ date }}</div>
      <div class="time">{{ time }}</div>
    </section>
    <section class="title">智慧城市-武汉</section>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'

const now = ref(new Date())

const date = computed(
  () =>
    `${now.value.getFullYear()}-${addZero(now.value.getMonth() + 1)}-${addZero(now.value.getDate())}`,
)
const time = computed(
  () =>
    `${addZero(now.value.getHours())}:${addZero(now.value.getMinutes())}:${addZero(
      now.value.getSeconds(),
    )}`,
)

const addZero = num => num.toString().padStart(2, '0')

setInterval(() => {
  now.value = new Date()
}, 1000)
</script>
```

## router和pinia

```vue
<template>
  <BaseMap />
  <TopHeader />
  <BottomArea />
  <router-view></router-view>
</template>

<script setup>
import TopHeader from './components/TopHeader.vue'
import BottomArea from './components/BottomArea.vue'
import BaseMap from './components/BaseMap.vue'
</script>

<style lang="scss"></style>
```

将对map和scene的操作分装在不同的路由组件(视图). 因为将map和scene单独封装到了一个组件, 所有为了在不同视图使用map和scene了, 在map和scene加载完毕后,将其存入pinia的store中

```js
const { setMap, setScene } = useMapStore()
...
onMounted(() => {
  map.on('style.load', () => {
    ...
    setMap(map) //map加载完成后，将map实例存入mapStore
  })
  scene.on('loaded', () => {
    ...
    setScene(scene) //scene加载完成后，将scene实例存入mapStore
  })
})
```

为了避免在切换到其他视图时, map和scene未被存入, 可以设置路由守卫, 或者实现一个loading功能

将初始视图重定向为rotate

```js
routes: [
  {
    path: '/',
    name: 'home',
    redirect: '/rotate',
  },
  {
    path: '/rotate',
    name: 'rotate',
    component: () => import('@/views/RotateView.vue'),
  },
]
```

# JS

## String

### padStart()

padStart() 方法用另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的开头开始的。

```
const addZero = num => num.toString().padStart(2, '0')
```

#### 语法

```js
padStart(targetLength)
padStart(targetLength, padString)
```

##### 参数

- targetLength
  当前 str 填充后的长度。如果该值小于或等于 str.length，则会直接返回当前 str。
- padString 可选
  用于填充当前 str 的字符串。如果 padString 太长，无法适应 targetLength，则会从末尾被截断。默认值为 Unicode“空格”字符（U+0020）。

### padEnd()

# vite

## .env

在项目根目录下创建

文件示例如下

VITE_XXXX

```js
VITE_TOKEN='pk.eyJ1IjoiemhvbmdkaXNodW1hIiwiYSI6ImNsNXJoYXR5eTI2bGgzZW53d2didWF1c3AifQ.6vOplM2NQc_xnJW3aA5ZBA'
```

通过在任意js文件中可通过import.meta.env.VITE_TOKEN访问
