<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router'
import { useAuthStore } from './stores/auth'
const store = useAuthStore()

router.beforeEach(async (to) => {
  store.pb.collection('users').authRefresh()
  if (
    !store.pb.authStore.isValid &&
    !['login', 'recover-password', 'confirm-password-reset', 'confirm-verification'].includes(
      //@ts-ignore
      to.name
    )
  ) {
    return { name: 'login' }
  } else if (
    store.pb.authStore.isValid &&
    //@ts-ignore
    ['login', 'recover-password', 'confirm-password-reset'].includes(to.name)
  ) {
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
