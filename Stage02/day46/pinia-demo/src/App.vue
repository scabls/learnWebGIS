<template>
  <!-- 从store中读取数据 -->
  <!-- <div>当前计数为:{{ count }}</div> -->
  <div>当前计数为:{{ counter.count }}</div>
  <button @click="handleClick">点击+1</button>
  <AddTodo />
  <TodoList />
</template>

<script setup>
import AddTodo from './components/AddTodo.vue'
import TodoList from './components/TodoList.vue'

// import { toRefs } from 'vue'
import { useCounterStore } from '@/stores/counter.js'
// const { count, increment } = toRefs(useCounterStore())
// const handleClick = () => increment.value()
const counter = useCounterStore()
const handleClick = () => counter.increment()
</script>

<style scoped></style>
