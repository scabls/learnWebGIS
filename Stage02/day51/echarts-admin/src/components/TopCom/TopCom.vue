<template>
  <section class="top-com">
    <el-row :gutter="20">
      <el-col :span="6">
        <TotalSale :report-data="reportData" />
      </el-col>
      <el-col :span="6">
        <TotalOrder :report-data="reportData" />
      </el-col>
      <el-col :span="6">
        <TodayUser :report-data="reportData" />
      </el-col>
      <el-col :span="6">
        <TotalUser :report-data="reportData" />
      </el-col>
    </el-row>
  </section>
</template>

<script setup>
import TotalSale from './TotalSale.vue'
import TotalOrder from './TotalOrder.vue'
import TodayUser from './TodayUser.vue'
import TotalUser from './TotalUser.vue'
import { ref, onMounted } from 'vue'
import { getReportData } from '@/api'

const reportData = ref({
  salesGrowLastDay: '',
  saleSGrowLastMonth: '',
  salesLastDay: 0,
  salesToday: 0,
  orderToday: 0,
  orderLastDay: 0,
  orderTrend: [],
  orderUser: 0,
  orderUserTrend: [],
  returnRate: '',
  totalUser: 0,
  userGrowLastDay: '',
  userGrowLastMonth: '',
  userLastMonth: 0,
  userToday: 0,
})

onMounted(async () => (reportData.value = await getReportData()))
</script>

<style lang="scss" scoped>
:deep(span) {
  font-size: 14px;
  color: #464545;
  &.css-1 {
    margin-left: 8px;
    font-weight: 550;
  }
  &.decrease,
  &.increase {
    display: inline-block;
    width: 0;
    margin-left: 10px;
  }
  &.increase {
    height: 0;
    border-width: 4px;
    border-color: transparent transparent green transparent;
    border-style: solid;
    transform: translateY(-50%);
  }
  &.decrease {
    padding: 0;
    border-width: 4px;
    border-color: red transparent transparent transparent;
    border-style: solid;
  }
}
</style>
