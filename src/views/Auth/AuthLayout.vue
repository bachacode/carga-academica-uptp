<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import BasicFooter from '@/components/BasicFooter.vue'
import NavBar from '@/components/Navigation/NavBar.vue'
import SuccessAlert from '@/components/SuccessAlert.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
const auth = useAuthStore()
const alert = useAlertStore()
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

<style>

.slide-fade-enter-from {
  @apply translate-x-full opacity-0 blur-sm;
}

.slide-fade-enter-active {
  @apply transition-all duration-1000 motion-reduce:transition-none
}

.slide-fade-enter-to {
  @apply translate-x-0 blur-0;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-to {
  @apply translate-x-full opacity-0;
}
</style>