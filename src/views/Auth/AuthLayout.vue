<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import BasicFooter from '@/components/BasicFooter.vue'
import NavBar from '@/components/Navigation/NavBar.vue'

const auth = useAuthStore()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavBar :username="auth.user?.name" />
    <main class="flex-grow pt-28">
      <slot></slot>
    </main>
    <BasicFooter classes="mt-auto" />
  </div>
</template>
