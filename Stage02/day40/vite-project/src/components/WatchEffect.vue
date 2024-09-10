<template></template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
// 1. watch需要明确指定要侦听的数据源; watchEffect不需要明确指定侦听的数据源, 自动地收集依赖
// 2. watch的回调函数默认是不执行的, watchEffect的回调函数是默认执行的
const surname = ref('张')
const name = ref('三')
const fullname = ref('')
// watch(surname, () => {
//   fullname.value = `${surname.value}${name.value}`
// })
// watch(name, () => {
//   fullname.value = `${surname.value}${name.value}`
// })
watchEffect(() => {
  // 默认执行回调函数, 自动地收集依赖, 触发getter操作, 被依赖追踪
  fullname.value = `${surname.value}${name.value}`
})
</script>

<style scoped></style>
