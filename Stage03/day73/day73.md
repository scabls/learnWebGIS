# 封装类element ui的select组件

## App.vue

```vue
<template>
  <my-select v-model="value" placeholder="Select">
    <my-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </my-select>
</template>

<script setup>
import MySelect from './components/MySelect.vue'
import MyOption from './components/MyOption.vue'
import { ref } from 'vue'

const value = ref('')

const options = ref([
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
])
</script>

<style scoped></style>
```

## MySelect.vue

- 使用scrollHeight计算内容区应有的高度, 实现高度从0到合适高度的过渡
- 范围外点击函数的封装

```vue
<template>
  <div class="my-select" ref="mySelect">
    <div class="wrapper" @click="toggleUlShow" ref="wrapper">
      <input type="text" readonly :value :placeholder :class="{ activated: activated }" />
      <span class="icon" :class="{ active: isShow }">↑</span>
    </div>
    <div class="ul-outer" :style="{ height: UlHeight }" ref="ulOuter">
      <ul>
        <slot />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, provide, ref, useTemplateRef } from 'vue'

const value = defineModel()
const { placeholder } = defineProps({
  placeholder: {
    type: String,
    default: '请选择',
  },
})
// 将value提供到option组件中, 并避免在option中直接修改value
provide('fromSelect', {
  selectValue: value,
  updataSelectValue: val => (value.value = val),
})
// 获取模板引用
const mySelect = useTemplateRef('mySelect')
const wrapper = useTemplateRef('wrapper')
const ulOuter = useTemplateRef('ulOuter')
// 列表的激活状态
const activated = ref(false)
// 点击wrapper区展开ul, 再次点击或者点击wrapper区之外收起ul
const isShow = ref(false)
// 设置ul-outer的高度为0,此时ul就是ul-outer的溢出内容区
// 获取溢出的内容区的高度(scrollHeight), 即ul的应有的高度, 然后设置ul-outer的高度为ul的应有高度
const UlHeight = computed(() => (isShow.value ? ulOuter.value.scrollHeight + 'px' : 0))
// 点击wrapper区切换ul的显示状态
const toggleUlShow = () => {
  activated.value = true
  isShow.value = !isShow.value
}
// 点击wrapper区之外收起ul
// 封装一个函数, 传入目标元素和范围在目标元素外时要执行的函数
const outsideClick = (target, fn) => {
  document.addEventListener('click', function (e) {
    // 当点击到的node不被ul-outer包含时, 执行传入的函数
    if (!target.contains(e.target)) fn()
  })
}

onMounted(() => {
  // 确保执行这个函数时, wrapper已经渲染完成
  outsideClick(wrapper.value, () => {
    if (isShow.value) {
      isShow.value = false
    }
  })
  // 点击select区之外的地方, 取消激活状态
  outsideClick(mySelect.value, () => {
    activated.value = false
  })
})
</script>

<style lang="scss" scoped>
.my-select {
  position: relative;
  top: 1rem;
  width: 240px;
  margin: 0 auto;
  .wrapper {
    position: relative;
    align-content: center;
    input {
      width: 100%;
      height: 2rem;
      background-color: #fff;
      padding: 0.5rem;
      border: 2px solid rgb(204, 204, 204, 0.5);
      border-radius: 0.5rem;
      outline: none;
      transition: 0.1s;
      cursor: pointer;
      &:hover {
        border-color: #c0c4cc;
      }
      &:active {
        border-color: rgb(173, 216, 230);
      }
      &.activated {
        border-color: rgb(173, 216, 230);
      }
    }
    .icon {
      position: absolute;
      right: 0.5rem;
      height: 100%;
      align-content: center;
      transition: 0.3s;
      cursor: pointer;
      &.active {
        transform: rotate(180deg);
      }
    }
  }
  .ul-outer {
    position: absolute;
    top: 2.5rem;
    left: 0;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    cursor: pointer;
    overflow: hidden;
    ul {
      list-style: none;
    }
  }
}
</style>
```

