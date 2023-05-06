<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import InputError from '@/components/InputError.vue'
import InputField from '@/components/InputField.vue'
import InputComponent from '@/components/InputComponent.vue'
import GuessLayout from './GuessLayout.vue'
const auth = useAuthStore()
const email = ref('')
const emailSent = ref(false)
const submit = async () => {
  await auth.recoverPassword(email.value).then(() => (emailSent.value = true))
}
</script>

<template>
  <GuessLayout title="Recuperación de contraseña" :backButton="true">
    <template v-if="!emailSent">
      <p class="pt-3 text-center">
        ¿Olvidaste tu contraseña? Escribe tu email y te enviaremos instrucciones para reestablecer
        tu contraseña
      </p>
      <form class="flex flex-col pt-2 md:pt-8" @submit.prevent="submit()">
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
          class="mt-2 bg-indigo-800 p-2 text-lg font-bold text-white hover:bg-indigo-900"
        >
          Recuperar contraseña
        </button>
      </form>
    </template>
    <template v-else>
      <div class="mt-6 rounded-lg border border-indigo-700 bg-indigo-300 p-2 shadow-2xl">
        <p class="text-xl font-medium text-indigo-800">
          Se han enviado las instrucciones para reestablecer su contraseña al correo que ha
          introducido, si no recibe ningún correo, intentelo nuevamente y aseguresé de que el correo
          introducido es el correcto
        </p>
      </div>
    </template>
  </GuessLayout>
</template>
