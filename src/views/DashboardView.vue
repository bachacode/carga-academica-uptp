<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/user'
import router from '@/router'
import { onMounted } from 'vue'

const auth = useAuthStore()

const logout = () => {
  auth.pb.authStore.clear()
  router.push('/')
}

onMounted(() => {
  auth.user = auth.pb.authStore.model
})
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/"></RouterLink>
        <button @click="logout()">Log out</button>
        <button @click="auth.getUser()">pave</button>
      </nav>
    </div>
  </header>
  <main>
    <div class="flex flex-col items-center space-y-2 p-4">
      <h1>This should be a dashboard</h1>
    </div>
  </main>
</template>
