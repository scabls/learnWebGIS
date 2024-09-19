<template>
  <form @submit.prevent="handleSubmit">添加待办: <input type="text" v-model.trim="content" /></form>
</template>

<script setup>
import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos'

const content = ref('')

const { addTodo } = useTodosStore()
const handleSubmit = () => {
  if (!content.value) return
  addTodo({ id: Date.now(), content: content.value, done: false })
  content.value = ''
}
</script>

<style scoped></style>
