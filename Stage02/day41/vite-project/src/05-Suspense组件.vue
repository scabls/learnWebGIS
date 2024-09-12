<template>
  <Suspense>
    <SuspenseTest />
    <template #fallback> loading... </template>
  </Suspense>
</template>

<script setup>
import SuspenseTest from './components/SuspenseTest.vue'
</script>
