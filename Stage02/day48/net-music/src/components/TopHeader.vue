<template>
  <header class="top-header">
    <div class="wrap content">
      <router-link to="/">
        <h1></h1>
      </router-link>
      <div class="search-input">
        <el-input
          :prefix-icon="Search"
          v-model.trim="song"
          placeholder="音乐/视频/电台/用户"
          @keyup.enter="handleSearch"
        ></el-input>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Search } from '@element-plus/icons-vue'

const song = ref('')
const router = useRouter()

const handleSearch = () => {
  router.push({ name: 'search', query: { keywords: song.value } })
  song.value = ''
}
</script>

<style lang="scss" scoped>
.top-header {
  min-width: 1200px;
  height: 70px;
  background-color: #242424;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    h1 {
      width: 176px;
      height: 69px;
      background-image: url('https://s2.music.126.net/style/web2/img/frame/topbar.png?4442f0f41ad3e1b6273425ca3673b4ad');
    }
  }
}
</style>
