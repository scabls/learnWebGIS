<template>
  <!-- 在模板中, 直接使用title访问 -->
  <h1>{{ title }}</h1>
</template>

<script setup>
// 通过defineProps接收
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  isPublished: Boolean,
  commentIds: {
    type: Array,
    default: () => [],
  },
  author: {
    type: Object,
    default: () => ({}),
  },
})

// 在js中通过props.title访问属性
console.log(props.title)
// 传入的prop是只读的, 不能在子组件直接修改
// props.title = 'hahaha' // 无法修改, vue发出警告
// 对于对象或数组这种引用类型数据, 作为prop传入时, 可以修改內部值, 但不建议
// props.author.name = 'Titus'
</script>

<style scoped></style>
