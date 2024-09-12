<template>
  <!-- 属性透传 -->
  <!-- props中没有定义的, 被attrs接收, 并自动添加到唯一的渲染根元素节点标签上 -->
  <!-- 唯一的渲染根元素节点 -->
  <div>
    <!-- 在模板中, 透传的属性可以通过$attrs获取 -->
    {{ $attrs }}
  </div>
  <!-- 若有多个渲染根元素节点, vue警告, 都不添加 -->
  <!-- <div></div> -->
</template>

<script setup>
// 组件引用标签上传入的属性, 若props中定义了, 则props接收
const props = defineProps({
  abc: String,
})
// 在<script setup>中,可以通过useAttrs获取$attrs
import { useAttrs } from 'vue'
const attrs = useAttrs()
console.log(attrs)

// 组件引用标签上的事件监听也会透传到唯一的渲染根元素节点标签上

// 若不希望透传, 在子组件的emits中定义同名事件, 把透传的事件消费掉
// const emit = defineEmits(['click'])

// 自定义透传
// 在<script setup>中使用选项式API:defineOptions
defineOptions({
  // 禁用继承透传属性
  inheritAttrs: false,
})
</script>

<style scoped></style>
