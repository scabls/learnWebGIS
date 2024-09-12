<template>
  <li @click="$emit('active')">
    <div class="icon"><font-awesome-icon :icon="icon" /></div>
    <div><slot></slot></div>
  </li>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: 'house',
  },
})
const emit = defineEmits(['active'])
</script>

<style scoped>
li {
  flex: 90px;
  text-align: center;
  align-content: center;
}
li .icon {
  font-size: 22px;
}
.active {
  color: #1989fa;
}
</style>
