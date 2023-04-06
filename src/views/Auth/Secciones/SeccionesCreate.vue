<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { reactive } from 'vue'
import { useSeccionStore } from '@/stores/secciones'
import { useVuelidate } from '@vuelidate/core'

import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import InputSelect from '@/components/InputSelect.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { data } from './SeccionesData'
const store = useSeccionStore()
const { save } = store
const { formData, formRules } = data
const trayectoOptions = reactive([
  { value: 1, name: 'Trayecto 1' },
  { value: 2, name: 'Trayecto 2' },
  { value: 3, name: 'Trayecto 3' },
  { value: 4, name: 'Trayecto 4' }
])
const v$ = useVuelidate(formRules, formData)
data.store = store

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
            ><InputComponent
              v-maska
              data-maska="i##"
              name="codigo"
              v-model="formData.codigo"
              placeholder="i11"
          /></template>
          <template #InputError
            ><InputError v-if="v$.codigo.$error" :message="v$.codigo.$errors[0]?.$message"
          /></template>
        </InputField>
        <InputField type="number" label="Trayecto" name="trayecto">
          <template #InputField
            ><InputSelect
              :options="trayectoOptions"
              placeholder="Seleccione un trayecto"
              name="trayecto"
              v-model="formData.trayecto"
          /></template>
          <template #InputError
            ><InputError v-if="v$.trayecto.$error" :message="v$.trayecto.$errors[0]?.$message"
          /></template>
        </InputField>
        <InputField type="number" label="Estudiantes" name="estudiantes">
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="###"
              name="estudiantes"
              v-model.number="formData.estudiantes"
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
