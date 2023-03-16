<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed, onMounted, reactive } from 'vue'
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
import { storeToRefs } from 'pinia'
const secciones = useSeccionStore()
const { update, fetchEdit } = secciones
const { editData } = storeToRefs(secciones)
const id = ref<string>('')
const formData = reactive<seccionType>({
  codigo: '',
  trayecto: null,
  estudiantes: null
})
const rules = computed(() => {
  return {
    codigo: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(4),
      $autoDirty: true
    },
    trayecto: {
      required: requiredValidation(),
      numeric: numericValidation(),
      minValue: minValueValidation(),
      maxValue: maxValueValidation(4),
      $autoDirty: true
    },
    estudiantes: {
      required: requiredValidation(),
      numeric: numericValidation(),
      minValue: minValueValidation(),
      maxValue: maxValueValidation(99),
      $autoDirty: true
    }
  }
})

const v$ = useVuelidate(rules, formData)

async function submitData() {
  await v$.value.$validate()
  if (!v$.value.$error) {
    await update(id.value, formData)
  }
}

onMounted(async () => {
  if (!(router.currentRoute.value.params.id instanceof Array)) {
    id.value = router.currentRoute.value.params.id
    await fetchEdit(router.currentRoute.value.params.id)
    if (editData.value) {
      const { codigo, trayecto, estudiantes }: seccionType = editData.value
      formData.codigo = codigo
      formData.trayecto = trayecto
      formData.estudiantes = estudiantes
    }
  }
})
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
              Actualizar Sección
            </button>
          </form>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>
