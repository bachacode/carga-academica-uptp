<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, onMounted, reactive, onUnmounted } from 'vue'
import { useUsuarioStore } from '@/stores/usuarios'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'

import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'

import FormComponent from '@/components/Containers/FormComponent.vue'
import InputSelect from '@/components/InputSelect.vue'
import { data } from './UsuariosData'
import CardContainer from '@/components/Containers/CardContainer.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
const store = useUsuarioStore()
const { update, fetchOne } = store
const id = ref<string>('')
const { formData, formRules } = data
const v$ = useVuelidate(formRules, formData)
const formType = ref('')

const cargoOptions = reactive([
  { value: 'Profesor', name: 'Profesor' },
  { value: 'Administracion', name: 'Administracion' }
])
const isLoading = ref(false)

async function submitData() {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    await update(id.value, formData)
  }
}

const changePassword = () => {
  formType.value = 'password'
}

const changePersonal = () => {
  formType.value = 'personal'
}

onMounted(async () => {
  if (!(router.currentRoute.value.params.id instanceof Array)) {
    id.value = router.currentRoute.value.params.id
    await fetchOne(router.currentRoute.value.params.id)
    if (store.singleData) {
      Object.assign(formData, store.singleData)
    }
  }
})
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
  store.singleData = undefined
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
            class="mx-6 mb-3 rounded-lg border border-blue-700 bg-blue-200 py-3 text-center font-bold text-slate-800 md:text-xl"
          >
            {{ `${formData.username}` }}
          </h1>
          <button
            @click="changePersonal"
            type="submit"
            class="w-full rounded-lg bg-blue-700 px-6 py-3 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Editar datos personales
          </button>
          <button
            @click="changePassword"
            type="submit"
            class="w-full rounded-lg bg-blue-700 px-6 py-3 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Cambiar contraseña
          </button>
        </div>
      </CardContainer>
    </template>

    <!-- Formulario de datos personales -->
    <template v-if="formType == 'personal'">
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
            <template #InputField
              ><InputComponent name="email" v-model="formData.email"
            /></template>
            <template #InputError
              ><InputError v-if="v$.email.$error" :message="v$.email.$errors[0]?.$message"
            /></template>
          </InputField>
        </template>
      </FormComponent>

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
    <template v-if="formType == 'password'">
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
