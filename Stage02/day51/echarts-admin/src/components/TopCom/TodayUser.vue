<template>
  <CommonCard title="今日用户交易数" :value="reportData.userToday">
    <template #default>
      <v-chart :option="option"></v-chart>
    </template>
    <template #footer>
      <span>退货率</span>
      <span class="css-1">{{ reportData.returnRate }}%</span>
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
    data: [
      '00:00',
      '03:00',
      '05:00',
      '07:00',
      '09:00',
      '11:00',
      '13:00',
      '15:00',
      '17:00',
      '19:00',
      '21:00',
      '23:00',
    ],
  },
  yAxis: {
    show: false,
    type: 'value',
  },
  grid: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  tooltip: {},
  series: [
    {
      name: '实时交易量',
      data: props.reportData.orderUserTrend,
      type: 'bar',
      barWidth: '60%',
    },
  ],
}))
</script>

<style scoped></style>
