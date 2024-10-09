<template>
  <CommonCard title="累计销售额" :value="reportData.salesToday">
    <template #default>
      <div>
        <span>日同比</span>
        <span class="css-1">{{ reportData.salesGrowLastDay }}%</span>
        <span :class="reportData.salesGrowLastDay >= 0 ? 'increase' : 'decrease'"></span>
      </div>
      <div>
        <span>月同比</span>
        <span class="css-1">{{ reportData.saleSGrowLastMonth }}%</span>
        <span :class="reportData.saleSGrowLastMonth >= 0 ? 'increase' : 'decrease'"></span>
      </div>
    </template>
    <template #footer>
      <span>昨日销售额</span>
      <span class="css-1">￥{{ reportData.salesLastDay }}</span>
    </template>
  </CommonCard>
</template>

<script setup>
import CommonCard from './CommonCard.vue'

const props = defineProps({
  reportData: {
    type: Object,
    require: true,
  },
})
</script>

<style scoped></style>
