<script setup lang="ts">
import { useAuthStore } from '@/stores/user'
import { onMounted } from 'vue'
import BasicFooter from '@/components/BasicFooter.vue'
import NavBar from '@/components/NavBar.vue'

const auth = useAuthStore()

onMounted(() => {
  auth.user = auth.pb.authStore.model
})
</script>

<template>
  <NavBar :username="auth.user?.name" />
  <slot></slot>

  <BasicFooter></BasicFooter>
</template>
