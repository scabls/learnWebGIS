# Mock

## vite-plugin-mock-server包

在vite.config.js中设置

```js
import mockServer from 'vite-plugin-mock-server'

export default defineConfig({
  plugins: [
    ...
    mockServer(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

mockServer可以接收配置项, 这里采用了默认配置

在项目根目录新建mock文件夹, 新建xxx.mock.js格式的js文件.比如plot.mock.js

```js
import mockjs from 'mockjs'

export default [
  {
    pattern: '/api/travelPopulation',
    method: 'GET',
    handle: (req, res) => {
      const data = mockjs.mock({
        'area|5': [
          {
            name: '@county()',
            population: '@integer(10000, 50000)',
          },
        ],
      })
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(data))
    },
  },
  {
    pattern: '/api/bus',
    method: 'GET',
    handle: (req, res) => {
      const data = mockjs.mock({
        'area|5': [
          {
            name: '@county()',
            bus: '@integer(10, 40)',
          },
        ],
      })
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(data))
    },
  },
  {
    pattern: '/api/population',
    method: 'GET',
    handle: (req, res) => {
      const data = mockjs.mock({
        'area|4': [
          {
            name: '@county()',
            population: '@integer(200, 400)',
          },
        ],
      })
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(data))
    },
  },
]
```

这样当访问当前项目链接+pattern时, 就会获得mock的数据, 注意res.end()的参数只能是json字符串, 为了防止中文乱码, 可以设置响应头

# G2plot

与G2的链式调用相比, G2plot的语法更像Echarts的选项式,

在vue中使用可以借助第三方包G2Plot Vue

> vue中使用echarts借助第三方包vue-echarts

## 基本使用

### 第一种方式

```vue
<template>
  <CommonCard title="武汉三镇人口统计">
    <PieChart v-bind="config" :data class="chart" />
  </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import { PieChart } from '@opd/g2plot-vue'
import { getPopulation } from '@/api/plot'
import { ref, onMounted } from 'vue'

const data = ref([])
const config = ref({
  appendPadding: 10,
  angleField: 'population',
  colorField: 'name',
  radius: 0.9,
  label: {
    labelHeight: 28,
    content: '{name}',
  },
  interactions: [{ type: 'element-active' }],
  height: 270,
  legend: {
    position: 'top',
    itemName: {
      style: {
        fill: '#fff',
      },
    },
  },
})

onMounted(async () => {
  data.value = await getPopulation().then(res => res.area)
})
```

config是图表的配置项, 类似于echart的option, 但Attribute 绑定的方式不一样

v-bind绑定config时, 无参数,只有作为值的config对象, 也就是说将config对象的属性绑定到同名arribute上

> 而v-bind绑定echart的option时是要将对象绑定到option attribute上

config对象中可以有data选项, 与其他配置项一同借由config绑定到对应的attribute, 也可以如示例所示单独绑定.

某些图表在初始化时若绑定空的config, 即完全没有初始配置项时就会报错, 比如示例的PieChart. 

所以我们可以在config中初始化好data之外的配置项. 然后在请求到数据后再设置config的data属性

也可以将data与config分开绑定, 在获取到数据后, 为data Arribute绑定的值赋值

### 第二种方式

使用config绑定所有配置.

初始化一个不包含data属性的config, 在挂载阶段获得数据后, 重新为config的data属性赋值

```vue
<template>
  <CommonCard title="武汉各区公交在线表">
    <RoseChart v-bind="config" class="chart" />
  </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import { RoseChart } from '@opd/g2plot-vue'
import { ref, onMounted } from 'vue'
import { getBus } from '@/api/plot'

const config = ref({
  xField: 'name',
  yField: 'bus',
  seriesField: 'name',
  appendPadding: 10,
  radius: 0.9,
  label: {
    offset: -15,
  },
  state: {
    active: {
      style: {
        lineWidth: 0,
        fillOpacity: 0.65,
      },
    },
  },
  interactions: [{ type: 'element-active' }],
})

onMounted(async () => {
  const data = await getBus().then(res => res.area)
  config.value.data = data
})
```

### 第三种方式

使用config绑定所有配置.

初始化一个空config, 不含data等任何数据. 声明一个函数, 在挂载阶段获得数据后, 重新为config赋值

```vue
<template>
  <CommonCard title="武汉各区出行人口统计">
    <ColumnChart v-bind="config" class="chart" />
  </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'
import { ref, onMounted } from 'vue'
import { getTravelPopulation } from '@/api/plot'
import { ColumnChart } from '@opd/g2plot-vue'

const config = ref({})

const renderChart = data => {
  config.value = {
    data,
    autoFit: true,
    appendPadding: [18, 0, 0, 0],
    xField: 'name',
    yField: 'population',
    seriesField: 'population',
    label: {
      position: 'top',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    maxColumnWidth: 20,
    color: ({ population }) => {
      if (population > 40000) return 'red'
      else if (population > 30000) return 'orange'
      else if (population > 20000) return 'yellow'
      else return 'green'
    },
    legend: false,
    tooltip: {
      field: 'population',
      formatter: datum => {
        return { name: '出行人口', value: datum.population }
      },
    },
  }
}

onMounted(async () => {
  const data = await getTravelPopulation().then(res => res.area)
  renderChart(data)
})
</script>
```

color可以设置为固定值, 也可以是一个方法, 参数为data数组中的每个对象(每条数据). 这里解构出来每条数据的population属性, 根据其映射颜色

tooltip映射了population字段, 并格式化设置了显示内容

# vite

## public和src目录中资源的使用方式

public下的资源不参与打包, 可直接使用相对路径引入

比如文件路径是这个, 则引入的时候路径就是`./favicon.ico`

```
public\favicon.ico
```

src下的资源会参与打包, 在css中可以通过`@/path/...`的方式引入, 比如作为背景图片时

```css
background-image: url('@/assets/images/header.png');
```

但在js中不能直接通过路径访问, 需要使用import引入

```js
import hospitalIcon from '@/assets/images/icons/医院.png'
...
{
  title: '医院',
  value: '30',
  quantifier: '家',
  src: hospitalIcon,
  size: 65,
},
```

