<template>
  <div>{{ pObj.msg }}</div>
</template>
<script setup>
// 1. 在setup中定义的变量, 可以在模板中直接使用
// 2. 在setup中定义的函数, 可以在模板中直接使用
// 3. 在setup中导入的组件, 可以在模板中直接使用

import { reactive } from 'vue'
// 定义普通对象
const obj = {
  msg: 'hello',
}
// 定义响应式数据
const pObj = reactive(obj)
</script>
