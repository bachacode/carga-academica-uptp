<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { reactive, computed } from 'vue'
import { useSaberStore } from '@/stores/saberes'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import {
  requiredValidation,
  numericValidation,
  minValueValidation,
  maxValueValidation,
  minLengthValidation,
  maxLengthValidation,
} from '@/helpers/validationHelpers'
import type { saberType } from '@/stores/saberes'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import { helpers } from '@vuelidate/validators'
const store = useSaberStore()
const { save } = store
const formData = reactive<saberType>({
  codigo: '',
  materia: '',
  trayecto: null,
  periodos: null,
  creditos: null
})
const isTaken = (value: never) => !store.uniqueKeysList.includes(value)
const isUnique = helpers.withAsync(isTaken, () => formData.codigo)
const rules = computed(() => {
  return {
    codigo: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(40),
      unique: helpers.withMessage('Ya existe un saber con ese codigo', isUnique)
    },
    materia: {
      required: requiredValidation(),
      minLength: minLengthValidation(),
      maxLength: maxLengthValidation(80)
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

const submitData = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    save(formData)
  }
}
</script>

<template>
  <AuthLayout>
    <FormComponent submit-text="Crear Saber" @form-submit="submitData">
          <template #inputs>
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
                ><InputComponent name="materia" v-model="formData.materia"
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
          </template>
    </FormComponent>
  </AuthLayout>
</template>
