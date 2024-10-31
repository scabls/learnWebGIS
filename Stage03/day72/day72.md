# l7

## 3D弧线图

```js
  bridgeLayer = new LineLayer({ name: '桥梁' })
    .source(bridgesData)
    .shape('arc3d')
    .size(5)
    .color('name', ['red', 'blue', 'green', 'orange'])
    .animate({
      duration: 4,
      interval: 0.2,
      trailLength: 4,
    })
    .style({
      thetaOffset: 1.5,
    })
    .active(true)
    .select(true)
  scene.value.addLayer(bridgeLayer)
```

此处color选项使用name字段进行映射,将传入图层的数据中提取的name值去重后作为 `domain` , 映射的`range`为后面的颜色数组

### style配置选项

| style         | 类型     | 描述                               | 支持数据映射 | 默认值 |
| :------------ | :------- | :--------------------------------- | :----------- | :----- |
| opacity       | `number` | 透明度，支持数据映射               | 是           | `1`    |
| segmentNumber | `number` | 弧线分段，分段越多越平滑，消耗越大 | 否           | `30`   |
| thetaOffset   | `number` | 弧线的弧度参数                     | 是           | `1`    |

## LayerPopup信息框

LayerPopup 基于 Popup 封装的，专门用于展示图层元素信息的气泡。

```js
  popupLayer = new LayerPopup({
    items: [
      {
        layer: bridgeLayer,
        title: f => f.name, // 将feature的name属性作为popup的标题
        fields: [
          {
            field: 'info',
            formatField: '桥梁信息', //等价于 ()=>'桥梁信息'
          },
        ],
      },
    ],
    trigger: 'click',
  })
  scene.value.addPopup(popupLayer)
```

## 根据路由参数创建不同Draw实例

使用路由守卫更新Draw实例

```js
import { onMounted, onUnmounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'
import { DrawLine, DrawCircle, DrawRect, DrawPolygon } from '@antv/l7-draw'

let drawer

const route = useRoute()
const { map, scene, targetCenter, targetZoom, targetPitch } =
  storeToRefs(useMapStore())

const initDrawer = type => {
  switch (type) {
    case 'polyline':
      drawer = new DrawLine(scene.value, { distanceOptions: {} })
      break
    case 'rectangle':
      drawer = new DrawRect(scene.value, {
        distanceOptions: {
          distanceOptions: {},
          areaOptions: {},
          liveUpdate: true,
        },
      })
      break
    case 'polygon':
      drawer = new DrawPolygon(scene.value, {
        distanceOptions: {},
        areaOptions: {},
        liveUpdate: true,
      })
      break
    case 'circle':
      drawer = new DrawCircle(scene.value, {
        distanceOptions: {},
        areaOptions: {},
        liveUpdate: true,
      })
      break
  }
  drawer.enable()
}

onMounted(() => {
  map.value.flyTo({
    center: targetCenter.value,
    zoom: targetZoom.value,
    pitch: targetPitch.value,
  })
  initDrawer(route.params.type)
})
onBeforeRouteUpdate(to => {
  if (drawer) drawer.destroy()
  initDrawer(to.params.type)
})
onUnmounted(() => {
  if (drawer) drawer.destroy()
})
```

或者watch `route.params.type`,在回调函数中更新Draw实例