<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import CardContainer from '@/components/Containers/CardContainer.vue'
import InputComponent from '@/components/InputComponent.vue'
import { reactive, computed, onMounted, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { emailValidation, requiredValidation } from '@/helpers/validationHelpers'
import InputField from '@/components/InputField.vue'
import InputError from '@/components/InputError.vue'
import { useAlertStore } from '@/stores/alert'
const auth = useAuthStore()
const form = reactive({
  email: ''
})
const alert = useAlertStore()
const actualEmail = ref('')
const isLoading = ref(false)
const rules = computed(() => {
  return {
    email: {
      required: requiredValidation(),
      email: emailValidation()
    }
  }
})
const v$ = useVuelidate(rules, form)
onMounted(() => {
  if (auth.user?.email) {
    actualEmail.value = auth.user?.email
  }
})

const sendEmail = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    await auth.pb
      .collection('users')
      .requestEmailChange(form.email)
      .then(async () => {
        await alert.setSuccess({ message: '¡Se ha enviado el correo correctamente!' })
        isLoading.value = false
      })
      .catch(async () => {
        await alert.setError({ message: '¡Ha ocurrido un error!' })
        isLoading.value = false
      })
  }
}
</script>

<template>
  <!-- Cambiar Contraseña -->
  <CardContainer card-width="w-3/4" class="flex-grow">
    <div class="mt-4 px-6 pb-6">
      <InputField label="Correo electronico actual" name="oldEmail">
        <template #InputField
          ><p class="ml-2 p-1"></p>
          <InputComponent
            input-classes="p-1 ml-2 rounded-none text-gray-600 bg-gray-200 border-gray-600 font-semibold"
            name="oldEmail"
            :readonly="true"
            v-model="actualEmail"
        /></template>
      </InputField>

      <!-- Nuevo Correo -->
      <InputField
        label="Nuevo correo electronico"
        name="email"
        helper-text="Se le enviará una confirmación al correo que introduzca con las instrucciones para terminar el cambio"
      >
        <template #InputField
          ><InputComponent input-classes="p-1 ml-2" name="email" v-model="form.email"
        /></template>
        <template #InputError
          ><InputError class="pl-4" v-if="v$.email.$error" :message="v$.email.$errors[0]?.$message"
        /></template>
      </InputField>

      <!-- Submit Button -->
      <button
        @click="sendEmail"
        v-show="!isLoading"
        type="submit"
        class="text-md w-full rounded-lg bg-indigo-700 px-6 py-3 text-center font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
      >
        Cambiar correo
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
    </div>
  </CardContainer>
</template>
