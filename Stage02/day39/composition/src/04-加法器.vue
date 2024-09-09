<template>
  <div>
    <!-- ref类型的变量, 在模板中不需要用过.value来操作 -->
    <input type="text" v-model.number="first" />
    +
    <input type="text" v-model.number="second" />
    <button @click="handleAdd">=</button>
    <input type="text" v-model.number="result" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
// ref函数可以接受任意类型的参数, 返回一个响应式ref对象
const first = ref(0)
const second = ref(0)
const result = ref(0)
const handleAdd = () => {
  // ref类型的变量, 在js中需要通过.value来操作
  result.value = first.value + second.value
}
</script>
