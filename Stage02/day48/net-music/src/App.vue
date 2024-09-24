<template>
  <TopHeader />
  <RouterView />
</template>

<script setup>
import TopHeader from './components/TopHeader.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wrap {
  width: 960px;
  margin: 0 auto;
}
</style>
