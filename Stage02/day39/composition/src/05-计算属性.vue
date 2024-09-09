<template>
  <div>
    姓: <input type="text" v-model="surname" /> <br />
    名: <input type="text" v-model="name" /><br />
    全名: {{ fullname }}
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

// ref相当于data选项
const surname = ref('')
const name = ref('')

// computed相当于computed选项
// computed函数接受一个getter函数作为参数, 回调函数的返回值就是计算属性的值
const fullname = computed(() => surname.value + name.value)
</script>
