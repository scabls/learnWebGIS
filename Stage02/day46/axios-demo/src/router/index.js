import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add',
      name: 'addUser',
      component: () => import('@/views/AddUserView.vue'),
    },
    {
      path: '/edit/:id',
      name: 'editUser',
      component: () => import('@/views/EditUserView.vue'),
    },
  ],
})

export default router
