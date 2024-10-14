<template>
  <ColorfulRect v-bind="{ width, height, lineWidth, gap, list }" />
</template>

<script setup>
import ColorfulRect from './components/ColorfulRect.vue'
import { ref } from 'vue'
const width = ref(300)
const height = ref(300)
const lineWidth = ref(10)
const gap = ref(40)
const list = ref([
  {
    color: 'lightblue',
    title: 'Item 1',
    number: 350,
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
@import 'reset-css';
* {
  box-sizing: border-box;
}
</style>
