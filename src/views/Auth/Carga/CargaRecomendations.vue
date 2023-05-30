<script setup lang="ts">
import CardContainer from '@/components/Containers/CardContainer.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import { useSaberStore } from '@/stores/saberes'
import InputSelect from '@/components/InputSelect.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed, onMounted } from 'vue'
import AuthLayout from '../AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import { useProfesoresRecomendadosStore } from '@/stores/profesoresRecomendados'
import type { columnType } from '@/types/columnType'
const saberes = useSaberStore()
const selectedSaber = ref()
const selectedDia = ref()
const profesoresRecomendados = useProfesoresRecomendadosStore()
// Opciones del Select "Saberes"
const saberesOptions = computed(() => {
  return saberes.fullData?.map((record) => {
    return {
      value: record.id,
      name: `${record.nombre} - Trayecto ${record.trayecto} - ${record.horas} horas maximas`,
      trayecto: record.trayecto
    }
  })
})
// Asignacion de puntos por titulo adecuado
let trayectoSaber = computed(() => {
  return saberesOptions.value?.find((saber) => {
    return saber.value == selectedSaber.value
  })
})
const filteredData = computed(() => {
  return profesoresRecomendados.fullData
    ?.map((record) => {
      // Puntos Iniciales
      record.puntos = 100

      // Asignacion de puntos por dia libre
      if (record.dia != selectedDia.value || record.dia == null) {
        record.dia = '¡Si!'
        record.puntos += 20
      } else if (record.dia == selectedDia.value) {
        record.dia = '¡No!'
        let puntosPorHora = record.horas * 2
        record.puntos -= puntosPorHora
      }

      // Asignacion de puntos por saber dado anteriormente
      let haDadoElSaber = record.saberes.some((saber) => {
        return saber == selectedSaber.value
      })

      if (haDadoElSaber) {
        record.saber = '¡Si!'
        record.puntos += 20
      } else if (!haDadoElSaber) {
        record.saber = '¡No!'
        record.puntos -= 20
      }

      // Asignacion de puntos por titulo adecuado
      if (
        (record.titulo_grado.toLowerCase() == 'técnico' ||
          record.titulo_grado.toLowerCase() == 'licenciado') &&
        (trayectoSaber.value?.trayecto == 1 || trayectoSaber.value?.trayecto == 2)
      ) {
        record.titulo_grado = '¡Si!'
      } else if (
        (record.titulo_grado.toLowerCase() == 'ingeniero' || record.posgrado_grado) &&
        (trayectoSaber.value?.trayecto == 3 || trayectoSaber.value?.trayecto == 4)
      ) {
        record.titulo_grado = '¡Si!'
      } else {
        record.titulo_grado = '¡No!'
      }

      // Retorna el profesor y ordena el arreglo en forma descendente por puntos
      return record
    })
    .sort((a, b) => a.puntos + b.puntos)
})
const diasOptions = [
  { value: 'Lunes', name: 'Lunes' },
  { value: 'Martes', name: 'Martes' },
  { value: 'Miercoles', name: 'Miercoles' },
  { value: 'Jueves', name: 'Jueves' },
  { value: 'Viernes', name: 'Viernes' }
]

const columnsLibres: columnType[] = [
  {
    name: 'Nombre',
    isAsc: false
  },
  {
    name: 'Apellido',
    isAsc: false
  },
  {
    name: 'Cedula',
    isAsc: false
  },
  {
    name: 'Dia',
    nameAlias: '¿Tiene ese dia libre?',
    isAsc: false
  },
  {
    name: 'Saber',
    nameAlias: '¿Ha dado el saber anteriormente?',
    isAsc: false
  },
  {
    name: 'titulo_grado',
    nameAlias: '¿Tiene un titulo adecuado para el saber?',
    isAsc: false
  },
  {
    name: 'Puntos',
    nameAlias: 'Puntaje',
    isAsc: false
  }
]

onMounted(async () => {
  await profesoresRecomendados.fetchFullList()
  await saberes.fetchFullList()
})
</script>

<template>
  <AuthLayout>
    <!-- ALERTA DE DESARROLLO -->
    <div :class="`alert alert-error mb-10 w-full py-4 font-semibold shadow-lg`">
      <div class="flex">
        <font-awesome-icon icon="circle-xmark" class="fa-fw" />
        <span
          >Este módulo todavia esta en desarrollo, algunas cosas pueden no funcionar
          correctamente</span
        >
      </div>
    </div>
    <!-- Botones para elegir formulario -->
    <CardContainer card-width="w-full my-10">
      <LoadingCircle :is-loaded="!saberes.fullData" />
      <div v-if="saberes.fullData" class="flex h-44 flex-col space-y-3 p-6">
        <!-- saber -->
        <InputField label="Elija el saber para el que necesita un profesor" name="saber">
          <template #InputField>
            <InputSelect
              :options="saberesOptions ?? [{ value: '', name: 'No se han encontrado saberes' }]"
              placeholder="Seleccione un saber"
              name="saberes"
              v-model="selectedSaber"
          /></template>
        </InputField>

        <!-- Dia -->
        <template v-if="selectedSaber">
          <InputField label="Seleccione el dia que este profesor dara clases" name="dia">
            <template #InputField>
              <InputSelect
                :options="diasOptions"
                placeholder="Seleccione un día"
                name="dia"
                v-model="selectedDia"
            /></template>
          </InputField>
        </template>
      </div>

      <template v-if="selectedSaber && selectedDia">
        <TableComponent
          class="mt-10"
          title="Mejores Profesores para dar esa materia"
          :columns="columnsLibres"
          :view-only="true"
          :filtered-data="filteredData"
        >
        </TableComponent>

        <!--/table Card-->
      </template>
    </CardContainer>
  </AuthLayout>
</template>
