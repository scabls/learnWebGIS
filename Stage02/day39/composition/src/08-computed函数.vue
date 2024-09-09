<template>
  <div>{{ test }}</div>
</template>

<script setup>
// 计算属性
import { ref, computed } from 'vue'
const count = ref(0)
// computed对象 => 依赖于count
// 当count发生变化时, 引用了count的副作用函数(传给computed作为参数的函数)会自动执行
// 接下来, 渲染函数会自动重新执行, 因为渲染函数依赖doubleCount
const doubleCount = computed(() => count.value * 2)

// 作用: 创建一个响应式对象
// 参数: 函数/对象(使用函数的返回值作为属性值, 对象的getter函数返回值作为属性值)

// 基于函数的方式创建的计算属性是只读的
console.log(doubleCount)

const test = computed({
  // 计算属性.value的访问器
  get() {
    console.log('计算属性的get操作')
    return count.value * 2
  },
  // 计算属性.value的设置器
  set(newVal) {
    console.log('计算属性的set操作')
    count.value = newVal / 2
  },
})
console.log(test.value)
setTimeout(() => {
  test.value = 200
}, 1000)
</script>