## MyOption.vue

```vue
<template>
  <li :class="{ selecte: value === selectValue }" @click="updataSelectValue(value)">
    {{ label }}
  </li>
</template>

<script setup>
import { inject } from 'vue'

const { lablel, value } = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})
// 根据选中的值来设置当前选项的样式
// 点击选项更新选中的值
const { selectValue, updataSelectValue } = inject('fromSelect')
</script>

<style lang="scss" scoped>
li {
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #333;
  &:hover {
    background-color: rgb(102, 102, 102, 0.1);
  }
  &.selecte {
    color: lightblue;
  }
}
</style>
```

# Openlayer

示例在day64

## View-监听分辨率/zoom改变事件

```js
view.on('change:resolution', () => {
  const zoom = view.getZoom()
  if (zoom >= 12) {
    layerVisible.value = false
    canAddMarker.value = true
  } else {
    layerVisible.value = true
    canAddMarker.value = false
  }
})
```

## Feature: setStyle()

现在需求点击地图时, 若满足某种状态, 则向地图上添加一个点feature

```js
map.on('click', e => {
  if (!canAddMarker.value) return
  if (!iconType) return
  if (iconType === 'stopMark') return
  if (iconType === 'clearMark') return
  const coordinate = e.coordinate
  const marker = new Feature({
    geometry: new Point(coordinate),
  })
  marker.set('icon', icons[iconType + 'Icon'])
  // marker.setProperties({ icon: icons[iconType + 'Icon'] })
  markerSource.addFeature(marker)
})
```

于是, 点击的时候, 新建了一个feature, 并将其geometry属性设置为Geom类的Point子类的实例对象.

此时我们可以对这个feature调用setStyle方法设置这个feature的样式, 否则, 它将沿用所属vectorlayer的style

style对象有诸多属性, 如image, text ,fill ,stroke等, 每个属性都期望一个对应的对象

## source/Cluster

现在地图上有许多点feature, 要求缩放级别变小时, 将距离近的点聚合成一个点, 即点的聚合效果

这时就可以使用vectorSource类的子类Cluster类来实现

```js
const setClusterStyle = feature => {
  console.log(feature.getProperties())
  const markerCount = feature.get('features').length // != markerSource.getFeatures().length
  const style = new Style()
  if (markerCount === 1) {
    style.setImage(
      new Icon({
        src: feature.get('features')[0].get('icon'),
      })
    )
  } else {
    style.setImage(
      new CircleStyle({
        radius: 15,
        stroke: new Stroke({
          color: '#fff',
        }),
        fill: new Fill({
          color: '#3399CC',
        }),
      })
    )
    style.setText(
      new Text({
        text: markerCount.toString(),
        fill: new Fill({
          color: '#fff',
        }),
      })
    )
  }
  return style
}
const markerSource = new VectorSource()
const markerClusterSource = new Cluster({
  source: markerSource,
  distance: 40,
})
const markerLayer = new VectorLayer({
  source: markerClusterSource,
  style: f => setClusterStyle(f),
})
```

Cluster的source属性指定要聚合的feature所属的vectorSource；distance属性指定聚合feature的距离阈值，单位是像素，当在屏幕上的距离小于阈值时就会被聚合。

如示例所示，markerLayer的source是markerClusterSource，markerClusterSource是markerSource。当我们要向layer添加点feature时，要添加到 markerSource上，此时markerClusterSource会对markerSource中的feature进行聚合，展示在map上。

即使只有一个feature，也是与`自己`聚合过的。也就是说，当vectorlayer的source设置为Cluster实例时，展示的feature都是聚合feature，而聚合来源就是Cluster的source上的feature

所以，单独为markerSource中的feature设置的style是不会生效的，因为展示的并不是其中的feature。要自定义Cluster的feature样式，就要使用vectorLayer的style属性或其对应的set方法

style属性不仅可以接收一个style对象，还可以是一个StyleFunction；这个函数的参数是每个feature，返回值一般是要应用的style对象，这样，就可以针对feature的聚合情况设置自定义样式

