<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import BasicFooter from '@/components/BasicFooter.vue'
import NavBar from '@/components/Navigation/NavBar.vue'
import SuccessAlert from '@/components/SuccessAlert.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import { onUnmounted } from 'vue'
const auth = useAuthStore()
const alert = useAlertStore()

onUnmounted(() => {
  alert.successAlert.isActive = false
  alert.errorAlert.isActive = false
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavBar :username="auth.user?.name" />
    <main class="flex-grow pt-28">
      <Transition name="slide-fade">
        <SuccessAlert
          v-if="alert.successAlert.isActive"
          :message="alert.successAlert.message"
          @close="alert.disableAlert"
        />
      </Transition>
      <Transition name="slide-fade">
        <ErrorAlert
          v-if="alert.errorAlert.isActive"
          :message="alert.errorAlert.message"
          @close="alert.disableAlert"
        />
      </Transition>
      <slot></slot>
    </main>
    <BasicFooter classes="mt-auto" />
  </div>
</template>
