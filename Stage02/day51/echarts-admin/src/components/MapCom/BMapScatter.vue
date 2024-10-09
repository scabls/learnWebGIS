<template>
  <v-chart :option="option"></v-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 引入echarts百度地图的扩展插件
import 'echarts/extension/bmap/bmap'
import { getMapData } from '@/api'

const option = ref({})

const renderChart = (scatterData, effectScatterData, styleJson) => {
  option.value = {
    // 使用百度地图作为底图
    bmap: {
      key: 'khtyvAm0WmsH7lVABmCr1RgRqSFrV1Eb', // 设置key
      center: [108.954355, 34.346721], // 设置中心点
      zoom: 5, // 设置缩放级别(默认5)
      roam: true, // 是否开启鼠标缩放和平移漫游
      // 自定义地图样式
      mapStyle: {
        styleJson: styleJson,
      },
    },
    title: {
      text: '新中地网点地图',
      left: 'center',
    },
    // 提示框全局设置
    tooltip: {},
    series: [
      {
        //普通散点图
        type: 'scatter',
        name: '新中地外卖',
        coordinateSystem: 'bmap', // 指定使用百度地图做为坐标系
        data: scatterData, // 对于地图类型的data格式: [{name: '北京', value: [经度, 纬度, 销售额]}]
        encode: {
          value: 2, // 指定第三个维度为值
        },
        // 自定义散点大小: 销售额/10
        symbolSize: val => val[2] / 10,
      },
      {
        // 带动效(涟漪效果)的散点图
        type: 'effectScatter',
        name: '新中地外卖TOP10',
        coordinateSystem: 'bmap', // 指定使用百度地图做为坐标系
        data: effectScatterData, // 对于地图类型的data格式: [{name: '北京', value: [经度, 纬度, 销售额]}]
        encode: {
          value: 2, // 指定第三个维度为值
        },
        // 自定义散点大小: 销售额/10
        symbolSize: val => val[2] / 10,
        // 设置涟漪效果
        rippleEffect: {
          brushType: 'stroke',
          color: 'purple',
        },
        // 设置散点样式
        itemStyle: {
          color: '#5270D4',
        },
        // 设置局部的提示框的样式
        tooltip: {
          formatter(params) {
            return `${params.name}<br/>销售额: ${params.value[2]}`
          },
          textStyle: {
            color: 'green',
          },
        },
      },
    ],
  }
}
const convertData = obj => {
  const res = []
  const { city, geodata } = obj
  city.forEach(item => {
    const geo = geodata[item.name]
    if (geo) {
      res.push({
        name: item.name,
        value: [...geo, item.value],
      })
    }
  })
  return res
}

onMounted(async () => {
  const res = await getMapData()
  // import函数导入一个module(模块), 返回Module对象
  const styleJson = await import('./mapStyle.json')
  const scatterData = convertData(res)
  const effectScatterData = scatterData.sort((a, b) => b.value[2] - a.value[2]).slice(0, 10)
  renderChart(scatterData, effectScatterData, styleJson.default)
})
</script>

<style scoped></style>
