<template>
  <h1>slot test</h1>
  <!-- 预留一个插槽 -->
  <slot></slot>
  <!-- 具名插槽 -->
  <slot name="cpu"></slot>
  <slot name="memory"></slot>
  <!-- 没有name属性的插槽会隐式命名为default -->
</template>

<script setup></script>

<style scoped></style>
