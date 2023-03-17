<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed } from 'vue'
import { useProfesorStore } from '@/stores/profesores'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import {
  requiredValidation,
  emailValidation,
  minLengthValidation,
  maxLengthValidation
} from '@/helpers/validationHelpers'
import type { profesorType } from '@/stores/profesores'
import InputError from '@/components/InputError.vue'

const profesores = useProfesorStore()
const { store } = profesores
const formData = ref<profesorType>({
  nombre: '',
  apellido: '',
  cedula: '',
  titulo: '',
  telefono: '',
  correo: ''
})

const rules = computed(() => {
  return {
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
      maxLength: maxLengthValidation(40)
    },
    titulo: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40)
    },
    telefono: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40)
    },
    correo: {
      required: requiredValidation(),
      email: emailValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40)
    },
  }
})

const v$ = useVuelidate(rules, formData.value)

async function submitData() {
  await v$.value.$validate()
  if (!v$.value.$error) {
    store(formData.value)
  }
}
</script>

<template>
  <AuthLayout>
    <div class="flex items-center justify-center">
      <div class="w-2/4 px-16 pb-8">
        <div class="rounded border bg-white shadow">
          <button
            class="btn-ghost px-2 pt-2 hover:bg-white hover:text-blue-700"
            @click="router.back()"
          >
            <i class="fas fa-arrow-left pr-1"></i>Volver
          </button>
          <form class="px-6 pb-6" @submit.prevent="submitData()" ref="formSeccion">
            <InputField placeholder="Nombre" name="Nombre" v-model="formData.nombre"></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.nombre.$error"
              :message="v$.nombre.$errors[0].$message"
            ></InputError>
            <InputField placeholder="apellido" name="Apellido" v-model="formData.apellido"></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.apellido.$error"
              :message="v$.apellido.$errors[0].$message"
            ></InputError>
            <InputField
              placeholder="V-11.111.111"
              name="cedula"
              v-model="formData.cedula"
            ></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.cedula.$error"
              :message="v$.cedula.$errors[0].$message"
            ></InputError>
            <InputField
              placeholder="Ingeniero en Sistemas"
              name="Titulo"
              v-model="formData.titulo"
            ></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.titulo.$error"
              :message="v$.titulo.$errors[0].$message"
            ></InputError>
            <InputField
              placeholder="0424-1234567"
              name="Telefono"
              v-model="formData.telefono"
            ></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.telefono.$error"
              :message="v$.telefono.$errors[0].$message"
            ></InputError>
            <InputField
              type="email"
              placeholder="nombre@Correo.com"
              name="Correo"
              v-model="formData.correo"
            ></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.correo.$error"
              :message="v$.correo.$errors[0].$message"
            ></InputError>
            <button type="submit" class="btn mt-3 bg-blue-700 text-white hover:bg-blue-900">
              Registrar Profesor
            </button>
          </form>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>
