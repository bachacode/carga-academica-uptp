import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Auth/DashboardView.vue')
    },
    {
      path: '/secciones',
      name: 'secciones',
      component: () => import('@/views/Auth/SeccionView.vue')
    }
  ]
})
export default router
