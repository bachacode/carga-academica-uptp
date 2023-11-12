<script setup lang="ts">
import FormComponent from '@/components/Containers/FormComponent.vue'
import InputField from '@/components/InputField.vue'
import InputComponent from '@/components/InputComponent.vue'
import InputError from '@/components/InputError.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import { useUsuarioStore, type EditarUsuario } from '@/stores/usuarios'
import {
  isUnique,
  maxLengthValidation,
  minLengthValidation,
  requiredValidation,
  uniqueValidation
} from '@/helpers/validationHelpers'
// Store de autenticación
const auth = useAuthStore()

// Store de alertas
const alert = useAlertStore()

// Store de usuarios
const users = useUsuarioStore()

// Variables reactivas del formulario
const formData = reactive<EditarUsuario>({
  username: '',
  nombre: '',
  apellido: '',
  cedula: '',
  telefono: '',
  cargo: ''
})

// Booleano para el botón de submit
const isLoading = ref(false)

// Validaciones unicas
const isUsernameTaken = isUnique(users, 'username')
const isCedulaTaken = isUnique(users, 'cedula')

// Reglas de validación
const formRules = computed(() => {
  return {
    username: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      unique: uniqueValidation('usuario', 'usuarios', isUsernameTaken, formData.username)
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

// Objeto de validaciáon
const v$ = useVuelidate(formRules, formData)

// Función para enviar el formulario
async function submitData() {
  await v$.value.$validate()
  if (!v$.value.$error && auth.user?.id) {
    isLoading.value = true
    await auth.pb
      .collection('usuarios')
      .update(auth.user?.id, formData)
      .then(async () => {
        await alert.setSuccess({ message: '¡Se han actualizado sus datos correctamente!' })
        isLoading.value = false
      })
      .catch(async () => {
        await alert.setError({ message: '¡Ha ocurrido un error al actualizar sus datos!' })
        isLoading.value = false
      })
  }
}

// Al inicializar el componente, asigna al objeto reactivo del formulario los datos del usuario autenticado
onMounted(async () => {
  Object.assign(formData, auth.pb.authStore.model)
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

      <!-- Nombre + Apellido -->
      <div class="flex w-full space-x-2">
        <!-- Nombre -->
        <InputField label="Nombre" name="name">
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="@"
              data-maska-tokens="@:[a-zA-Z\s]:repeated"
              name="name"
              v-model.trim="formData.nombre"
          /></template>
          <template #InputError
            ><InputError v-if="v$.nombre.$error" :message="v$.nombre.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Apellido -->
        <InputField label="Apellido" name="apellido">
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="@"
              data-maska-tokens="@:[a-zA-Z\s]:repeated"
              name="apellido"
              v-model="formData.apellido"
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
            data-maska="########"
            data-maska-tokens="'0':/[0-9]/:M"
            name="cedula"
            v-model="formData.cedula"
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
            data-maska="###########"
            name="telefono"
            v-model="formData.telefono"
        /></template>
        <template #InputError
          ><InputError v-if="v$.telefono.$error" :message="v$.telefono.$errors[0]?.$message"
        /></template>
      </InputField>
    </template>
  </FormComponent>
</template>
