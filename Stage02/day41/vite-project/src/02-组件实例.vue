<template>
  <h1 ref="h1">h1</h1>
  <RefTest ref="refTest" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RefTest from './components/RefTest.vue'
// 固定写法ref(null), 而且变量的名字要跟ref的属性名一致
const h1 = ref(null)
const refTest = ref(null)
onMounted(() => {
  console.log(h1)
  console.log(refTest)
})
</script>

<style scoped></style>
