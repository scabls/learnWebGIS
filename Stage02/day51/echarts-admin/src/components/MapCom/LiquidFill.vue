<template>
  <v-chart :option="option"></v-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 导入liquidfill模块
import 'echarts-liquidfill'
import { getReportData } from '@/api'

const option = ref({})

const renderChart = data => {
  option.value = {
    series: [
      {
        type: 'liquidFill',
        data: [data],
        color: ['red'],
        radius: '80%', // 水球的半径
        outline: {
          borderDistance: 2, // 轮廓的距离(padding)
          itemStyle: {
            borderWidth: 2, // 轮廓的宽度(border)
          },
        }, // 轮廓线
        amplitude: '4%', // 波浪的高度(振幅)
      },
    ],
  }
}

onMounted(async () => {
  const res = await getReportData()
  const data = (res.salesGrowLastDay / 100).toFixed(2)
  renderChart(data)
})
</script>

<style scoped></style>
