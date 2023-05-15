<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import { useProfesorStore, type profesorType } from '@/stores/profesores'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'

import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import MultiSelect, { type relationsType } from '@/components/MultiSelect.vue'
import type { optionType } from '@/components/MultiSelect.vue'
import { useSaberStore } from '@/stores/saberes'
import { useContratoStore } from '@/stores/contratos'
import InputSelect from '@/components/InputSelect.vue'
import { useTituloStore } from '@/stores/titulos'
import {
  emailValidation,
  maxLengthValidation,
  minLengthValidation,
  requiredValidation
} from '@/helpers/validationHelpers'
// Store del módulo
const store = useProfesorStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Id del item a editar
const id = ref()

// Store de saberes
const saberes = useSaberStore()

// Store de contratos
const contratos = useContratoStore()

// Store de titulos
const titulos = useTituloStore()

// Variable reactiva con las relaciones a remover del item
const relations = reactive<relationsType>({
  table: 'saberes',
  stored: [],
  removed: []
})

// Variables reactivas del formulario
const formData = reactive<profesorType>({
  nombre: '',
  apellido: '',
  cedula: '',
  titulo_id: '',
  saberes: [],
  id_contrato: '',
  telefono: '',
  correo: ''
})

// Reglas de la validación
const formRules = computed(() => {
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
    titulo_id: {
      required: requiredValidation(),
      minLength: minLengthValidation()
    },
    saberes: {},
    id_contrato: {
      required: requiredValidation()
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

// Función para deseleccionar opciones del multiSelect
const removeTag = (tag: optionType) => {
  tag.isActive = false
}

// Valor computado de las opciones del multiselect
const tags = computed<optionType[] | undefined>(() => {
  return saberes.filteredData?.map((record: any) => {
    {
      return {
        name: record.nombre + ' - ' + record.trayecto,
        value: record.id,
        isActive: formData.saberes.includes(record.id) ? true : false
      }
    }
  })
})

// Valor computado de contratos del select
const contratosOptions = computed(() => {
  return contratos.filteredData?.map((record: any) => {
    return {
      value: record.id,
      name: `${record.tipo} - ${record.horas_maximas} horas`
    }
  })
})

// Valor computado de titulos del select
const titulosOptions = computed(() => {
  return titulos.filteredData?.map((record: any) => {
    return {
      value: record.id,
      name: `${record.nombre}`
    }
  })
})

// Objeto de validaciáon
const v$ = useVuelidate(formRules, formData)

// Función para enviar el formulario
const submitData = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    await store.deSync(id.value, relations)
    await store.update(id.value, formData)
    isLoading.value = false
  }
}

// Al inicializar el componente, asigna el id de la ruta a una variable reactiva de vue
onMounted(async () => {
  if (!(router.currentRoute.value.params.id instanceof Array)) {
    id.value = router.currentRoute.value.params.id
    await store.fetchOne(router.currentRoute.value.params.id)
    if (store.singleData) {
      Object.assign(formData, store.singleData)
      formData.saberes?.forEach((saber) => {
        relations.stored.push(saber)
      })
    }
  }
})
</script>

<template>
  <AuthLayout>
    <FormComponent submit-text="Editar Profesor" @form-submit="submitData" :is-loading="isLoading">
      <template #inputs>
        <!-- Nombre + Apellido -->
        <div class="flex w-full space-x-2">
          <!-- Nombre -->
          <InputField label="Nombre" name="nombre">
            <template #InputField
              ><InputComponent name="nombre" v-model.trim="formData.nombre"
            /></template>
            <template #InputError
              ><InputError v-if="v$.nombre.$error" :message="v$.nombre.$errors[0]?.$message"
            /></template>
          </InputField>

          <!-- Apellido -->
          <InputField label="Apellido" name="apellido">
            <template #InputField
              ><InputComponent name="apellido" v-model="formData.apellido"
            /></template>
            <template #InputError
              ><InputError v-if="v$.apellido.$error" :message="v$.apellido.$errors[0]?.$message"
            /></template>
          </InputField>
        </div>

        <!-- Cedula -->
        <InputField label="Cedula" name="cedula" helper-text="Este campo solo acepta numeros">
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="########"
              data-maska-tokens="'0':/[0-9]/:M"
              name="cedula"
              v-model="formData.cedula"
          /></template>
          <template #InputError
            ><InputError v-if="v$.cedula.$error" :message="v$.cedula.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Titulo -->
        <InputField label="Titulo" name="titulo">
          <template #InputField>
            <InputSelect
              :options="titulosOptions ?? [{ value: '', name: 'No se han encontrado titulos' }]"
              placeholder="Seleccione un titulo"
              name="titulos"
              v-model="formData.titulo_id"
          /></template>
          <template #InputError
            ><InputError v-if="v$.titulo_id.$error" :message="v$.titulo_id.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Saberes -->
        <InputField label="Saberes" name="saberes">
          <template #InputField
            ><MultiSelect
              @remove-tag="removeTag"
              :tags="tags"
              name="saberes"
              :selected-options="formData.saberes"
              :model-relations="relations"
          /></template>
          <template #InputError
            ><InputError v-if="v$.saberes.$error" :message="v$.saberes.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Tipo de contrato -->
        <InputField label="Tipo de contrato" name="contrato">
          <template #InputField>
            <InputSelect
              :options="contratosOptions ?? [{ value: '', name: 'No se han encontrado contratos' }]"
              placeholder="Seleccione un contrato"
              name="contratos"
              v-model="formData.id_contrato"
          /></template>
          <template #InputError
            ><InputError
              v-if="v$.id_contrato.$error"
              :message="v$.id_contrato.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Telefono -->
        <InputField label="Telefono" name="telefono" helper-text="Este campo solo acepta numeros">
          <template #InputField
            ><InputComponent
              v-maska
              data-maska="###########"
              name="telefono"
              v-model="formData.telefono"
          /></template>
          <template #InputError
            ><InputError v-if="v$.telefono.$error" :message="v$.telefono.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Correo -->
        <InputField label="Correo" name="correo">
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
