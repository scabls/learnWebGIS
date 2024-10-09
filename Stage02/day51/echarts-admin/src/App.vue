<template>
  <el-config-provider :locale="zhCn">
    <TopCom />
    <SecondCom />
    <ThirdCom />
    <MapCom />
  </el-config-provider>
</template>

<script setup>
import TopCom from './components/TopCom/TopCom.vue'
import SecondCom from './components/SecondCom.vue'
import ThirdCom from './components/ThirdCom.vue'
import MapCom from './components/MapCom/MapCom.vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style>
@import 'reset-css';
* {
  box-sizing: border-box;
}
#app {
  min-width: 1200px;
  padding: 20px;
  background-color: #eee;
}
</style>
