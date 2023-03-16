<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed } from 'vue'
import { useSeccionStore } from '@/stores/secciones'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import { requiredValidation, numericValidation, minValueValidation, maxValueValidation, minLengthValidation, maxLengthValidation } from '@/helpers/validationHelpers';
import type { seccionType } from '@/stores/secciones'
import InputError from '@/components/InputError.vue'

const secciones = useSeccionStore()
const { store } = secciones
const formData = ref<seccionType>({
  codigo: '',
  trayecto: null,
  estudiantes: null
})

const rules = computed(() => {
  return {
    codigo: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(4)
    },
    trayecto: {
      required: requiredValidation(),
      numeric: numericValidation(),
      minValue: minValueValidation(),
      maxValue: maxValueValidation(4)
    },
    estudiantes: {
      required: requiredValidation(),
      numeric: numericValidation(),
      minValue: minValueValidation(),
      maxValue: maxValueValidation(99)
    }
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
          <button class="btn-ghost px-2 pt-2 hover:bg-white hover:text-blue-700" @click="router.back()">
            <i class="fas fa-arrow-left pr-1"></i>Volver
          </button>
          <form class="px-6 pb-6" @submit.prevent="submitData()" ref="formSeccion">
            <InputField placeholder="Codigo" name="Codigo" v-model="formData.codigo"></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.codigo.$error"
              :message="v$.codigo.$errors[0].$message"
            ></InputError>
            <InputField
              type="number"
              placeholder="2"
              name="Trayecto"
              v-model="formData.trayecto"
            ></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.trayecto.$error"
              :message="v$.trayecto.$errors[0].$message"
            ></InputError>
            <InputField
              type="number"
              placeholder="17"
              name="Estudiantes"
              v-model="formData.estudiantes"
            ></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.estudiantes.$error"
              :message="v$.estudiantes.$errors[0].$message"
            ></InputError>
            <button type="submit" class="btn mt-3 bg-blue-700 text-white hover:bg-blue-900">
              Crear Sección
            </button>
          </form>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>
