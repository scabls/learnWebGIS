import { createApp } from 'vue'
import App from './App.vue'
import VueEcharts from 'vue-echarts'
import 'echarts'
createApp(App).component('v-chart', VueEcharts).mount('#app')
