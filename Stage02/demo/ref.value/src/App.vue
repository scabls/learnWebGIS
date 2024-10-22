<template>
  <ComponentTest v-model="test" />
  <br />
  {{ test }}
</template>

<script setup>
import ComponentTest from './components/ComponentTest.vue'

import { ref, watch } from 'vue'

const test = ref(null)
watch(
  test,
  () => {
    console.log('test changed', test.value)
  },
  { deep: true }
)
</script>

<style scoped></style>
