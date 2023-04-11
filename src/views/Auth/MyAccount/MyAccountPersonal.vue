<script setup lang="ts">
import FormComponent from '@/components/Containers/FormComponent.vue'
import InputField from '@/components/InputField.vue'
import InputComponent from '@/components/InputComponent.vue'
import InputError from '@/components/InputError.vue'
import { data } from '../Usuarios/UsuariosData'
import { onMounted } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
const auth = useAuthStore()
const alert = useAlertStore()
const { editFormData, editFormRules } = data
const v$ = useVuelidate(editFormRules, editFormData)

async function submitData() {
  await v$.value.$validate()
  if (!v$.value.$error && auth.user?.id) {
    await auth.pb
      .collection('users')
      .update(auth.user?.id, editFormData)
      .then(async () => {
        await alert.setSuccess({ message: '¡Se han actualizado sus datos correctamente!' })
      })
      .catch(async () => {
        await alert.setError({ message: '¡Ha ocurrido un error al actualizar sus datos!' })
      })
  }
}

onMounted(async () => {
  Object.assign(editFormData, auth.user)
})
</script>

<template>
  <!-- Datos Personales -->
  <FormComponent
    class="flex-grow"
    form-width="w-3/4"
    submit-text="Guardar Cambios"
    @form-submit="submitData"
    :back-button="false"
    form-title="Datos Personales"
  >
    <template #inputs>
      <!-- Nombre de usuario -->
      <InputField label="Nombre de usuario" name="username">
        <template #InputField
          ><InputComponent name="username" v-model.trim="editFormData.username"
        /></template>
        <template #InputError
          ><InputError v-if="v$.username.$error" :message="v$.username.$errors[0]?.$message"
        /></template>
      </InputField>

      <!-- Nombre + Apellido -->
      <div class="flex w-full space-x-2">
        <!-- Nombre -->
        <InputField label="Nombre" name="name">
          <template #InputField
            ><InputComponent name="name" v-model.trim="editFormData.name"
          /></template>
          <template #InputError
            ><InputError v-if="v$.name.$error" :message="v$.name.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Apellido -->
        <InputField label="Apellido" name="apellido">
          <template #InputField
            ><InputComponent name="apellido" v-model="editFormData.apellido"
          /></template>
          <template #InputError
            ><InputError v-if="v$.apellido.$error" :message="v$.apellido.$errors[0]?.$message"
          /></template>
        </InputField>
      </div>

      <!-- Cedula -->
      <InputField label="Cedula" name="cedula">
        <template #InputField
          ><InputComponent
            v-maska
            data-maska="V-##.###.###"
            data-maska-tokens="'0':/[0-9]/:M"
            name="cedula"
            v-model="editFormData.cedula"
        /></template>
        <template #InputError
          ><InputError v-if="v$.cedula.$error" :message="v$.cedula.$errors[0]?.$message"
        /></template>
      </InputField>

      <!-- Telefono -->
      <InputField label="Telefono" name="telefono">
        <template #InputField
          ><InputComponent
            v-maska
            data-maska="### ###-##-##"
            name="telefono"
            v-model="editFormData.telefono"
        /></template>
        <template #InputError
          ><InputError v-if="v$.telefono.$error" :message="v$.telefono.$errors[0]?.$message"
        /></template>
      </InputField>
    </template>
  </FormComponent>
</template>
