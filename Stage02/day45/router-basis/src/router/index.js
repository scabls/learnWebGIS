import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 创建路由器对象
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      // :id 是一个动态参数, 匹配 数字和字符
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/UserView.vue'),
    },
    {
      // 正则表达式匹配, 只能匹配数字
      path: '/user/:id(\\d+)',
      component: () => import('../views/TestView.vue'),
    },
    {
      path: '/:abc*',
      component: () => import('../views/TestView.vue'),
    },
    {
      // 捕获所有路由或 404 Not found 路由
      path: '/:404(.*)*',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
