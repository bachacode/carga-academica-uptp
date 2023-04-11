<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router'
import { useAuthStore } from './stores/auth'
const store = useAuthStore()

router.beforeEach(async (to) => {
  if (
    !store.pb.authStore.isValid &&
    //@ts-ignore
    !['login', 'recover-password', 'confirm-password-reset'].includes(to.name)
  ) {
    return { name: 'login' }
  } else if (store.pb.authStore.isValid && to.name === 'login') {
    return { name: 'dashboard' }
  } else if (store.user?.rol !== 'Administrador' && to.path === '/usuarios') {
    return { name: 'dashboard' }
  }
})
</script>

<template>
  <Suspense>
    <RouterView :key="$route.fullPath" />
  </Suspense>
</template>
