<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.content }}
    </li>
  </ul>
</template>

<script setup>
// import { storeToRefs } from 'pinia';
import { useTodosStore } from '@/stores/todos'
const { todos } = useTodosStore()
</script>

<style scoped></style>
