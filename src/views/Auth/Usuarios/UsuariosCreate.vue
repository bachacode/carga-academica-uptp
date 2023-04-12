<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { onUnmounted, reactive, ref } from 'vue'
import { useUsuarioStore } from '@/stores/usuarios'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import InputSelect from '@/components/InputSelect.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { data } from './UsuariosData'
const store = useUsuarioStore()
const { save } = store
const { formData, formRules } = data
const cargoOptions = reactive([
  { value: 'Profesor', name: 'Profesor' },
  { value: 'Administracion', name: 'Administracion' }
])
const isLoading = ref(false)
const v$ = useVuelidate(formRules, formData)

const submitData = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    save(formData)
  }
}

onUnmounted(() => {
  Object.assign(formData, {
    username: '',
    email: '',
    emailVisibility: true,
    password: '',
    passwordConfirm: '',
    name: '',
    apellido: '',
    cedula: '',
    telefono: '',
    cargo: '',
    rol: 'Operador',
    status: true
  })
})
</script>

<template>
  <AuthLayout>
    <FormComponent
      submit-text="Registrar Usuario"
      @form-submit="submitData"
      :is-loading="isLoading"
    >
      <template #inputs>
        <!-- Nombre de usuario -->
        <InputField label="Nombre de usuario" name="username">
          <template #InputField
            ><InputComponent name="username" v-model.trim="formData.username"
          /></template>
          <template #InputError
            ><InputError v-if="v$.username.$error" :message="v$.username.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Contraseña -->
        <InputField label="Contraseña" name="password">
          <template #InputField
            ><InputComponent type="password" name="password" v-model.trim="formData.password"
          /></template>
          <template #InputError
            ><InputError v-if="v$.password.$error" :message="v$.password.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Confirmar contraseña -->
        <InputField label="Confirmar Contraseña" name="passwordConfirm">
          <template #InputField
            ><InputComponent
              type="password"
              name="passwordConfirm"
              v-model.trim="formData.passwordConfirm"
          /></template>
          <template #InputError
            ><InputError
              v-if="v$.passwordConfirm.$error"
              :message="v$.passwordConfirm.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Nombre + Apellido -->
        <div class="flex w-full space-x-2">
          <!-- Nombre -->
          <InputField label="Nombre" name="name">
            <template #InputField
              ><InputComponent name="name" v-model.trim="formData.name"
            /></template>
            <template #InputError
              ><InputError v-if="v$.name.$error" :message="v$.name.$errors[0]?.$message"
            /></template>
          </InputField>

          <!-- Apellido -->
          <InputField label="Apellido" name="apellido">
            <template #InputField
              ><InputComponent name="apellido" v-model="formData.apellido"
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
              v-model="formData.cedula"
          /></template>
          <template #InputError
            ><InputError v-if="v$.cedula.$error" :message="v$.cedula.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Cargo -->
        <InputField label="Cargo" name="cargo">
          <template #InputField
            ><InputSelect
              :options="cargoOptions"
              placeholder="Seleccione un cargo"
              name="cargo"
              v-model="formData.cargo"
          /></template>
          <template #InputError
            ><InputError v-if="v$.cargo.$error" :message="v$.cargo.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Telefono -->
        <InputField label="Telefono" name="telefono">
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="### ###-##-##"
              name="telefono"
              v-model="formData.telefono"
          /></template>
          <template #InputError
            ><InputError v-if="v$.telefono.$error" :message="v$.telefono.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Correo -->
        <InputField type="email" label="Correo" name="email">
          <template #InputField><InputComponent name="email" v-model="formData.email" /></template>
          <template #InputError
            ><InputError v-if="v$.email.$error" :message="v$.email.$errors[0]?.$message"
          /></template>
        </InputField>
      </template>
    </FormComponent>
  </AuthLayout>
</template>
