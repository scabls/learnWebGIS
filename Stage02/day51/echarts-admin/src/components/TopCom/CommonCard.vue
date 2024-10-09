<template>
  <el-card class="common-card" shadow="hover">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
    <div class="chart">
      <slot name="default"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.common-card {
  .title {
    font-size: 12px;
    color: #777;
    letter-spacing: 1px;
  }
  .value {
    font-size: 24px;
    font-weight: 600;
    margin-top: 10px;
  }
  .chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    height: 50px;
    margin-top: 10px;
  }
  .footer {
    margin-top: 18px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }
}
</style>
