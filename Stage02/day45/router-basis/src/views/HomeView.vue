<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>姓名</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td><button @click="handleClick(item.id)">查看</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const items = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
])
const router = useRouter()
console.log(router)
const handleClick = id => {
  // 跳转到用户详情页面
  router.push(`/user/${id}`)
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
table,
th,
td {
  border: 1px solid #ddd;
}
th,
td {
  width: 6rem;
  padding: 0.2rem 0.4rem;
}
</style>
