<template>
  <button @click="show = !show">Toggle</button>
  <!-- Transition内置组件, 放在v-if/v-show(显示/隐藏)的元素外面 -->
  <Transition>
    <p v-if="show">hello</p>
  </Transition>
  <Transition name="fade">
    <p v-if="show">world</p>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<style scoped>
/* 进入阶段/离开阶段的整个过程, 持续1s */
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}
/* 进入阶段的开始状态/离开阶段的结束状态 */
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* .v表示绑定未具名的Transition */
/* 具名的Transition要将v换成name */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
