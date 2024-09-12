<template>
  <Suspense>
    <SuspenseTest />
    <template #fallback>
      <div>loading...</div>
    </template>
  </Suspense>
  <p>x的坐标: {{ point.x }}--y的坐标: {{ point.y }}</p>
</template>

<script setup>
import SuspenseTest from './components/SuspenseTest.vue'

import usePoint from './hooks/usePoint.js'
const point = usePoint()
</script>

<style scoped></style>
