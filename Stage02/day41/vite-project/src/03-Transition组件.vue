<template>
  <TransitionTest />
  <br />
  <button @click="show = !show">Toggle</button>
  <Transition>
    <RefTest v-if="show" />
  </Transition>
</template>

<script setup>
import TransitionTest from './components/TransitionTest.vue'
import RefTest from './components/RefTest.vue'
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
</style>
