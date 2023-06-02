<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router'
import { useAuthStore } from './stores/auth'
const store = useAuthStore()
const notAuthRoutes = [
  'login',
  'recover-password',
  'confirm-password-reset',
  'confirm-verification',
  'not-found'
]
const guessRoutes = ['login', 'recover-password', 'confirm-password-reset']
router.beforeEach(async (to) => {
  if (store.pb.authStore.isValid) {
    store.pb.collection('usuarios').authRefresh()
  }
  if (
    typeof to.name == 'string' &&
    !store.pb.authStore.isValid &&
    !notAuthRoutes.includes(to.name)
  ) {
    return { name: 'login' }
  } else if (
    typeof to.name == 'string' &&
    store.pb.authStore.isValid &&
    guessRoutes.includes(to.name)
  ) {
    return { name: 'dashboard' }
  } else if (store.pb.authStore.model?.rol !== 'Administrador' && to.path === '/usuarios') {
    return { name: 'dashboard' }
  }
})
</script>

<template>
  <Suspense>
    <RouterView :key="$route.fullPath" />
  </Suspense>
</template>
