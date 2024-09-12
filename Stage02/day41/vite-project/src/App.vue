<template>
  <div>
    <h2>hello</h2>
    <ScopedTest />
  </div>
</template>

<script setup>
import ScopedTest from './components/ScopedTest.vue'
</script>

<style>
/* 书写全局样式, 不加scoped, 就会作用于整个页面 */
</style>
