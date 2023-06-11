<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import InputSelect from '@/components/InputSelect.vue'
import InputError from '@/components/InputError.vue'
import AuthLayout from '../AuthLayout.vue'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { requiredValidation } from '@/helpers/validationHelpers'
import FormComponent from '@/components/Containers/FormComponent.vue'
import useVuelidate from '@vuelidate/core'
import { useAuthStore } from '@/stores/auth'
import type { DatosReportes } from '@/types/DatosReportes'
import { secciones } from './SeccionesReporte'
import { saberes } from './SaberesReporte'
import { titulos } from './TitulosReporte'
import { posgrados } from './PosgradosReporte'
import { profesores } from './ProfesoresReporte'
import { cargas } from './CargasReporte'
import type { Reportes } from '@/types/Reportes'
import { Chart, registerables } from 'chart.js'
import { BarChart } from 'vue-chart-3'
import * as htmlToImage from 'html-to-image'
import type { ChartData, ChartOptions } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables)
// Objeto de pocketbase para hacer las querys
const { pb } = useAuthStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Variables reactivas del formulario
const formData = reactive({
  modulo: '',
  filtro: ''
})

// Data de la grafica
const dataChart = reactive<ChartData | any>({})

// Config de la grafica
const chartOptions: ChartOptions = {
  animation: false,
  responsive: false,
  scales: {
    x: {
      ticks: {
        font: {
          size: 18
        }
      }
    },
    y: {
      ticks: {
        font: {
          size: 18
        }
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        font: {
          size: 18
        },
      }
    },
    datalabels: {
      color: '#312e81',
      font: {
        size: 18
      }
    }
  }
}

// Variable que guarda la lista completa del modulo
const data = reactive<DatosReportes>({
  items: [],
  columns: [],
  pdfName: '',
  filters: [{ value: '', name: 'Seleccione un modulo' }],
  relations: []
})

// Reglas de validación
const formRules = computed(() => {
  return {
    modulo: {
      required: requiredValidation()
    },
    filtro: {
      required: requiredValidation()
    }
  }
})

// Opciones del Select "Modulos"
const moduloOptions = [
  { value: 'secciones', name: 'Secciones' },
  { value: 'saberes', name: 'Saberes' },
  { value: 'titulos', name: 'Titulos' },
  { value: 'posgrados', name: 'Posgrados' },
  { value: 'profesores', name: 'Profesores' },
  { value: 'carga_total', name: 'Cargas' }
]

// Reportes de modulos
const modules: { [key: string]: Reportes } = {
  secciones: secciones,
  saberes: saberes,
  titulos: titulos,
  posgrados: posgrados,
  profesores: profesores,
  carga_total: cargas
}

watch(formData, async () => {
  if (formData.modulo) {
    if (formData.modulo == 'profesores') data.relations = profesores.relations
    const module = formData.modulo
    if (Object.prototype.hasOwnProperty.call(modules, module)) {
      const moduleData = modules[module]
      //@ts-ignore
      data.filters = moduleData.filters
      data.setChart = moduleData.setChart
    }
    if (formData.filtro) {
      isLoading.value = true
      let filtro = ''
      if (formData.filtro.endsWith('@chart')) {
        filtro = formData.filtro.replace('@chart', '')
        await pb
          .collection(formData.modulo)
          .getFullList({
            sort: '-created'
          })
          .then((records) => {
            data.totalItems = records.length
          })
      } else {
        filtro = formData.filtro
      }
      await pb
        .collection(formData.modulo)
        .getFullList({
          sort: '-created',
          expand: data.relations?.toString(),
          $autoCancel: false,
          filter: filtro
        })
        .then((records) => {
          data.items = records
          if (data.setChart && data.totalItems) {
            Object.assign(dataChart, data.setChart(records, data.totalItems))
          }
          isLoading.value = false
        })
        .catch(() => {
          isLoading.value = false
        })
      if (data.items) {
        if (Object.prototype.hasOwnProperty.call(modules, module)) {
          const moduleData = modules[module]
          data.items.map(moduleData.mapData)
          data.columns = moduleData.columns
          data.pdfName = moduleData.pdfName
        }
      }
    }
  }
})

// Validación
const v$ = useVuelidate(formRules, formData)

async function generatePDF() {
  await v$.value.$validate()
  if (v$.value.$error) {
    return
  }
  isLoading.value = true
  let isChart = formData.filtro.endsWith('@chart')
  if (isChart) {
    const canvas = document.getElementById('bar-chart')
    if (!canvas) return
    canvas.style.display = 'block'
    htmlToImage.toPng(canvas).then((dataUrl) => {
      let canvasImage = new Image()
      canvasImage.src = dataUrl
      const doc = new jsPDF('l')
      doc.addImage(canvasImage, 'PNG', 15, 15, 240, 180)
      doc.save(data.pdfName)
      canvas.style.display = 'none'
    })
  } else {
    const doc = new jsPDF('p')
    autoTable(doc, { html: '#my-table' })
    doc.save(data.pdfName)
  }
  isLoading.value = false
}

onMounted(() => {
  // document.body.classList.add('overflow-hidden')
  const canvas = document.getElementById('bar-chart')
  if (canvas) {
    // canvas.style.display = 'none'
  }
})

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden')
})
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

        <InputField label="Filtros del reporte" name="filtro">
          <template #InputField
            ><InputSelect
              :options="data.filters"
              placeholder="Seleccione un filtro"
              name="filtro"
              v-model="formData.filtro"
          /></template>
          <template #InputError
            ><InputError v-if="v$.filtro.$error" :message="v$.filtro.$errors[0]?.$message"
          /></template>
        </InputField>
      </template>
    </FormComponent>
  </AuthLayout>
  <!-- Estadistica -->
  <BarChart class="w-2/4 h-full" :width="900" :height="675" id="my-chart" :plugins="[ChartDataLabels]" :chart-data="dataChart" :options="chartOptions"></BarChart>
  <!-- Tabla del PDF -->
  <table class="hidden" id="my-table">
    <thead>
      <tr>
        <th v-for="column in data.columns" class="text-indigo-900" :key="column.name">
          <span class="hidden">
            {{ column.nameAlias ?? column.name }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="data.items && data.items.length > 0">
        <tr v-for="record in data.items" :key="record.id">
          <template v-for="column in data.columns" :key="column.name">
            <!-- Columnas relaciones uno a uno -->
            <template v-if="column.isSingleRelation">
              <td
                v-if="column.isSingleRelation && column.childName && record.expand[column.name]"
                class="min-w-[140px] max-w-[220px] whitespace-normal break-words"
              >
                {{
                  // @ts-ignore
                  record.expand[column.name][column.childName ?? '']
                }}
              </td>
              <td
                v-else-if="column.isSingleRelation && !record.expand[column.name]"
                class="min-w-[140px] max-w-[220px] whitespace-normal break-words"
              >
                {{ '¡No tiene!' }}
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
      </template>
      <template v-else>
        <tr class="text-center text-gray-600">
          <td :colspan="data.columns.length + 1">¡Esta tabla no tiene elementos registrados!</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
