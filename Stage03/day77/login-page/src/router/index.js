import { createRouter, createWebHistory } from 'vue-router'
import { getAdminProfile } from '@/api/admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/home/:loginName',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
  ],
})

// 设置路由守卫
router.beforeEach(async (to) => {
  if (to.name === 'login' || to.name === 'register') return true
  try {
    await getAdminProfile()
    return true
  } catch {
    console.log('未登录')
    return { name: 'login' }
  }
})

export default router
