<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Modal</button>
  <!-- 可以将组件中的一部分DOM移动渲染的位置 -->
  <Teleport to="body">
    <div v-if="open" class="modal-wrapper">
      <div class="modal-content">
        <p>Hello from the modal!</p>
        <button @click="open = false">Close</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal-content {
  width: 50%;
  background: #fff;
}
</style>
