<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { reactive, computed } from 'vue'
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
const store = useProfesorStore()
const { save } = store
const formData = reactive<profesorType>({
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
    }
  }
})

const v$ = useVuelidate(rules, formData)

async function submitData() {
  await v$.value.$validate()
  if (!v$.value.$error) {
    save(formData)
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
          <form class="px-6 pb-6" @submit.prevent="submitData()">
            <InputField label="Nombre" placeholder="" name="nombre" v-model="formData.nombre">
              <InputError v-if="v$.nombre.$error" :message="v$.nombre.$errors[0].$message" />
            </InputField>
            <InputField label="Apellido" placeholder="" name="apellido" v-model="formData.apellido">
              <InputError v-if="v$.apellido.$error" :message="v$.apellido.$errors[0].$message" />
            </InputField>
            <InputField
              label="Cedula"
              placeholder="V-11.111.111"
              name="cedula"
              v-model="formData.cedula"
            >
              <InputError v-if="v$.cedula.$error" :message="v$.cedula.$errors[0].$message" />
            </InputField>
            <InputField
              label="Titulo"
              placeholder="Ingeniero en Sistemas"
              name="titulo"
              v-model="formData.titulo"
            >
              <InputError v-if="v$.titulo.$error" :message="v$.titulo.$errors[0].$message" />
            </InputField>
            <InputField
              label="Telefono"
              placeholder="0424-9585136"
              name="telefono"
              v-model="formData.telefono"
            >
              <InputError v-if="v$.telefono.$error" :message="v$.telefono.$errors[0].$message" />
            </InputField>
            <InputField
              type="email"
              label="Correo"
              placeholder="nombre@ejemplo.com"
              name="correo"
              v-model="formData.correo"
            >
              <InputError v-if="v$.correo.$error" :message="v$.correo.$errors[0].$message" />
            </InputField>
            <button type="submit" class="btn mt-3 bg-blue-700 text-white hover:bg-blue-900">
              Registrar Profesor
            </button>
          </form>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>
