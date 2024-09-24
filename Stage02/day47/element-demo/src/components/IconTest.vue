<template>
  <div class="container">
    <!-- 第一种使用方式: 放在el-icon元素内 -->
    <el-icon :size="20" color="blue">
      <Edit />
    </el-icon>
    <!-- 第二种使用方式: 单独使用 -->
    <Search class="search-icon" />
    <House style="width: 1.2rem" />
    <!-- 第三种使用方式: 作为其他组件的icon属性 -->
    <el-button :icon="Delete"></el-button>
  </div>
</template>

<script setup>
// 导入要使用的图标
import { Edit, Search, House, Delete } from '@element-plus/icons-vue'
</script>

<style scoped>
div.container {
  margin-bottom: 1rem;
}
.search-icon {
  width: 1.2rem;
}
</style>
