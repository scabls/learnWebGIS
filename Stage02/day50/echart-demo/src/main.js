import { createApp } from 'vue'
import VueEcharts from 'vue-echarts'
import App from './App.vue'
// 方式一: 全部导入
// import 'echarts'

createApp(App).component('v-chart', VueEcharts).mount('#app')
