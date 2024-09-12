<template>
  <div>
    {{ msg }}
  </div>
</template>

<script setup>
import { inject } from 'vue'
const msg = inject('msg')
</script>

<style scoped></style>
