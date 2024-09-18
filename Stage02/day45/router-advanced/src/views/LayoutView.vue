<template>
  <div class="admin-layout">
    <aside class="siderbar">
      <ul>
        <li>
          <router-link to="/dashboard">首页</router-link>
        </li>
        <li>
          <router-link to="/blog">博客</router-link>
        </li>
        <li>
          <router-link to="/about">关于</router-link>
        </li>
        <li>
          <router-link to="/contact">联系</router-link>
        </li>
      </ul>
    </aside>
    <section class="container">
      <header>
        顶点菜单
        <button @click="loginOut">退出登录</button>
      </header>
      <main>
        <!-- 二级路由出口 -->
        <router-view></router-view>
      </main>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const loginOut = () => {
  localStorage.removeItem('isLogin')
  alert('已退出登录')
  //   跳转到登陆界面
  router.push('/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background-color: #eee;
}
.siderbar {
  width: 200px;
  padding: 20px;
  background-color: #ddd;
}
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ccc;
}
.container header {
  height: 3rem;
  background-color: #aaa;
}
.container main {
  padding: 20px;
}
</style>
