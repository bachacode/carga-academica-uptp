<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import InputError from '@/components/InputError.vue'
import InputField from '@/components/InputField.vue'
import { onBeforeMount } from 'vue'
import router from '@/router'

const auth = useAuthStore()
const username = ref('')
const password = ref('')

const login = async () => {
  await auth.login(username.value, password.value)
}

onBeforeMount(() => {
  if (auth.pb.authStore.isValid) {
    router.push('dashboard')
  }
})
</script>

<template>
  <div></div>
  <main class="h-screen bg-blue-100">
    <div class="flex w-full flex-wrap">
      <!-- Login Section -->
      <div class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <span class="bg-blue-800 p-4 text-xl font-bold text-white">Logo</span>
        </div>

        <div
          class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32"
        >
          <p class="text-center text-3xl">¡Bienvenido!</p>
          <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="login()">
            <InputError
              v-if="auth.errors.isActive"
              classes="text-center"
              :message="auth.errors.message"
            />
            <InputField
            label="Nombre de usuario"
            name="username"
            placeholder="Nombre de usuario" 
            v-model="username" />
            <InputField
            label="Contraseña"
            name="password"
            type="password" 
            placeholder="Contraseña" 
            v-model="password" />
            <button
              type="submit"
              class="mt-8 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>

      <!-- Image Section -->
      <div class="w-1/2 shadow-2xl">
        <img
          class="hidden h-screen w-full object-cover md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
        />
      </div>
    </div>
  </main>
</template>
