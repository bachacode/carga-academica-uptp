<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import { useSaberStore } from '@/stores/saberes'
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
import type { saberType } from '@/stores/saberes'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
const store = useSaberStore()
const { update, fetchOne } = store
const id = ref<string>('')
const formData = reactive<saberType>({
  codigo: '',
  materia: '',
  trayecto: null,
  periodos: null,
  creditos: null
})
const rules = computed(() => {
  return {
    codigo: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40)
    },
    materia: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40)
    },
    trayecto: {
      required: requiredValidation(),
      numeric: numericValidation(),
      minValue: minValueValidation(),
      maxValue: maxValueValidation(4)
    },
    periodos: {
      required: requiredValidation(),
      numeric: numericValidation(),
      minValue: minValueValidation(),
      maxValue: maxValueValidation(3)
    },
    creditos: {
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
    await update(id.value, formData)
  }
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
                ><InputComponent name="codigo" v-model.trim="formData.codigo"
              /></template>
              <template #InputError
                ><InputError v-if="v$.codigo.$error" :message="v$.codigo.$errors[0]?.$message"
              /></template>
            </InputField>
            <InputField label="Materia" name="materia">
              <template #InputField
                ><InputComponent name="materia" v-model.trim="formData.materia"
              /></template>
              <template #InputError
                ><InputError v-if="v$.materia.$error" :message="v$.materia.$errors[0]?.$message"
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
            <InputField type="number" label="Periodos" name="periodos">
              <template #InputField
                ><InputComponent name="periodos" v-model.number="formData.periodos"
              /></template>
              <template #InputError
                ><InputError v-if="v$.periodos.$error" :message="v$.periodos.$errors[0]?.$message"
              /></template>
            </InputField>
            <InputField type="number" label="Creditos" name="creditos">
              <template #InputField
                ><InputComponent name="creditos" v-model.number="formData.creditos"
              /></template>
              <template #InputError
                ><InputError v-if="v$.creditos.$error" :message="v$.creditos.$errors[0]?.$message"
              /></template>
            </InputField>
            <button type="submit" class="btn mt-3 bg-blue-700 text-white hover:bg-blue-900">
              Editar Saber
            </button>
          </form>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>
