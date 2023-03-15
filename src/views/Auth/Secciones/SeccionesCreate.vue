<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed } from 'vue'
import { useSeccionStore } from '@/stores/secciones'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, maxValue, numeric, helpers } from '@vuelidate/validators'
import type { seccionType } from '@/stores/secciones'
import InputError from '@/components/InputError.vue'
import { onMounted } from 'vue'
const { store } = useSeccionStore()
const formData = ref<seccionType>({
  codigo: '',
  trayecto: '',
  estudiantes: 0
})

const errorMessages = ref({
  required: 'Este campo es obligatorio',
  numeric: 'El valor de este campo tiene que ser numerico',
  minValue: (min: number) => `El valor de este campo es de minimo ` + min,
  maxValue: (max: number) => `El valor de este campo es de maximo ` + max,
  codigo: 'El codigo que ha introducido es invalido',
  trayecto: 'El trayecto que ha introducido es invalido',
  estudiantes: 'El numero de estudiantes que ha introducido es invalido'
})

const rules = computed(() => {
  return {
    codigo: {
      required: helpers.withMessage(errorMessages.value.required, required)
    },
    trayecto: {
      required: helpers.withMessage(errorMessages.value.required, required),
      numeric: helpers.withMessage(errorMessages.value.numeric, numeric),
      minValue: helpers.withMessage(errorMessages.value.minValue(1), minValue(1)),
      maxValue: helpers.withMessage(errorMessages.value.maxValue(4), maxValue(4))
    },
    estudiantes: {
      required: helpers.withMessage(errorMessages.value.required, required),
      numeric: helpers.withMessage(errorMessages.value.numeric, numeric),
      minValue: helpers.withMessage(errorMessages.value.minValue(1), minValue(1)),
      maxValue: helpers.withMessage(errorMessages.value.maxValue(99), maxValue(99))
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

function volver() {
  router.back()
}
</script>

<template>
  <AuthLayout>
    <div class="flex items-center justify-center">
      <div class="w-2/4 px-16 pb-8">
        <div class="rounded border bg-white shadow">
          <button class="btn-ghost px-2 pt-2 hover:bg-white hover:text-blue-700" @click="volver()">
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
