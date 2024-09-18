<template>
  <h1>用户信息</h1>
  <p>用户id:{{ $route.params.id }}</p>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// 这样获取的id是普通值, 没有响应性
const id = route.params.id
console.log(route)
console.log(id)
</script>

<style scoped></style>
