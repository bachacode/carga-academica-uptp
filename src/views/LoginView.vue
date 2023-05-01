<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed, reactive, ref } from 'vue'
import InputError from '@/components/InputError.vue'
import InputField from '@/components/InputField.vue'
import InputComponent from '@/components/InputComponent.vue'
import GuessLayout from './GuessLayout.vue'
import { minLengthValidation, requiredValidation } from '@/helpers/validationHelpers'
import useVuelidate from '@vuelidate/core'
const auth = useAuthStore()
const formData = reactive({
  username: '',
  password: ''
})
const isLoading = ref(false)
const formRules = computed(() => {
  return {
    username: {
      required: requiredValidation()
    },
    password: {
      required: requiredValidation(),
      minLength: minLengthValidation(8)
    }
  }
})
const v$ = useVuelidate(formRules, formData)

const login = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    let { username, password } = formData
    await auth
      .login(username, password)
      .then(() => {
        isLoading.value = false
      })
      .catch(() => {
        isLoading.value = false
      })
  }
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

      <!-- Nombre de usuario -->
      <InputField label="Nombre de usuario" name="username">
        <template #InputField
          ><InputComponent
            input-classes="bg-indigo-50 text-indigo-900 border-indigo-300"
            name="username"
            v-model="formData.username"
        /></template>
        <template #InputError
          ><InputError v-if="v$.username.$error" :message="v$.username.$errors[0]?.$message"
        /></template>
      </InputField>

      <!-- Contraseña -->
      <InputField label="Contraseña" name="password">
        <template #InputField
          ><InputComponent
            input-classes="bg-indigo-50 text-indigo-900 border-indigo-300"
            type="password"
            name="password"
            v-model="formData.password"
          />
        </template>
        <template #InputError
          ><InputError v-if="v$.password.$error" :message="v$.password.$errors[0]?.$message"
        /></template>
      </InputField>
      <!-- Submit Button -->
      <button
        v-show="!isLoading"
        type="submit"
        class="text-md w-full rounded-lg bg-indigo-700 px-6 py-3 text-center font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
      >
        Iniciar Sesión
      </button>
      <!-- Loading Submit -->
      <button
        v-show="isLoading"
        disabled
        type="button"
        class="text-md w-full rounded-lg bg-indigo-700 px-6 py-3 text-center font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
      >
        <svg
          aria-hidden="true"
          role="status"
          class="mr-3 inline h-4 w-4 animate-spin text-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        Cargando...
      </button>
      <router-link class="mt-2 text-center text-sm text-indigo-600 underline" to="recover-password"
        >¿Has olvidado tu contraseña?</router-link
      >
    </form>
  </GuessLayout>
</template>
