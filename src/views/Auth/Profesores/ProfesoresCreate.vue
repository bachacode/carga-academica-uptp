<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useProfesorStore, type profesorType } from '@/stores/profesores'
import { useSaberStore } from '@/stores/saberes'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import MultiSelect from '@/components/MultiSelect.vue'
import type { optionType } from '@/components/MultiSelect.vue'
import InputSelect from '@/components/InputSelect.vue'
import { useTituloStore } from '@/stores/titulos'
import { useContratoStore } from '@/stores/contratos'
import {
  emailValidation,
  isUnique,
  maxLengthValidation,
  minLengthValidation,
  requiredValidation,
  uniqueValidation
} from '@/helpers/validationHelpers'
import { usePosgradoStore } from '@/stores/posgrados'
// Store del módulo
const store = useProfesorStore()

// Store de contratos
const contratos = useContratoStore()

// Store de saberes
const saberes = useSaberStore()

// Store de titulos
const titulos = useTituloStore()

// Store de posgrados
const posgrados = usePosgradoStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Variables reactivas del formulario
const formData = reactive<profesorType>({
  nombre: '',
  apellido: '',
  cedula: '',
  titulo_id: '',
  posgrado_id: '',
  saberes: [],
  contrato_id: '',
  telefono: '',
  correo: ''
})

// Validación Unica
const isCedulaTaken = isUnique(store, 'cedula')

// Validación Unica
const isCorreoTaken = isUnique(store, 'correo')

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
      maxLength: maxLengthValidation(40),
      unique: uniqueValidation('cedula', 'profesores', isCedulaTaken, formData.cedula)
    },
    titulo_id: {
      required: requiredValidation(),
      minLength: minLengthValidation()
    },
    posgrado_id: {},
    saberes: {},
    contrato_id: {
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
      maxLength: maxLengthValidation(40),
      unique: uniqueValidation('correo', 'profesores', isCorreoTaken, formData.correo)
    }
  }
})

// Función para deseleccionar opciones del multiSelect
const removeTag = (tag: optionType) => {
  tag.isActive = false
}

// Valor computado de las opciones del multiselect
const tags = computed<optionType[] | undefined>(() => {
  return saberes.fullData?.map((record: any) => {
    {
      return {
        name: `${record.nombre} - trayecto ${record.trayecto}`,
        value: record.id,
        isActive: formData.saberes.includes(record.id) ? true : false
      }
    }
  })
})

// Valor computado de contratos del select
const contratosOptions = computed(() => {
  return contratos.data?.items.map((contrato) => {
    return {
      value: contrato.id,
      name: `${contrato.nombre} - ${contrato.horas} horas`
    }
  })
})

// Valor computado de titulos del select
const titulosOptions = computed(() => {
  return titulos.filteredData?.map((record) => {
    return {
      value: record.id,
      name: `${record.grado} en ${record.nombre}`
    }
  })
})

// Valor computado de posgrados del select
const posgradosOptions = computed(() => {
  return posgrados.filteredData?.map((record) => {
    return {
      value: record.id,
      name: `${record.grado} en ${record.nombre}`
    }
  })
})

// Objeto de validaciáon
const v$ = useVuelidate(formRules, formData)

// Función para enviar el formulario
const submitData = async () => {
  await v$.value.$validate()
  console.log(v$.value.cedula)
  if (!v$.value.$error) {
    isLoading.value = true
    await store.save(formData)
    isLoading.value = false
  }
}

onMounted(async () => {
  await saberes.fetchFullList()
})
</script>

<template>
  <AuthLayout>
    <FormComponent submit-text="Agregar Profesor" @form-submit="submitData" :is-loading="isLoading">
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
              name="titulo"
              v-model="formData.titulo_id"
          /></template>
          <template #InputError
            ><InputError v-if="v$.titulo_id.$error" :message="v$.titulo_id.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Posgrado -->
        <InputField label="Posgrado" name="posgrado" helper-text="Este campo es opcional">
          <template #InputField>
            <InputSelect
              :options="posgradosOptions ?? [{ value: '', name: 'No se han encontrado posgrados' }]"
              placeholder="No tiene posgrado"
              name="posgrado"
              :disable-placeholder="false"
              v-model="formData.posgrado_id"
          /></template>
          <template #InputError
            ><InputError
              v-if="v$.posgrado_id.$error"
              :message="v$.posgrado_id.$errors[0]?.$message"
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
          /></template>
          <template #InputError
            ><InputError v-if="v$.saberes.$error" :message="v$.saberes.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Tipo de Contrato -->
        <InputField label="Tipo de contrato" name="contrato">
          <template #InputField>
            <InputSelect
              :options="contratosOptions ?? [{ value: '', name: 'No se han encontrado contratos' }]"
              placeholder="Seleccione un contrato"
              name="contrato"
              v-model="formData.contrato_id"
          /></template>
          <template #InputError
            ><InputError
              v-if="v$.contrato_id.$error"
              :message="v$.contrato_id.$errors[0]?.$message"
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
