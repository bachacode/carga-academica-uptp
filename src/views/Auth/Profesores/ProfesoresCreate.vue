<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { reactive, computed } from 'vue'
import { useProfesorStore } from '@/stores/profesores'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import {
  requiredValidation,
  emailValidation,
  minLengthValidation,
  maxLengthValidation
} from '@/helpers/validationHelpers'
import type { profesorType } from '@/stores/profesores'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
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

const submitData = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    save(formData)
  }
}
</script>

<template>
  <AuthLayout>
    <FormComponent submit-text="Agregar Profesor" @form-submit="submitData">
          <template #inputs>
            <div class="flex space-x-2">
              <InputField label="Nombre" name="nombre">
                <template #InputField
                  ><InputComponent name="nombre" v-model.trim="formData.nombre"
                /></template>
                <template #InputError
                  ><InputError v-if="v$.nombre.$error" :message="v$.nombre.$errors[0]?.$message"
                /></template>
              </InputField>
              <InputField label="Apellido" name="apellido">
                <template #InputField
                  ><InputComponent name="apellido" v-model="formData.apellido"
                /></template>
                <template #InputError
                  ><InputError
                    v-if="v$.apellido.$error"
                    :message="v$.apellido.$errors[0]?.$message"
                /></template>
              </InputField>
            </div>
            <InputField label="Cedula" name="cedula">
              <template #InputField
                ><InputComponent
                  v-maska
                  data-maska="V-##.###.###"
                  data-maska-tokens="'0':/[0-9]/:M"
                  name="cedula"
                  v-model="formData.cedula"
              /></template>
              <template #InputError
                ><InputError v-if="v$.cedula.$error" :message="v$.cedula.$errors[0]?.$message"
              /></template>
            </InputField>
            <InputField label="Titulo" name="titulo">
              <template #InputField
                ><InputComponent name="titulo" v-model="formData.titulo"
              /></template>
              <template #InputError
                ><InputError v-if="v$.titulo.$error" :message="v$.titulo.$errors[0]?.$message"
              /></template>
            </InputField>
            <InputField label="Telefono" name="telefono">
              <template #InputField
                ><InputComponent
                  v-maska
                  data-maska="### ###-##-##"
                  name="telefono"
                  v-model="formData.telefono"
              /></template>
              <template #InputError
                ><InputError v-if="v$.telefono.$error" :message="v$.telefono.$errors[0]?.$message"
              /></template>
            </InputField>
            <InputField type="email" label="Correo" name="correo">
              <template #InputField
                ><InputComponent name="correo" v-model="formData.correo"
              /></template>
              <template #InputError
                ><InputError v-if="v$.correo.$error" :message="v$.correo.$errors[0]?.$message"
              /></template>
            </InputField>
          </template>
    </FormComponent>
  </AuthLayout>
</template>
