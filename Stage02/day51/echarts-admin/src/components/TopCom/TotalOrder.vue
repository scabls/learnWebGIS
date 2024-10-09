<template>
  <CommonCard title="累计订单额" :value="reportData.orderToday">
    <template #default>
      <v-chart :option="option"></v-chart>
    </template>
    <template #footer>
      <span>昨日销售额</span>
      <span class="css-1">￥{{ reportData.orderLastDay }}</span>
    </template>
  </CommonCard>
</template>

<script setup>
import { computed } from 'vue'
import CommonCard from './CommonCard.vue'
const props = defineProps({
  reportData: {
    type: Object,
    require: true,
  },
})
const option = computed(() => ({
  xAxis: {
    show: false,
    type: 'category',
    boundaryGap: false,
  },
  yAxis: {
    show: false,
    type: 'value',
  },
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  series: [
    {
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        color: 'purple',
      },
      data: props.reportData.orderTrend,
    },
  ],
}))
</script>

<style scoped></style>
