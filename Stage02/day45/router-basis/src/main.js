import { createApp } from 'vue'
import App from './App.vue'
// 如果没有写.js后缀, 在vite中, 会解析成文件夹, 去加载该文件夹下的index.js文件
import router from './router'

const app = createApp(App)

// 注册插件
app.use(router)

app.mount('#app')
