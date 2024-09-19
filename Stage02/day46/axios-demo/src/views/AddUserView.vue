<template>
  <section>
    <h3>添加用户</h3>
    <form @submit.prevent="handleSubmit">
      <label for="username">用户名: </label>
      <input type="text" v-model.trim="username" />
      <label for="password">年龄: </label>
      <input type="number" v-model="age" /><br />
      <button>添加</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addUserApi } from '@/api/users'

const username = ref('')
const age = ref()
const router = useRouter()

const handleSubmit = async () => {
  // 调用接口添加用户
  await addUserApi({ name: username.value, age: age.value })
  alert('添加成功')

  // 切换路由
  router.push({ name: 'home' })
}
</script>

<style scoped></style>
