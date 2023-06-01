<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import InputSelect from '@/components/InputSelect.vue'
import InputError from '@/components/InputError.vue'
import AuthLayout from '../AuthLayout.vue'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { computed, reactive, ref, watch } from 'vue'
import { requiredValidation } from '@/helpers/validationHelpers'
import FormComponent from '@/components/Containers/FormComponent.vue'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '@/stores/auth'
import type { Record } from 'pocketbase'
import type { columnType } from '@/types/columnType'

// Objeto de pocketbase para hacer las querys
const { pb } = useAuthStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Variables reactivas del formulario
const formData = reactive({
  modulo: ''
})

// Variable que guarda la lista completa del modulo
const data = reactive<{ items: Record[]; columns: columnType[] | []; pdfName: string }>({
  items: [],
  columns: [],
  pdfName: ''
})

// Reglas de validación
const formRules = computed(() => {
  return {
    modulo: {
      required: requiredValidation()
    }
  }
})

// Opciones del Select "Modulos"
const moduloOptions = [
  { value: 'secciones', name: 'Secciones' },
  { value: 2, name: 'Trayecto 2' },
  { value: 3, name: 'Trayecto 3' },
  { value: 4, name: 'Trayecto 4' }
]

watch(formData, async () => {
  await pb
    .collection(formData.modulo)
    .getFullList({
      sort: '-created'
    })
    .then((records) => {
      data.items = records
    })
  if (formData.modulo == 'secciones') {
    data.columns = [
      {
        name: 'Codigo',
        isAsc: false
      },
      {
        name: 'Trayecto',
        isAsc: false
      },
      {
        name: 'Estudiantes',
        isAsc: false
      }
    ]
    data.pdfName = 'secciones.pdf'
  }
})

// Validación
const v$ = useVuelidate(formRules, formData)

async function generatePDF() {
  const doc = new jsPDF()
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    autoTable(doc, { html: '#my-table' })
    doc.save(data.pdfName)
    isLoading.value = false
  }
}
</script>

<template>
  <AuthLayout>
    <FormComponent submit-text="Generar Reporte" @form-submit="generatePDF" :is-loading="isLoading">
      <template #inputs>
        <!-- Modulo -->
        <InputField label="Modulo a imprimir" name="modulo">
          <template #InputField
            ><InputSelect
              :options="moduloOptions"
              placeholder="Seleccione un modulo"
              name="modulo"
              v-model="formData.modulo"
          /></template>
          <template #InputError
            ><InputError v-if="v$.modulo.$error" :message="v$.modulo.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Tipo (para despues) -->

        <!-- <InputField label="Tipo de reporte" name="tipo">
        <template #InputField
        ><InputSelect
        :options="tipoOptions"
        placeholder="Seleccione un tipo"
        name="tipo"
        v-model="formData.tipo"
        /></template>
        <template #InputError
        ><InputError v-if="v$.tipo.$error" :message="v$.tipo.$errors[0]?.$message"
        /></template>
      </InputField> -->
      </template>
    </FormComponent>
  </AuthLayout>

  <table class="hidden" id="my-table">
    <thead>
      <tr>
        <th v-for="column in data.columns" class="text-indigo-900" :key="column.name">
          <span>
            {{ column.nameAlias ?? column.name }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="record in data.items" :key="record.id">
        <template v-for="column in data.columns" :key="column.name">
          <!-- Columnas relaciones uno a uno -->
          <template v-if="column.isSingleRelation">
            <td class="min-w-[140px] max-w-[220px] whitespace-normal break-words">
              {{
                // @ts-ignore
                record.expand[column.name][column.childName ?? '']
              }}
            </td>
          </template>

          <!-- Columnas Normales -->
          <template v-else-if="record[column.name.toLowerCase()]">
            <td class="min-w-[140px] max-w-[220px] whitespace-normal break-words">
              {{ record[column.name.toLowerCase()] }}
            </td>
          </template>

          <template v-else>
            <td class="min-w-[140px] max-w-[220px] whitespace-normal break-words">
              No se encontró
            </td>
          </template>
        </template>
      </tr>
    </tbody>
  </table>
</template>
