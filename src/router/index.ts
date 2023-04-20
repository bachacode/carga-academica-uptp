import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rutas no autenticadas
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/recover-password',
      name: 'recover-password',
      component: () => import('@/views/RecoverPassword.vue')
    },
    {
      path: '/confirm-password-reset',
      name: 'confirm-password-reset',
      beforeEnter: (to) => {
        if (!to.query.token) {
          router.back()
        }
      },
      component: () => import('@/views/validation/ConfirmPassword.vue')
    },
    {
      path: '/confirm-email-change',
      name: 'confirm-email-change',
      beforeEnter: (to) => {
        if (!to.query.token) {
          router.back()
        }
      },
      component: () => import('@/views/validation/ConfirmEmailChange.vue')
    },
    {
      path: '/confirm-verification',
      name: 'confirm-verification',
      beforeEnter: (to) => {
        if (!to.query.token) {
          router.back()
        }
      },
      component: () => import('@/views/validation/ConfirmEmail.vue')
    },
    // Rutas Autenticadas
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Auth/DashboardView.vue')
    },

    // Rutas Autenticadas - Mi cuenta
    {
      path: '/my-account',
      component: () => import('@/views/Auth/MyAccount/MyAccountView.vue'),
      children: [
        {
          path: '',
          name: 'my-account',
          component: () => import('@/views/Auth/MyAccount/MyAccountPersonal.vue')
        },
        {
          path: 'change-password',
          name: 'my-password',
          component: () => import('@/views/Auth/MyAccount/MyAccountPassword.vue')
        },
        {
          path: 'change-email',
          name: 'my-email',
          component: () => import('@/views/Auth/MyAccount/MyAccountEmail.vue')
        }
      ]
    },

    // Rutas Autenticadas - Secciones
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
          name: 'saberes.create',
          component: () => import('@/views/Auth/Saberes/SaberesCreate.vue')
        },
        {
          path: 'edit/:id',
          name: 'saberes.edit',
          component: () => import('@/views/Auth/Saberes/SaberesEdit.vue')
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
          name: 'profesores.create',
          component: () => import('@/views/Auth/Profesores/ProfesoresCreate.vue')
        },
        {
          path: 'edit/:id',
          name: 'profesores.edit',
          component: () => import('@/views/Auth/Profesores/ProfesoresEdit.vue')
        }
      ]
    },
    {
      path: '/carga',
      children: [
        {
          path: '',
          name: 'carga',
          component: () => import('@/views/Auth/Carga/CargaView.vue')
        },
        {
          path: 'create',
          name: 'carga.create',
          component: () => import('@/views/Auth/Carga/CargaCreate.vue')
        },
        {
          path: 'edit/:id',
          name: 'carga.edit',
          component: () => import('@/views/Auth/Carga/CargaEdit.vue')
        },
        {
          path: 'recommend',
          name: 'carga.recommend',
          component: () => import('@/views/Auth/Carga/CargaRecomendations.vue')
        }
      ]
    },
    {
      path: '/usuarios',
      children: [
        {
          path: '',
          name: 'usuarios',
          component: () => import('@/views/Auth/Usuarios/UsuariosView.vue')
        },
        {
          path: 'create',
          name: 'usuarios.create',
          component: () => import('@/views/Auth/Usuarios/UsuariosCreate.vue')
        },
        {
          path: 'edit/:id',
          name: 'usuarios.edit',
          component: () => import('@/views/Auth/Usuarios/UsuariosEdit.vue')
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
        }
      ]
    }
  ]
})
export default router
