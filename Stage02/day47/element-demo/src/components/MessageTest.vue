<template>
  <div class="container">
    <el-button @click="handleClick">普通的消息框</el-button>
    <el-button @click="handleClick2">定制的消息框</el-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleClick = () => {
  ElMessage.success('操作成功')
}

const handleClick2 = () => {
  ElMessage({
    type: 'error',
    message: '操作失败',
    showClose: true,
    duration: 1000,
  })
}
</script>

<style scoped>
div.container {
  margin-bottom: 1rem;
}
</style>
