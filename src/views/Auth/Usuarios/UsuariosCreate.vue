<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { computed, reactive, ref } from 'vue'
import { useUsuarioStore, type registerUserType } from '@/stores/usuarios'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import InputSelect from '@/components/InputSelect.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import {
  emailValidation,
  isUnique,
  maxLengthValidation,
  minLengthValidation,
  passwordValidation,
  requiredValidation,
  uniqueValidation
} from '@/helpers/validationHelpers'

// Store del módulo
const store = useUsuarioStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Variables reactivas del formulario
const formData = reactive<registerUserType>({
  username: '',
  email: '',
  emailVisibility: true,
  password: '',
  passwordConfirm: '',
  nombre: '',
  apellido: '',
  cedula: '',
  telefono: '',
  cargo: '',
  rol: 'Operador',
  status: true
})

// Validaciones unicas
const isUsernameTaken = isUnique(store, 'username')
const isEmailTaken = isUnique(store, 'email')
const isCedulaTaken = isUnique(store, 'cedula')

// Reglas de validación
const formRules = computed(() => {
  return {
    username: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      unique: uniqueValidation('usuario', 'usuarios', isUsernameTaken, formData.username)
    },
    password: {
      required: requiredValidation(),
      minLength: minLengthValidation(8)
    },
    passwordConfirm: {
      required: requiredValidation(),
      minLength: minLengthValidation(8),
      password: passwordValidation(formData.password)
    },
    email: {
      required: requiredValidation(),
      email: emailValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40),
      unique: uniqueValidation('correo', 'usuarios', isEmailTaken, formData.email)
    },
    nombre: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40)
    },
    apellido: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40)
    },
    cedula: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40),
      unique: uniqueValidation('cedula', 'usuarios', isCedulaTaken, formData.cedula)
    },
    telefono: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40)
    },
    cargo: {
      required: requiredValidation()
    }
  }
})

// Validación
const v$ = useVuelidate(formRules, formData)

// Función para enviar el formulario
const submitData = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    await store.save(formData)
    isLoading.value = false
  }
}

const cargoOptions = reactive([
  { value: 'Profesor', name: 'Profesor' },
  { value: 'Administracion', name: 'Administracion' }
])
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
              ><InputComponent name="name" v-model.trim="formData.nombre"
            /></template>
            <template #InputError
              ><InputError v-if="v$.nombre.$error" :message="v$.nombre.$errors[0]?.$message"
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
        <InputField label="Cedula" name="cedula" helper-text="Este campo solo acepta numeros">
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="########"
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
        <InputField label="Telefono" name="telefono" helper-text="Este campo solo acepta numeros">
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="###########"
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
