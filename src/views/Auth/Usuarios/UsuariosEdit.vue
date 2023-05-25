<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import { useUsuarioStore } from '@/stores/usuarios'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import InputSelect from '@/components/InputSelect.vue'
import CardContainer from '@/components/Containers/CardContainer.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
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

// Id del item a editar
const id = ref()

// Datos del registro a editar
const singleData = reactive({
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
  estado: true
})

// Variables reactivas del formulario
const formData = reactive({
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
  estado: true
})

// Validaciones unicas
const isUsernameTaken = isUnique(store, 'username', singleData)
const isEmailTaken = isUnique(store, 'email', singleData)
const isCedulaTaken = isUnique(store, 'cedula', singleData)

// Reglas de validación
const formRules = computed(() => {
  return {
    username: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      unique: uniqueValidation('usuario', 'usuarios', isUsernameTaken, formData.username)
    },
    password: {
      minLength: minLengthValidation(8)
    },
    passwordConfirm: {
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

// Opciones del Select "Cargo"
const cargoOptions = reactive([
  { value: 'Profesor', name: 'Profesor' },
  { value: 'Administracion', name: 'Administracion' }
])

// Objeto de validaciáon
const v$ = useVuelidate(formRules, formData)

// Función para enviar el formulario
const submitData = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    await store.update(id.value, formData)
    isLoading.value = false
  }
}

const formType = ref('')

const changePassword = () => {
  formType.value = 'password'
}

const changePersonal = () => {
  formType.value = 'personal'
}

// Al inicializar el componente, asigna el id de la ruta a una variable reactiva de vue
onMounted(async () => {
  if (!(router.currentRoute.value.params.id instanceof Array)) {
    id.value = router.currentRoute.value.params.id
    await store.fetchOne(id.value).then((data) => {
      Object.assign(singleData, data)
      Object.assign(formData, data)
    })
  }
})
</script>

<template>
  <AuthLayout>
    <!-- Botones para elegir formulario -->
    <template v-if="formType == ''">
      <CardContainer card-width="w-1/4 mt-10">
        <LoadingCircle :is-loaded="!formData" />
        <div v-if="formData" class="flex h-44 flex-col space-y-3 p-6">
          <h1
            class="mx-6 mb-3 rounded-lg border border-indigo-700 bg-indigo-200 py-3 text-center font-bold text-slate-800 md:text-xl"
          >
            {{ `${formData.username}` }}
          </h1>
          <button
            @click="changePersonal"
            type="submit"
            class="w-full rounded-lg bg-indigo-700 px-6 py-3 text-center font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Editar datos personales
          </button>
          <button
            @click="changePassword"
            type="submit"
            class="w-full rounded-lg bg-indigo-700 px-6 py-3 text-center font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Cambiar contraseña
          </button>
        </div>
      </CardContainer>
    </template>

    <!-- Formulario de datos personales -->
    <template v-else-if="formType == 'personal'">
      <FormComponent submit-text="Editar Usuario" @form-submit="submitData" :is-loading="isLoading">
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
            <template #InputField
              ><InputComponent name="email" v-model="formData.email"
            /></template>
            <template #InputError
              ><InputError v-if="v$.email.$error" :message="v$.email.$errors[0]?.$message"
            /></template>
          </InputField>
        </template>
      </FormComponent>
    </template>
    <!-- Formulario para cambiar contraseña -->
    <template v-else-if="formType == 'password'">
      <FormComponent
        submit-text="Editar Contraseña"
        @form-submit="submitData"
        :is-loading="isLoading"
      >
        <template #inputs>
          <!-- Contraseña -->
          <InputField type="password" label="Contraseña" name="password">
            <template #InputField
              ><InputComponent name="password" v-model="formData.password"
            /></template>
            <template #InputError
              ><InputError v-if="v$.password.$error" :message="v$.password.$errors[0]?.$message"
            /></template>
          </InputField>

          <!-- Confirmar Contraseña -->
          <InputField type="password" label="Confirmar Contraseña" name="passwordConfirm">
            <template #InputField
              ><InputComponent name="passwordConfirm" v-model="formData.passwordConfirm"
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
  </AuthLayout>
</template>
