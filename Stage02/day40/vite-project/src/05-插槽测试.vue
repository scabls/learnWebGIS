<template>
  <!-- 
    如果向组件传 数据, 使用props
    如果向组件传 HTML结构, 使用slot插槽
  -->
  <SlotTest>
    <h3>会被传入插槽</h3>
    <div>我会被传入插槽</div>

    <template v-slot:cpu>
      <h3>被传入name为cpu的插槽</h3>
      <p>我被cpu了/(ㄒoㄒ)/~~</p>
    </template>

    <p>我也会被传入插槽</p>

    <template #memory>
      <h3>被传入name为memory的插槽</h3>
      <p>被cpu到失去memory/(ㄒoㄒ)/~~</p>
    </template>
    <!-- 组件引用标签的innerHTML会替换组件模板中的slot插槽元素 -->
  </SlotTest>
</template>
<script setup>
// 在setup中导入的组件对象, 可以在模板中直接使用
import SlotTest from './components/SlotTest.vue'
</script>
