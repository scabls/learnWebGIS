<template>
  <div class="outer-container">
    <el-container class="container">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu @select="handleSelect">
            <el-menu-item index="home">
              <el-icon><Setting /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="menu">
              <el-icon><IconMenu /></el-icon>
              <span>菜单</span>
            </el-menu-item>
            <el-sub-menu index="document">
              <template #title>
                <el-icon><Document /></el-icon>
                <span>文档</span>
              </template>
              <el-menu-item index="1-4-1">添加文档</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

const handleSelect = index => {
  console.log(index)
}
</script>

<style scoped>
div.outer-container {
  margin-bottom: 1rem;
}
.container {
  height: 400px;
}
.el-header {
  background-color: #eee;
}
.el-aside {
  background-color: #ccc;
}
.el-main {
  background-color: #aaa;
}
</style>
