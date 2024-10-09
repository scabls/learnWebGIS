<template>
  <section class="map-com">
    <div class="left">
      <BMapScatter />
    </div>
    <div class="right">
      <el-card>
        <template #header>
          <span class="css-2">订单同比增长</span>
        </template>
        <template #default>
          <LiquidFill />
        </template>
      </el-card>
      <el-card>
        <template #header>
          <span class="css-2">热门搜索</span>
        </template>
        <template #default>
          <WordCloud />
        </template>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import BMapScatter from './BMapScatter.vue'
import LiquidFill from './LiquidFill.vue'
import WordCloud from './WordCloud.vue'
</script>

<style lang="scss" scoped>
.map-com {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  .left {
    flex: 8 8 80%;
    height: 600px;
    position: relative; //作为百度地图定位的包含块
  }
  .right {
    flex: 2 2 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .el-card {
      .css-2 {
        font-weight: 600;
      }
      :deep(.el-card__body) {
        height: 227px;
      }
    }
  }
}
</style>
