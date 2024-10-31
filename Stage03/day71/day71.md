# L7

## layer

layer的方法一般返回当前layer实例, 也就是说, 可以链式调用.

> mapbox的大部分方法也都是返回当前实例

```js
const layer = new BaseLayer(option) // option - 传入构造函数的参数对象，提供 layer 的初始状态
  .source(...)    // 传入图层需要的数据以及相关的解析器
  .filter()       // 数据过滤方法
  .shape(...)     // 为图层指定具体的形状，如：circle/triangle 等
  .color(...)     // 指定图层的颜色配置
  .texture(...)   // 指定图层引用的纹理
  .size(...)      // 设置图层元素的大小
  .animate(...)   // 设置图层元素的动画模式
  .active(...)    // 指定图层元素是否支持划过选中
  .select(...)    // 指定图层元素是否支持点击选中
  .style(...);    // 指定图层自定义样式的配置

scene.addLayer(layer);
```

## 城市建筑

`CityBuildingLayer` 用于构建城市建筑 3D 模型, 展示城市建筑

```js
  buildingsLayer = new CityBuildingLayer({ name: '建筑' })
    .source(buildingsData)
    .size('Elevation') //映射Elevation字段的值作为size, 等价于size('Elevation', h => h)
    .filter('Elevation', h => h >= 20) //根据Elevation字段的值过滤数据
    .active(true)
    .animate(true)
    .style({
      opacity: 0.8,
      baseColor: 'rgb(16,16,16)' /*颜色*/,
      windowColor: 'rgb(30,60,89)' /*窗口颜色*/,
      brightColor: 'rgb(255,176,38)' /*亮度颜色*/,
      sweep: {
        enable: true,
        sweepRadius: 10,
        sweepCenter: targetCenter.value,
        sweepColor: '#1990FF' /*扫光颜色*/,
        sweepSpeed: 0.5 /*扫光速度*/,
      },
    })
```

可以看到有些方法,如size和filter, 可以映射字段值

size映射Elevation字段的值作为size

filter过滤数据, 保留指定字段值使回调函数返回true的数据

## 道路图层

LineLayer图层

color映射type字段, 根据不同的属性值返回不同颜色

```js
  roadsLayer = new LineLayer({ name: '道路' })
    .source(roadsData)
    .shape('line')
    .size(1)
    .color('type', type => {
      switch (type) {
        case 'motorway':
          return '#F9D371'
        case 'motorway_link':
          return '#3DB2FF'
        case 'trunk':
          return 'green'
        case 'trunk_link':
          return '#6E85B2'
        case 'primary':
          return '#F47340'
        case 'primary_link':
          return '#F6A9A9'
        case 'secondary':
          return '#EF2F88'
        case 'secondary_link':
          return '#5F7A61'
        case 'tertiary':
          return '#1ee3cf'
        case 'tertiary_link':
          return '#C2F784'
        case 'pedestrian':
          return '#FFF89A'
        case 'residential':
          return 'rgba(22, 119, 255, .5)'
        case 'road':
          return '#93FFD8'
        case 'path':
          return '#BAFFB4'
        case 'unclassified':
          return '#D3DEDC'
        case 'service':
          return '#AEFEFF'
        case 'living_street':
          return '#9B0000'
        case 'track':
          return '#F5F5F5'
        case 'highway':
          return 'red'
        case 'rail':
          return '#08ffc8'
        default:
          return '#FFE3E3'
      }
    })
    .active(true)
    .animate({
      interval: 1, // 间隔
      duration: 1, // 持续时间，延时
      trailLength: 2, // 流线长度
    })
    .style({
      opcity: 0.5,
    })
```

## 图层显隐控制

```js
layerSwitch = new LayerSwitch({
  layers: [buildingsLayer, roadsLayer],
})
scene.value.addControl(layerSwitch)
```

## 离开当前路由组件时移除图层

```js
onUnmounted(() => {
  scene.value.removeLayer(buildingsLayer)
  scene.value.removeLayer(roadsLayer)

  scene.value.removeControl(layerSwitch)
})
```

## 拉框搜索

### 模板和样式

```vue
<template>
  <div class="search-view">
    <el-table
      :data="tableData"
      class="table"
      max-height="240"
      v-show="tableData.length"
      @row-dblclick="handleRowClick"
    >
      <el-table-column prop="event_num" label="事故编号" align="center" />
      <el-table-column
        prop="level"
        label="事故等级"
        align="center"
        width="80"
      />
      <el-table-column prop="name" label="事故类型" align="center" />
      <el-table-column prop="car_num" label="车牌编号" />
      <el-table-column prop="area" label="区域" align="center" width="70" />
      <el-table-column prop="phone" label="手机号" align="center" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.search-view {
  .table {
    position: fixed;
    left: 20%;
    bottom: 90px;
    width: 60%;
    background-color: transparent;
    z-index: 10;
    cursor: pointer;
    :deep(.el-table__inner-wrapper) {
      .el-table__header-wrapper {
        tr {
          background-color: transparent;
          .el-table__cell {
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .el-table__body-wrapper {
        .el-table__row {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          &:hover {
            .el-table__cell {
              background-color: rgba(0, 0, 0, 0.8);
            }
          }
        }
      }
    }
  }
}
</style>
```

