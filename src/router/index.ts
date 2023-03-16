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
          component: () => import('@/views/Auth/Secciones/SeccionesView.vue')
        },
        {
          path: 'create',
          name: 'secciones.create',
          component: () => import('@/views/Auth/Secciones/SeccionesCreate.vue')
        },
        {
          path: 'edit/:id',
          name: 'secciones.edit',
          component: () => import('@/views/Auth/Secciones/SeccionesEdit.vue')
        }
      ]
    },
    {
      path: '/saberes',
      children: [
        {
          path: '',
          name: 'saberes',
          component: () => import('@/views/Auth/Saberes/SaberesView.vue')
        },
        {
          path: 'create',
          name: 'create',
          component: () => import('@/views/Auth/Secciones/SeccionesCreate.vue')
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import('@/views/Auth/Secciones/SeccionesEdit.vue')
        }
      ]
    },
    {
      path: '/profesores',
      children: [
        {
          path: '',
          name: 'profesores',
          component: () => import('@/views/Auth/Profesores/ProfesoresView.vue')
        },
        {
          path: 'create',
          name: 'create',
          component: () => import('@/views/Auth/Secciones/SeccionesCreate.vue')
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import('@/views/Auth/Secciones/SeccionesEdit.vue')
        }
      ]
    },
    {
      path: '/pensums',
      children: [
        {
          path: '',
          name: 'pensums',
          component: () => import('@/views/Auth/Pensums/PensumsView.vue')
        },
        {
          path: 'create',
          name: 'create',
          component: () => import('@/views/Auth/Secciones/SeccionesCreate.vue')
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import('@/views/Auth/Secciones/SeccionesEdit.vue')
        }
      ]
    }
  ]
})
export default router
