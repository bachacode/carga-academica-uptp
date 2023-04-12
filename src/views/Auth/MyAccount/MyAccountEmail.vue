<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import CardContainer from '@/components/Containers/CardContainer.vue'
import InputComponent from '@/components/InputComponent.vue'
import { reactive, computed, onMounted, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { emailValidation, requiredValidation } from '@/helpers/validationHelpers'
import InputField from '@/components/InputField.vue'
import { useAlertStore } from '@/stores/alert'
const auth = useAuthStore()
const form = reactive({
  email: ''
})
const alert = useAlertStore()
const actualEmail = ref('')
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
    actualEmail.value = auth.user.email
  }
})

const sendEmail = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    await auth.pb
      .collection('users')
      .requestEmailChange(form.email)
      .then(async () => {
        await alert.setSuccess({ message: '¡Se ha enviado el correo correctamente!' })
      })
      .catch(async () => {
        await alert.setError({ message: '¡Ha ocurrido un error!' })
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
          ><InputError v-if="v$.email.$error" :message="v$.email.$errors[0]?.$message"
        /></template>
      </InputField>
      <button
        @click="sendEmail"
        type="submit"
        class="text-md rounded-md bg-blue-700 px-6 py-3 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
      >
        Cambiar Correo
      </button>
    </div>
  </CardContainer>
</template>