### js功能

#### 导入区

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Control, PointLayer } from '@antv/l7'
import { DrawEvent, DrawRect } from '@antv/l7-draw'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'
import { pointsWithinPolygon } from '@turf/turf'
import { getEvents } from '@/api/search'

const { map, scene, targetCenter, targetZoom, targetPitch } =
  storeToRefs(useMapStore())
</script>
```

#### 自定义l7控件, 点击开启绘制

```js
// 点击拉框按钮, 可以绘制矩形, 在矩形中查找范围内数据, 绘制点图层, 并用表格展示数据
const tableData = ref([])
const isDrawing = ref(false)

const layers = []

const draw = new DrawRect(scene.value, {})
const drawControl = new Control()

drawControl.onAdd = () => {
  const container = document.createElement('div')
  container.textContent = '拉框查询'
  container.classList.add('l7-button-control')
  container.addEventListener('click', () => {
    isDrawing.value = !isDrawing.value
    if (isDrawing.value) {
      draw.enable()
    } else {
      draw.clear()
      draw.disable()
      removePreviousLayer()
      tableData.value = []
    }
  })
  return container
}

const removePreviousLayer = () => {
  layers.forEach(layers => scene.value.removeLayer(layers.pointLayer))
  layers.length = 0
}
```

#### el-table行点击事件处理函数

```js
const handleRowClick = ({ center }) => {
  map.value.flyTo({
    center: center,
    zoom: 18,
    pitch: 0,
  })
  draw.clear()
  draw.disable()
}
```

#### 挂载阶段实现拉框搜索

```js
onMounted(async () => {
  map.value.flyTo({
    center: targetCenter.value,
    zoom: targetZoom.value,
    pitch: targetPitch.value,
  })
  const data = await getEvents() //获取数据, 获取数据之后再执行功能的实现
  scene.value.addControl(drawControl)
  draw.on(DrawEvent.Add, feature => {
    renderLayer(feature) //获取到绘制的图层, 根据绘制图层筛选点数据并渲染
  })
  draw.on(DrawEvent.Edit, feature => {
    clearRecords(feature) //清除之前的绘制范围内的点数据和表格内的记录
    renderLayer(feature) //重新渲染当前绘制筛选出的点图层
  })
  const renderLayer = feature => {
    const drawId = feature.properties.id //获取本次draw的feature的id
    const points = pointsWithinPolygon(data, feature) //根据绘制的矩形范围筛选出数据
    const pointLayer = new PointLayer({ name: `交通事故${Date.now()}` })
      .source(points)
      .shape('circle')
      .animate(true)
      .size(40)
      .color('#ffa842')
      .active(true)
    scene.value.addLayer(pointLayer)
    layers.push({ drawId, pointLayer }) //存储绘制id和筛选出的点图层,方便在拖动draw图层时移除并重新筛选
    points.features
      .map(f => ({
        ...f.properties,
        center: f.geometry.coordinates,
        drawId, //给表格记录的点数据添加drawId属性, 方便在拖动draw图层时更新表格记录的当前范围内的点数据
      }))
      .forEach(item => {
        if (tableData.value.some(d => d.id === item.id)) return
        tableData.value.push(item)
      }) //将筛选出的点数据格式化后添加到表格数据中, 并保证表格数据不重复
  }
  const clearRecords = feature => {
    const drawId = feature.properties.id //获取拖动的draw图层的id
    const index = layers.findIndex(layer => layer.drawId === drawId) //根据绘制id找到之前筛选并渲染的点图层
    if (index === -1) return //如果没有找到对应的点图层, 则直接返回
    scene.value.removeLayer(layers[index].pointLayer) //在scene中移除找到的点图层
    layers.splice(index, 1) //移除点图层在数组中的记录
    tableData.value = tableData.value.filter(d => d.drawId !== drawId) //要保证表格数据只包含绘制范围内的点, 所以移除draw图层上次筛选范围内的表格数据
  }
})
```

#### 卸载阶段移除图层

```js
onUnmounted(() => {
  scene.value.removeControl(drawControl)
  removePreviousLayer()
  draw.destroy()
})
```

# 包管理器

## 调用当前环境下的包

要以npx开头, 以json-server为例

```bash
npx json-server --watch MockJson.cjs --port 3333
```

简写

```
npx json-server --w MockJson.cjs --p 3333
```

## 在package.json设置快捷命令

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --fix",
  "format": "prettier --write src/",
  "mock": "json-server --watch MockJson.cjs --port 3333"
},
```

此时使用在命令行输入快捷命令就会自动执行对应的命令

```
pnpm mock
```

## json-server

将json文件部署在本地服务器. 如果出错了,不妨试试0.17.4版本

# L7Draw

l7的绘制扩展包,功能强大

# Turf

适用于浏览器和Node.js的高级地理空间分析。比如查询数据在指定矩形feature范围内有多少个点feature

```js
const points = pointsWithinPolygon(data, feature)
```

# JS

## Array

使用数组长度来清空数组

```js
array.length = 0
```

