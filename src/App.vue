<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router'
import { useAuthStore } from './stores/auth'
const store = useAuthStore()

router.beforeEach(async (to) => {
  if (!store.pb.authStore.isValid && to.name !== 'login') {
    return { name: 'login' }
  }
  if (store.pb.authStore.isValid && to.name === 'login') {
    return { name: 'dashboard' }
  }
  if (store.user?.rol !== 'Administrador' && to.path === '/usuarios') {
    return { name: 'dashboard' }
  }
})
</script>

<template>
  <Suspense>
    <RouterView :key="$route.fullPath" />
  </Suspense>
</template>
