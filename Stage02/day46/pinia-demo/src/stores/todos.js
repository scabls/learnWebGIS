import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 定义store
// 第一个参数: store的名称(唯一的id)
// 第二个参数: setup函数(执行组合式API)  或者 对象(选项式API)
export const useTodosStore = defineStore('todos', () => {
  // 定义state
  const todos = ref([])

  // 定义方法
  const addTodo = todo => todos.value.push(todo)

  return { todos, addTodo }
})
