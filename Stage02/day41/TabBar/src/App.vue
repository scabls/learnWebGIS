<template>
  <div class="tabbar">
    <VanTabbar>
      <VanTabbarItem
        v-for="item in tabbarItems"
        :key="item.id"
        :icon="item.icon"
        :class="active == item.id ? 'active' : ''"
        @active="active = item.id"
      >
        {{ item.name }}
      </VanTabbarItem>
    </VanTabbar>
  </div>
</template>

<script setup>
import VanTabbar from './components/VanTabbar.vue'
import VanTabbarItem from './components/VanTabbarItem.vue'
import { ref } from 'vue'
const active = ref(1)
const tabbarItems = ref([
  { id: 1, icon: 'house', name: '首页' },
  { id: 2, icon: 'magnifying-glass', name: '搜索' },
  { id: 3, icon: 'user-group', name: '联系人' },
  { id: 4, icon: 'gear', name: '设置' },
])
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #eff2f5;
}
.tabbar {
  width: 360px;
  height: 50px;
  margin: 50px auto;
  background-color: #fff;
  font-size: 12px;
}
</style>
