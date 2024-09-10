<template>
  <AttrTest abc="abc" foo="foo" class="red" @click="handleClick" />
</template>
<script setup>
import AttrTest from './components/AttrTest.vue'
const handleClick = () => console.log('click')
</script>
