<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { reactive, computed } from 'vue'
import { useSeccionStore } from '@/stores/secciones'
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
import InputSelect from '@/components/InputSelect.vue'
import { helpers } from '@vuelidate/validators'
import FormComponent from '@/components/Containers/FormComponent.vue'
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

const submitData = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    save(formData)
  }
}
</script>

<template>
  <AuthLayout>
        <FormComponent submit-text="Crear Sección" @form-submit="submitData">
          <template #inputs>
            <InputField label="Codigo" name="codigo">
              <template #InputField
                ><InputComponent v-maska data-maska="i##" name="codigo" v-model="formData.codigo" placeholder="i11"
              /></template>
              <template #InputError
                ><InputError v-if="v$.codigo.$error" :message="v$.codigo.$errors[0]?.$message"
              /></template>
            </InputField>
            <InputField type="number" label="Trayecto" name="trayecto">
              <template #InputField
                ><InputSelect name="trayecto" v-model="formData.trayecto"
              /></template>
              <template #InputError
                ><InputError v-if="v$.trayecto.$error" :message="v$.trayecto.$errors[0]?.$message"
              /></template>
            </InputField>
            <InputField type="number" label="Estudiantes" name="estudiantes">
              <template #InputField
                ><InputComponent v-maska data-maska="###" name="estudiantes" v-model.number="formData.estudiantes"
              /></template>
              <template #InputError
                ><InputError
                  v-if="v$.estudiantes.$error"
                  :message="v$.estudiantes.$errors[0]?.$message"
              /></template>
            </InputField>
          </template>
        </FormComponent>
  </AuthLayout>
</template>
