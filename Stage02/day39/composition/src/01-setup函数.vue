<template>
  <div>{{ data.msg }}</div>
</template>
<script>
import { reactive } from 'vue'
export default {
  // setup函数是 组合式 API 的入口
  setup() {
    // 定义响应式数据
    // 需要先导入reactive函数
    const data = reactive({
      msg: 'hello',
    })

    // setup返回的是普通对象, vue会将这个对象的属性代理到组件实例对象上, 而模板中可以访问实例对象上的属性
    return {
      // ES6对象的属性的简洁表示法
      data,
    }
  },
}
</script>
