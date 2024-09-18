<template>
  <div>博客</div>
  <p>blogId:{{ blogId }}</p>
  <p>name:{{ name }}</p>
  <p>age:{{ age }}</p>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const blogId = route.params.id
console.log(blogId)

const { name, age } = route.query
console.log(name, age)
</script>

<style scoped></style>
