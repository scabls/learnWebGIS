<template>
  <BlogPost title="hello world" />
  <BlogPost
    title="hello vue"
    :likes="100"
    isPublished
    :commentIds="[1, 2, 3]"
    :author="{ name: 'John Doe', email: 'john.doe@example.com' }"
  />
  <BlogPost v-bind="post1" />
  <BlogPost :="post2" />
</template>
<script setup>
// 在setup中导入的组件对象, 可以在模板中直接使用
import BlogPost from './components/BlogPost.vue'
import { ref } from 'vue'
const post1 = ref({
  title: 'v-bind不带参数,值为对象,用于动态绑定多个值',
  likes: 1000,
  isPublished: true,
  commentIds: [1, 2, 3, 4],
  author: { name: 'Yulia', email: 'yulia@example.com' },
})
const post2 = ref({
  title: 'hello v-bind指令的简写`:`',
  likes: 1000,
  isPublished: true,
  commentIds: [1, 2, 3, 4],
  author: { name: 'Yulia', email: 'yulia@example.com' },
})
</script>
