<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted, reactive, ref } from 'vue'
import InputError from '@/components/InputError.vue'
import InputField from '@/components/InputField.vue'
import InputComponent from '@/components/InputComponent.vue'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import { computed } from 'vue'
import {
  requiredValidation,
  minLengthValidation,
  passwordValidation
} from '@/helpers/validationHelpers'
import GuessLayout from '../GuessLayout.vue'
const auth = useAuthStore()
const formData = reactive({
  token: '',
  password: '',
  confirmPassword: ''
})
const formSent = ref(false)
const formRules = computed(() => {
  return {
    token: {
      required: requiredValidation
    },
    password: {
      required: requiredValidation(),
      minLength: minLengthValidation(8)
    },
    confirmPassword: {
      required: requiredValidation(),
      minLength: minLengthValidation(8),
      password: passwordValidation(formData.password)
    }
  }
})
const v$ = useVuelidate(formRules, formData)
const submit = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    await auth
      .changePassword(formData.token, formData.password, formData.confirmPassword)
      .then(() => (formSent.value = true))
  }
}

onMounted(() => {
  if (typeof router.currentRoute.value.query.token == 'string') {
    formData.token = router.currentRoute.value.query.token
  }
})
</script>

<template>
  <GuessLayout title="Recuperación de contraseña">
    <template v-if="!formSent">
      <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="submit()">
        <InputError
          v-if="auth.errors.isActive"
          classes="text-center"
          :message="auth.errors.message"
        />

        <!-- Contraseña -->
        <InputField label="Nueva Contraseña" name="password">
          <template #InputField
            ><InputComponent type="password" name="password" v-model.trim="formData.password"
          /></template>
          <template #InputError
            ><InputError v-if="v$.password.$error" :message="v$.password.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Confirmar contraseña -->
        <InputField label="Confirmar Nueva Contraseña" name="confirmPassword">
          <template #InputField
            ><InputComponent
              type="password"
              name="confirmPassword"
              v-model.trim="formData.confirmPassword"
          /></template>
          <template #InputError
            ><InputError
              v-if="v$.confirmPassword.$error"
              :message="v$.confirmPassword.$errors[0]?.$message"
          /></template>
        </InputField>

        <button
          type="submit"
          class="mt-2 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
        >
          Cambiar Contraseña
        </button>
      </form>
    </template>
    <template v-else>
      <div class="mt-6 rounded-lg p-2">
        <p class="text-center text-4xl font-bold text-blue-900">
          ¡Tu contraseña ha sido reestablecida exitosamente!
        </p>
      </div>
    </template>
  </GuessLayout>
</template>
