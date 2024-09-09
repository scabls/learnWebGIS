<template>
  <div></div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
const count = ref(0)
const doubleCount = computed(() => count.value * 2)
const stu = reactive({
  name: 'xiaoming',
  age: 20,
  gf: {
    name: 'xiaomei',
    age: 18,
    city: {
      name: 'beijing',
    },
  },
})
// watch(数据源, 回调函数, 选项)

// 1. 数据源: 可以是ref对象, 也可以是reactive对象、computed对象, 或者getter函数
watch(count, () => console.log('count改变了'))

// 2. watch对象时, 默认是深层次的侦听
watch(stu, () => console.log('stu改变了'))

// 3. 不能直接watch属性, 需要通过一个副作用函数/getter函数来访问属性
watch(
  () => stu.name,
  () => console.log('stu.name改变了')
)

setTimeout(() => {
  ;(count.value = 10), (stu.name = 'xiaozhang'), (stu.gf.name = 'xiaoli')
}, 1000)
</script>
