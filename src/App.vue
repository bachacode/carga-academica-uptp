<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router';
import { useAuthStore } from './stores/auth';
const { pb } = useAuthStore();

router.beforeEach(async (to, from) => {
  if (!pb.authStore.isValid && to.name !== 'login') {
    return { name: 'login' }
  }
})
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
