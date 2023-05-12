<script setup lang="ts">
import FormComponent from '@/components/Containers/FormComponent.vue'
import InputField from '@/components/InputField.vue'
import InputComponent from '@/components/InputComponent.vue'
import InputError from '@/components/InputError.vue'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import { computed, reactive, ref } from 'vue'
import {
  minLengthValidation,
  passwordValidation,
  requiredValidation
} from '@/helpers/validationHelpers'

const auth = useAuthStore()
const alert = useAlertStore()
const editPasswordForm = reactive({
  oldPassword: '',
  password: '',
  passwordConfirm: ''
})
const isLoading = ref(false)
const editPasswordRules = computed(() => {
  return {
    oldPassword: {
      required: requiredValidation(),
      minLength: minLengthValidation(8)
    },
    password: {
      required: requiredValidation(),
      minLength: minLengthValidation(8)
    },
    passwordConfirm: {
      required: requiredValidation(),
      minLength: minLengthValidation(8),
      password: passwordValidation(editPasswordForm.password)
    }
  }
})
const v$ = useVuelidate(editPasswordRules, editPasswordForm)

async function submitData() {
  await v$.value.$validate()
  if (!v$.value.$error && auth.user?.id) {
    isLoading.value = true
    await auth.pb
      .collection('usuarios')
      .update(auth.user?.id, editPasswordForm)
      .then(async (data) => {
        v$.value.$reset()
        await auth.pb
          .collection('usuarios')
          .authWithPassword(data.username, editPasswordForm.password)
        editPasswordForm.oldPassword = ''
        editPasswordForm.password = ''
        editPasswordForm.passwordConfirm = ''
        await alert.setSuccess({ message: '¡Se ha actualizado su contraseña correctamente!' })
        isLoading.value = false
      })
      .catch((error) => {
        if (error.response.code == 400) {
          alert.setError({ message: '¡La contraseña que introdujo es incorrecta!' })
          isLoading.value = false
        } else if (error.response.code == 404) {
          alert.setError({ message: '¡No se ha encontrado su usuario!' })
          isLoading.value = false
        }
      })
  }
}
</script>

<template>
  <!-- Cambiar Contraseña -->
  <FormComponent
    class="flex-grow"
    form-width="w-3/4"
    submit-text="Cambiar Contraseña"
    @form-submit="submitData"
    :back-button="false"
    form-title="Actualizar contraseña"
    :is-loading="isLoading"
  >
    <template #inputs>
      <!-- Contraseña actual -->
      <InputField label="Contraseña actual" name="oldPassword">
        <template #InputField
          ><InputComponent
            type="password"
            name="oldPassword"
            v-model="editPasswordForm.oldPassword"
        /></template>
        <template #InputError
          ><InputError v-if="v$.oldPassword.$error" :message="v$.oldPassword.$errors[0]?.$message"
        /></template>
      </InputField>

      <!-- Nueva contraseña -->
      <InputField label="Nueva contraseña" name="password">
        <template #InputField
          ><InputComponent type="password" name="password" v-model="editPasswordForm.password"
        /></template>
        <template #InputError
          ><InputError v-if="v$.password.$error" :message="v$.password.$errors[0]?.$message"
        /></template>
      </InputField>

      <!-- Confirmar nueva contraseña -->
      <InputField label="Confirmar nueva contraseña" name="passwordConfirm">
        <template #InputField
          ><InputComponent
            type="password"
            name="passwordConfirm"
            v-model="editPasswordForm.passwordConfirm"
        /></template>
        <template #InputError
          ><InputError
            v-if="v$.passwordConfirm.$error"
            :message="v$.passwordConfirm.$errors[0]?.$message"
        /></template>
      </InputField>
    </template>
  </FormComponent>
</template>