实例所示 ，当聚合的feature只有一个时，就将feature设为每个源feature单独的指定样式，聚合的数量大于一个时，就指定聚合样式。而详细实现，使用到了set和get方法，下节介绍

## 可观察属性(observable properties)

ol的几乎所有类都继承自BaseObject，而BaseObject继承自Observable，这使的每个对象即其属性都是可观察的，一般这些属性都有专门的读写方法。假定有target属性，则一般会有getTarget()方法用来读取，setTarget()方法用于改写；除此之外，还有通用的set()和get方法可以读写这些属性，get('target') 就相当于 getTarget()。

我们可以使用object.set('prop', 'value') 添加自己的可观察属性，并使用 object.get('prop') 检索该属性。可以使用 object.on('change:prop',listener) 监听该属性值的更改。

getProperties()获取所有属性的列表，setProperties({key1:value1,...})可以批量设置或新增属性。

需要注意的是，可观察属性和js属性是不同的, 若使用object.key1设置了key1属性, 是无法被get类方法观察到的

unset()方法可以删除指定属性，例如object.unset('key1')

### 示例使用讲解

上方示例为每个feature设置了icon属性, 属性值即是对应的image链接。可以使用set方法, 也可以使用setProperties方法。

```js
  marker.set('icon', icons[iconType + 'Icon'])
  // marker.setProperties({ icon: icons[iconType + 'Icon'] })
```

在为cluster中的feature设置样式时，读取到其聚合的feature，当聚合数量为1时，将feature的样式设为Icon类的image, 链接就是存储在被聚合feature上的icon属性的值

```js
const setClusterStyle = feature => {
  console.log(feature.getProperties())
  const markerCount = feature.get('features').length // != markerSource.getFeatures().length
  const style = new Style()
  if (markerCount === 1) {
    style.setImage(
      new Icon({
        src: feature.get('features')[0].get('icon'),
      })
    )
  }...
  return style
}
```

这样就实现了“不聚合时”显示feature原本的样式。

但细细想来, 似乎没有必要单独设置一个icon属性，因为feature的style本就是可观测属性, 我们直接为这个feature设置style, 然后获取这个style不就好了?

### 示例的另一种实现方法

为每个添加到markerSource的feature设置样式

```js
map.on('click', e => {
  if (!canAddMarker.value) return
  if (!iconType) return
  if (iconType === 'stopMark') return
  if (iconType === 'clearMark') return
  const coordinate = e.coordinate
  const marker = new Feature({
    geometry: new Point(coordinate),
  })
  // marker.set('icon', icons[iconType + 'Icon'])
  // marker.setProperties({ icon: icons[iconType + 'Icon'] })
  marker.setStyle(new Style({ image: new Icon({ src: icons[iconType + 'Icon'] }) })) //设置style
  markerSource.addFeature(marker)
})
```

当聚合数量为一时，获取到这个被聚合feature的样式，设置为聚合feature的样式。

```js
const setClusterStyle = feature => {
  console.log(feature.getProperties())
  const markerCount = feature.get('features').length // != markerSource.getFeatures().length
  const style = new Style()
  if (markerCount === 1) {
    // style.setImage(
    //   new Icon({
    //     src: feature.get('features')[0].get('icon'),
    //   })
    // )
    return feature.get('features')[0].getStyle() //返回被聚合feature的样式
  } ...
  return style
}
```

style的image属性也是可观察属性，那么我们也可以这样实现

```js
const setClusterStyle = feature => {
  console.log(feature.getProperties())
  const markerCount = feature.get('features').length // != markerSource.getFeatures().length
  const style = new Style()
  if (markerCount === 1) {
    style.setImage(
      // new Icon({
      //   src: feature.get('features')[0].get('icon'),
      // })
      feature.get('features')[0].getStyle().getImage() //style的image属性设为被聚合feature的style的image属性
    )
  } ...
  return style
}
```

