import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 配置一级路由
    {
      path: '/',
      name: 'admin',
      component: () => import('../views/LayoutView.vue'),
      // 配置路由的重定向
      redirect: './dashboard',
      // 配置二级路由(二级路由一般不以/开头, 此时会拼接到父级路由)
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/admin/DashBoardView.vue'),
        },
        {
          path: 'blog/:id?',
          name: 'blog',
          component: () => import('../views/admin/BlogView.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/admin/AboutView.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('../views/admin/ContactView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views//LoginView.vue'),
    },
    {
      // 捕获所有路由或 404 Not found 路由
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

// 配置全局导航守卫
router.beforeEach((to, from, next) => {
  // to:到哪里去
  // from:从哪里来
  // next:放行
  const isLogin = localStorage.getItem('isLogin')
  if (isLogin) next()
  else {
    if (to.path != '/login') {
      alert('请先登录')
      next('/login')
    } else next()
  }
})
export default router
