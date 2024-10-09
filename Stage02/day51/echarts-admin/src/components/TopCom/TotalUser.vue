<template>
  <CommonCard title="累计用户数 " :value="reportData.totalUser">
    <template #default>
      <v-chart :option="option"></v-chart>
    </template>
    <template #footer>
      <div class="wrapper">
        <div>
          <span>日同比</span>
          <span class="css-1">{{ reportData.userGrowLastDay }}%</span>
          <span
            :class="{
              increase: reportData.userGrowLastDay >= 0,
              decrease: reportData.userGrowLastDay < 0,
            }"
          ></span>
        </div>
        <div>
          <span>月同比</span>
          <span class="css-1">{{ reportData.userGrowLastMonth }}%</span>
          <span
            :class="{
              increase: reportData.userGrowLastMonth > 0,
              decrease: reportData.userGrowLastMonth < 0,
            }"
          ></span>
        </div>
      </div>
    </template>
  </CommonCard>
</template>

<script setup>
import { ref, watch } from 'vue'
import CommonCard from './CommonCard.vue'
const props = defineProps({
  reportData: {
    type: Object,
    require: true,
  },
})
const option = ref({})

const setOption = (v1, v2) => {
  option.value = {
    xAxis: {
      // 让x轴显示数据
      type: 'value',
      show: false,
    },
    yAxis: {
      // 让y轴设置为类目轴
      type: 'category',
      show: false,
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'bar',
        data: [v1],
        itemStyle: {
          color: 'green',
        },
        barWidth: 10,
        // 设置统一的stack, 将多个柱子堆叠在一起
        stack: 'total',
      },
      {
        type: 'bar',
        data: [v2],
        itemStyle: {
          color: '#ddd',
        },
        barWidth: 10,
        stack: 'total',
      },
      {
        // 自定义形状
        type: 'custom',
        data: [v1],
        renderItem: (params, api) => {
          // 设置三角形的点的坐标(x,y)
          const endPoint = api.coord([api.value(0), 0])
          // 返回值, 用于创建自定义形状
          return {
            type: 'group', // 组(包含两个三角形)
            children: [
              // 使用svg的path路径绘制三角形
              {
                type: 'path',
                shape: {
                  d: 'M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z',
                  x: endPoint[0] - 5,
                  y: 35,
                  width: 10,
                  height: 10,
                  layout: 'cover',
                },
                style: {
                  fill: 'green',
                },
              },
              {
                type: 'path',
                shape: {
                  d: 'M889.696 320.8H158.848l365.504 365.536 365.344-365.536z',
                  x: endPoint[0] - 5,
                  y: 5,
                  width: 10,
                  height: 10,
                  layout: 'cover',
                },
                style: {
                  fill: 'green',
                },
              },
            ],
          }
        },
      },
    ],
  }
}
watch(props, () => {
  setOption(props.reportData.userLastMonth, props.reportData.userToday)
})
</script>

<style scoped>
.wrapper {
  display: flex;
  gap: 10px;
}
</style>
