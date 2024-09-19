<template>
  <section>
    <h3>编辑用户</h3>
    <form @submit.prevent="handleSubmit">
      <label for="username">用户名: </label>
      <input type="text" v-model.trim="username" />
      <label for="password">年龄: </label>
      <input type="number" v-model="age" />
      <button>修改</button>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getUserByIdApi, editUserApi } from '@/api/users'

const username = ref('')
const age = ref()
const router = useRouter()
const route = useRoute()
const id = route.params.id

const handleSubmit = async () => {
  // 调用接口修改用户
  await editUserApi(id, { name: username.value, age: age.value })
  alert('修改成功')

  // 切换路由
  router.push({ name: 'home' })
}

onMounted(async () => ({ name: username.value, age: age.value } = await getUserByIdApi(id)))
</script>

<style scoped></style>
