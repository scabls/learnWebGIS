<template>
  <div>仪表盘</div>
  <button @click="handleParams">params传参</button>
  <button @click="handleQuery">query传参</button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const handleParams = () => {
  //   /blog/:id
  const id = 100
  //   params 路径参数
  //   id(key/键)是与路由规则中的参数保持一致的
  router.push({ name: 'blog', params: { id: id } })
}
const handleQuery = () => {
  router.push({ name: 'blog', query: { name: 'xiaoming', age: 20 } })
}
</script>

<style scoped></style>
