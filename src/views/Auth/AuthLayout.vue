<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import BasicFooter from '@/components/BasicFooter.vue'
import NavBar from '@/components/Navigation/NavBar.vue'
import AlertComponent from '@/components/AlertComponent.vue'
import { onUnmounted } from 'vue'
// Store de autenticación
const auth = useAuthStore()

// Store de alertas
const alert = useAlertStore()

// En cambio de ruta, se desactiva la alerta actual
onUnmounted(() => {
  alert.data.isActive = false
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavBar :username="auth.user?.name" />
    <main class="flex-grow pt-28">
      <Transition name="slide-fade">
        <AlertComponent
          v-if="alert.data.isActive"
          :message="alert.data.message"
          :type="alert.data.type"
          @close="alert.disableAlert"
        />
      </Transition>
      <slot></slot>
    </main>
    <BasicFooter classes="mt-auto" />
  </div>
</template>
