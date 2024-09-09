<template>
  <div id="test">{{ count }}</div>
</template>
<script setup>
let activeEffect = null

// 实现 简易版的ref
class RefImpl {
  constructor(value) {
    this._value = value
  }
  dep = [] // 保存当前属性的依赖函数
  __v_isRef = true
  __v_isShallow = false
  get value() {
    // 访问value属性, 会执行这里的get函数
    // 在get中, 收集依赖
    if (activeEffect) {
      // debugger
      this.dep.push(activeEffect)
    }
    return this._value
  }
  set value(newVal) {
    // 设置value属性, 会执行这里的set函数
    if (newVal !== this._value) {
      this._value = newVal
      // debugger
      // 执行依赖
      this.dep.forEach(fn => fn())
    }
  }
}
function ref(value) {
  return new RefImpl(value)
}
const count = ref(0)

function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}

effect(() => {
  console.log(count.value)
})

setTimeout(() => {
  count.value = 10
}, 1000)

// 为什么ref类型的响应式对象要通过.value操作
// 因为 在访问.value时触发依赖收集; 在设置.value时触发依赖更新
</script>
