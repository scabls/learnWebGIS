<template>
  <div>
    <h3>每个组件模板中只能访问当前组件的状态</h3>
    <p>子组件不能直接获取父组件状态</p>
    <p>子组件中的isShow:{{ isShow }}</p>
  </div>
  <!-- slot标签上的attributes相当于props -->
  <!-- 将slot标签的attribute与组件状态绑定 -->
  <!-- 
  1. 在子组件的插槽上, 定义自定义属性, 绑定子组件中的状态
  2. 在父组件的模板中, 获取到插槽对象, 进而获取到属性
   -->
  <slot :isShow="isShow"></slot>
  <slot name="cpu" :type="type"></slot>
</template>

<script setup>
import { ref } from 'vue'
const isShow = ref(true)
const type = ref('i7')
</script>

<style scoped></style>
