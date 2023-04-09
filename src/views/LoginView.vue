<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import InputError from '@/components/InputError.vue'
import InputField from '@/components/InputField.vue'
import InputComponent from '@/components/InputComponent.vue'
import GuessLayout from './GuessLayout.vue'
const auth = useAuthStore()
const username = ref('')
const password = ref('')

const login = async () => {
  await auth.login(username.value, password.value)
}
</script>

<template>
  <GuessLayout title="¡Bienvenido!">
    <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="login()">
      <InputError
        v-if="auth.errors.isActive"
        classes="text-center"
        :message="auth.errors.message"
      />
      <InputField label="Nombre de usuario" name="username">
        <template #InputField
          ><InputComponent class="bg-slate-100" name="username" v-model="username"
        /></template>
      </InputField>
      <InputField label="Contraseña" name="password">
        <template #InputField
          ><InputComponent
            type="password"
            class="bg-slate-100"
            name="password"
            v-model="password"
          />
        </template>
      </InputField>
      <button
        type="submit"
        class="mt-2 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
      >
        Iniciar Sesión
      </button>
      <router-link class="mt-2 text-center text-sm text-blue-600 underline" to="recover-password"
        >¿Has olvidado la contraseña?</router-link
      >
    </form>
  </GuessLayout>
</template>
