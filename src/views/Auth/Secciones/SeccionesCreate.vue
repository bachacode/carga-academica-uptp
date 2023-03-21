<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { reactive, computed } from 'vue'
import { useSeccionStore } from '@/stores/secciones'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import {
  requiredValidation,
  numericValidation,
  minValueValidation,
  maxValueValidation,
  minLengthValidation,
  maxLengthValidation
} from '@/helpers/validationHelpers'
import type { seccionType } from '@/stores/secciones'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import { helpers } from '@vuelidate/validators'
const store = useSeccionStore()
const { save } = store
const formData = reactive<seccionType>({
  codigo: '',
  trayecto: '',
  estudiantes: ''
})
const isSeccionTaken = (value: any) => !store.uniqueKeysList.includes(value)
const isUnique = helpers.withAsync(isSeccionTaken, () => formData.codigo)
const rules = computed(() => {
  return {
    codigo: {
      lazy: true,
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(4),
      unique: helpers.withMessage('Ya existe una sección con ese codigo', isUnique)
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
            <InputField label="Codigo" name="codigo">
              <template #InputField
                ><InputComponent v-maska data-maska="i##" name="codigo" v-model="formData.codigo"
              /></template>
              <template #InputError
                ><InputError v-if="v$.codigo.$error" :message="v$.codigo.$errors[0]?.$message"
              /></template>
            </InputField>
            <InputField type="number" label="Trayecto" name="trayecto">
              <template #InputField
                ><InputComponent name="trayecto" v-model.number="formData.trayecto"
              /></template>
              <template #InputError
                ><InputError v-if="v$.trayecto.$error" :message="v$.trayecto.$errors[0]?.$message"
              /></template>
            </InputField>
            <InputField type="number" label="Estudiantes" name="estudiantes">
              <template #InputField
                ><InputComponent name="estudiantes" v-model.number="formData.estudiantes"
              /></template>
              <template #InputError
                ><InputError
                  v-if="v$.estudiantes.$error"
                  :message="v$.estudiantes.$errors[0]?.$message"
              /></template>
            </InputField>
            <button type="submit" class="btn mt-3 bg-blue-700 text-white hover:bg-blue-900">
              Crear Sección
            </button>
          </form>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>
