<template>
  <v-chart :option="option"></v-chart>
</template>

<script setup>
import { ref } from 'vue'
// 方式二: 按需导入
// 使用官方提供的代码生成器
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([GridComponent, LineChart, CanvasRenderer])

const option = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: false,
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      areaStyle: {
        color: 'purple',
        opacity: 1,
      },
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        color: 'purple',
      },
      smooth: true,
    },
  ],
})
</script>

<style scoped>
.echarts {
  width: 400px;
  height: 300px;
}
</style>
