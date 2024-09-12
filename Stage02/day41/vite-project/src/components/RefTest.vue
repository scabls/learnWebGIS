<template>
  <div>子组件</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const count = ref(0)
const increment = () => {
  count.value++
}

// 在子组件中获取当前实例
const instance = getCurrentInstance() // 类似于vue2(选项式API)中的this
console.log(instance)

// 默认情况下, 在setup中, 属性是隔离的, 外部实例不能直接访问
// 可以通过 defineExpose 编译器宏来显式指定在 <script setup> 组件中要暴露出去的属性
defineExpose({
  count,
  increment,
})
</script>

<style scoped></style>
