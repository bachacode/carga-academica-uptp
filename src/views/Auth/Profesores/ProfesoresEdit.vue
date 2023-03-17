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
import { storeToRefs } from 'pinia'
const saberes = useSaberStore()
const { update, fetchEdit } = saberes
const { editData } = storeToRefs(saberes)
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
    },
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
      const { codigo, materia, trayecto, periodos, creditos }: saberType = editData.value
      formData.codigo = codigo
      formData.materia = materia
      formData.trayecto = trayecto
      formData.periodos = periodos
      formData.creditos = creditos
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
            <InputField placeholder="Materia" name="Materia" v-model="formData.materia"></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.materia.$error"
              :message="v$.materia.$errors[0].$message"
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
              name="Periodos"
              v-model="formData.periodos"
            ></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.periodos.$error"
              :message="v$.periodos.$errors[0].$message"
            ></InputError>
            <InputField
              type="number"
              placeholder="17"
              name="Creditos"
              v-model="formData.creditos"
            ></InputField>
            <InputError
              class="pl-1 pt-1"
              v-if="v$.creditos.$error"
              :message="v$.creditos.$errors[0].$message"
            ></InputError>
            <button type="submit" class="btn mt-3 bg-blue-700 text-white hover:bg-blue-900">
              Crear Saber
            </button>
          </form>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>