<template>
  <div>RefTest</div>
</template>

<script setup>
// 1. reactive定义的对象, 在解构和展开后, 会丢失响应性
import { reactive, toRef, toRefs } from 'vue'
const obj = reactive({
  foo: 'aaa',
  bar: 'bbb',
})
console.log('reactive定义的对象:', obj)
{
  // 赋值操作为丢失响应性
  const foo = obj.foo
  console.log('被赋值obj.foo的变量foo: ', foo)
  // 解构赋值会丢失响应性
  const { bar } = obj
  console.log('解构bar属性赋值给变量bar: ', bar)
  // 展开运算符会丢失响应性
  const newObj = { ...obj }
  console.log('接收展开obj的newObj: ', newObj)
}
{
  // toRef会保留属性的响应性, 取代赋值操作
  const foo = toRef(obj, 'foo')
  console.log('toRef获取的obj的foo属性: ', foo)
}
{
  // 对一个响应式对象解构, 使用toRefs保留属性的响应性
  // toRefs会保留属性的响应性, 取代解构赋值
  const newObj = toRefs(obj)
  const { foo, bar } = toRefs(obj)
  console.log('对obj使用toRefs处理后: ', newObj)
  console.log('对obj使用toRefs处理后得到对象的foo属性: ', foo)
  console.log('对obj使用toRefs处理后得到对象的bar属性: ', bar)
}
</script>

<style scoped></style>
