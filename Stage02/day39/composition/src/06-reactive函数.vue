<template>
  <div id="test">{{ pObj.msg }}</div>
</template>
<script setup>
// 实现 简易版的reactive
// 作用: 将一个普通对象, 转换成 响应式 对象
// 参数: 普通对象
// 返回值: 响应式对象 Proxy
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      document.querySelector('#test').innerHTML = value
      return true
    },
  })
}
const obj = {
  msg: 'hello',
}
const pObj = reactive(obj)

setTimeout(() => (pObj.msg = 'world'), 1000)
</script>
