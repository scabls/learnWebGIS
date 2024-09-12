import { createApp, ref } from 'vue'
import App from './App.vue'

// 应用层provide
// app.provide()
// 可在应用中所有后代组件注入使用
// 返回应用实例本身
createApp(App).provide('msg', ref('hello world')).mount('#app')
