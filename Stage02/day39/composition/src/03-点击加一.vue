<template>
  <div>
    <button @click="increment">点我计数加一: {{ data.count }}</button>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
// 相当于选项式的data选项
const data = reactive({
  count: 0,
})
// 相当于选项式的methods选项
function increment() {
  data.count++
}
// 函数表达式: 将箭头函数赋值给一个变量
// const increment = () => data.count++
</script>
