<template>
  <v-chart :option="option"></v-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 导入wordcloud模块
import 'echarts-wordcloud'
import { getKeyWordsData } from '@/api'

const option = ref({})

const renderChart = data => {
  option.value = {
    tooltip: {},
    series: [
      {
        type: 'wordCloud',
        // 要求数据结构[{name: '词1', value: 100}, {name: '词2', value: 100},...]
        data: data,
        width: '100%',
        height: '100%',
        //设置文本样式
        textStyle: {
          // 字体颜色随机
          color: () =>
            `rgb(
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)}) `,
        },
        // 强调高亮效果
        emphasis: {
          focus: 'self',
          textStyle: {
            textShadowBlur: 5,
            textShadowColor: '#333',
          },
        },
      },
    ],
  }
}

onMounted(async () => {
  const res = await getKeyWordsData()
  const data = res.map(item => {
    return {
      name: item.keyWord,
      value: item.totalSearch,
    }
  })
  renderChart(data)
})
</script>

<style scoped></style>
