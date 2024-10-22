<template>
  {{ refA }}
  <br />
  {{ test }}
  <br />
  <button @click="handleClick">+1</button>
</template>

<script setup>
import { ref } from 'vue'
const test = defineModel()
const a = [1, 2, 3]
const refA = ref(a)
test.value = refA.value
const handleClick = () => {
  refA.value.push(1)
  console.log('a', a)
  console.log('refA.value', refA.value)
  console.log('test.value', test.value)
}
</script>

<style scoped></style>
