<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import InputError from '@/components/InputError.vue'
import InputField from '@/components/InputField.vue'
import InputComponent from '@/components/InputComponent.vue'
const auth = useAuthStore()
const email = ref('')

const submit = async () => {
  await auth.recoverPassword(email.value)
}
</script>

<template>
  <main class="h-screen bg-blue-100">
    <div class="flex w-full flex-wrap">
      <!-- Recover Password Section -->
      <div class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <span class="bg-blue-800 p-4 text-xl font-bold text-white">Logo</span>
        </div>
        <div
          class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32"
        >
          <p class="text-center text-3xl">Recuperación de contraseña</p>
          <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="submit()">
            <InputError
              v-if="auth.errors.isActive"
              classes="text-center"
              :message="auth.errors.message"
            />
            <InputField label="Correo Electronico" name="email">
              <template #InputField
                ><InputComponent class="bg-slate-100" name="email" v-model="email"
              /></template>
            </InputField>
            <button
              type="submit"
              class="mt-2 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
            >
              Recuperar contraseña
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