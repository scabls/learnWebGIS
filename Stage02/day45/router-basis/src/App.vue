<template>
  <!-- 通过点击a元素, 触发url的改变, url改变后, 经由路由的匹配, 显示不同的组件 -->
  <!-- <a href="/">首页</a>
  <a href="/about">关于页</a> -->
  <header>
    <nav>
      <!-- router-link默认会渲染成a元素 -->
      <!-- 使用to属性取代href属性 -->
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>

  <main>
    <!-- 配置路由出口(根据url显示不同的组件) -->
    <router-view></router-view>
  </main>
</template>

<script setup></script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  padding: 1rem;
}
header {
  margin-bottom: 1rem;
}
header nav {
  display: flex;
  gap: 1rem;
}
header nav a {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  text-decoration: none;
}
</style>
