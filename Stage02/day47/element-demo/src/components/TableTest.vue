<template>
  <div class="container">
    <el-table :data="tableData" stripe border>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { ElMessage } from 'element-plus'

const tableData = ref([
  { id: 1, name: '张三', age: 20, address: '北京市' },
  { id: 2, name: '李四', age: 25, address: '上海市' },
  { id: 3, name: '王五', age: 30, address: '上海市' },
])
const handleEdit = row => {
  ElMessage.success(`数据: ${JSON.stringify(row)}`)
}

const handleDelete = row => {
  console.log(row)
}
</script>

<style scoped>
.container {
  margin-bottom: 1rem;
}
</style>
