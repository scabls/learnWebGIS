<template>
  <div>
    <h3>每个组件模板中只能访问当前组件的状态</h3>
    <p>父组件不能直接获取子组件状态</p>
    <p>父组件的isShow:{{ isShow }}</p>
  </div>
  <MyCom>
    <!-- 通过插槽对象访问插槽的prop -->
    <template #default="slotProps">
      <h3>在父组件的模板中获取子组件状态:{{ slotProps.isShow }}</h3>
    </template>
    <template #cpu="cpu">
      <h3>{{ cpu.type }}</h3>
    </template>
  </MyCom>
</template>
<script setup>
import MyCom from './components/MyCom.vue'
import { ref } from 'vue'
const isShow = ref(false)
</script>
