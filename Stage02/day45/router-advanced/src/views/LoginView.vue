<template>
  <form @submit.prevent="login">
    用户名: <input type="text" v-model="username" /> <br />
    密码: <input type="password" v-model="password" /> <br />
    <button>登录</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const username = ref('')
const password = ref('')

const login = () => {
  if (username.value === 'admin' && password.value === '123456') {
    alert('登录成功')
    localStorage.setItem('isLogin', 'true')

    router.push('/')
  } else {
    alert('用户名或者密码错误')
  }
}
</script>

<style scoped></style>
