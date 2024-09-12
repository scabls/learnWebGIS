<template>
  {{ res.name }}
</template>

<script setup>
function fetchUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: 'xiaoming', age: 18 })
    }, 1000)
  })
}
const res = await fetchUser()
console.log(res)
</script>

<style scoped></style>
