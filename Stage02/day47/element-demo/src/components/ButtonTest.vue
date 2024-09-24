<template>
  <div class="container">
    <el-button>普通按钮</el-button>
    <el-button type="primary">primary</el-button>
    <el-button type="success">success</el-button>
  </div>
  <div class="container">
    <el-button plain>扁平风格</el-button>
    <el-button type="info" plain>info</el-button>
  </div>
  <div class="container">
    <el-button round>圆角风格</el-button>
    <el-button type="warning" round>圆角风格</el-button>
  </div>
</template>

<script setup></script>

<style scoped>
div.container {
  margin-bottom: 1rem;
}
</style>
