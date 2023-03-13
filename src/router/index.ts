import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Auth/DashboardView.vue')
    },
    {
      path: '/secciones',
      children: [
        {
          path: '',
          name: 'secciones',
          component: () => import('@/views/Auth/Secciones/index.vue'),
        },
        {
          path: 'create',
          name: 'create',
          component: () => import('@/views/Auth/Secciones/create.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import('@/views/Auth/Secciones/edit.vue'),
        }
      ]
    },
    {
      path: '/saberes',
      children: [
        {
          path: '',
          name: 'saberes',
          component: () => import('@/views/Auth/Saberes/index.vue'),
        },
        {
          path: 'create',
          name: 'create',
          component: () => import('@/views/Auth/Secciones/create.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import('@/views/Auth/Secciones/edit.vue'),
        }
      ]
    },
    {
      path: '/profesores',
      children: [
        {
          path: '',
          name: 'profesores',
          component: () => import('@/views/Auth/Profesores/index.vue'),
        },
        {
          path: 'create',
          name: 'create',
          component: () => import('@/views/Auth/Secciones/create.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import('@/views/Auth/Secciones/edit.vue'),
        }
      ]
    },
    {
      path: '/pensums',
      children: [
        {
          path: '',
          name: 'pensums',
          component: () => import('@/views/Auth/Pensums/index.vue'),
        },
        {
          path: 'create',
          name: 'create',
          component: () => import('@/views/Auth/Secciones/create.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import('@/views/Auth/Secciones/edit.vue'),
        }
      ]
    }
  ]
})
export default router
