<template>
  <RectProgress :list="list" />
</template>

<script setup>
import RectProgress from './components/RectProgress.vue'
import { ref } from 'vue'
const list = ref([
  {
    color: 'lightblue',
    title: 'Item 1',
    number: 450,
  },
  {
    color: 'lightgreen',
    title: 'Item 2',
    number: 350,
  },
  {
    color: 'pink',
    title: 'Item 3',
    number: 350,
  },
  {
    color: 'purple',
    title: 'Item 4',
    number: 350,
  },
])
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
