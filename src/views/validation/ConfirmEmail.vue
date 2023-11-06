<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GuessLayout from '../GuessLayout.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
const verified = ref(false)
const auth = useAuthStore()
const error = ref(false)
onMounted(async () => {
  if (typeof router.currentRoute.value.query.token == 'string') {
    await auth
      .verifyEmail(router.currentRoute.value.query.token)
      .then(() => {
        verified.value = true
      })
      .catch(() => {
        verified.value = true
        error.value = true
      })
  }
})
</script>

<template>
  <GuessLayout title="Recuperación de contraseña" :backButton="true">
    <!-- Recover Password Section -->
    <p class="text-center text-3xl">Validación de correo</p>
    <LoadingCircle :is-loaded="!verified" />
    <p v-if="verified == true && error == false">¡Su correo ha sido verificado correctamente!</p>
    <p v-if="verified == true && error == true">
      ¡Ha ocurrido un error al verificar tu correo, intentelo denuevo!
    </p>
  </GuessLayout>
</template>
