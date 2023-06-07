<script setup lang="ts">
import CardContainer from '@/components/Containers/CardContainer.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import { useSaberStore } from '@/stores/saberes'
import InputSelect from '@/components/InputSelect.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import AuthLayout from '../AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import { useProfesoresRecomendadosStore } from '@/stores/profesoresRecomendados'
import type { Column } from '@/types/Column'
import { useCargaStore } from '@/stores/carga'
const saberes = useSaberStore()
const selectedSaber = ref()
const selectedDia = ref()
const profesoresRecomendados = useProfesoresRecomendadosStore()
const cargas = useCargaStore()
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
// Datos del trayecto Seleccionado
const trayectoSaber = computed(() => {
  return saberesOptions.value?.find((saber) => {
    return saber.value == selectedSaber.value
  })
})
//
const puntos = reactive({
  iniciales: 100,
  porDiaLibre: 20,
  porSaberDado: 20,
  porTituloCorrecto: 20
})
const filteredData = computed(() => {
  return profesoresRecomendados.fullData
    ?.filter((record) => {
      return record.contrato_horas - record.horas <= 0 || record.horas == null
    })
    .map((record) => {
      if (record.contrato_horas)
        // Puntos Iniciales
        record.puntos = puntos.iniciales

      // Comprueba si el profesor tiene un registro en Carga Académica con el dia seleccionado
      let diaOcupado = cargas.fullData
        ?.filter((profesor) => {
          return record.id == profesor.profesor_id
        })
        .some((profesor) => {
          return profesor.dia == selectedDia.value
        })
      // Asignacion de puntos por dia libre
      if (!diaOcupado) {
        record.dia = '¡Si!'
        record.puntos += puntos.porDiaLibre
      } else {
        record.dia = '¡No!'
        record.puntos -= puntos.porDiaLibre
      }

      // Asignacion de puntos por saber dado anteriormente
      let haDadoElSaber = record.saberes.some((saber) => {
        return saber == selectedSaber.value
      })

      if (haDadoElSaber) {
        record.saber = '¡Si!'
        record.puntos += puntos.porSaberDado
      } else {
        record.saber = '¡No!'
        record.puntos -= puntos.porSaberDado
      }

      // Asignacion de puntos por titulo adecuado
      if (
        (record.titulo_grado.toLowerCase() == 'técnico' ||
          record.titulo_grado.toLowerCase() == 'licenciado') &&
        (trayectoSaber.value?.trayecto == 1 || trayectoSaber.value?.trayecto == 2)
      ) {
        record.titulo_grado = '¡Si!'
        record.puntos += puntos.porTituloCorrecto
      } else if (
        (record.titulo_grado.toLowerCase() == 'ingeniero' || record.posgrado_grado) &&
        (trayectoSaber.value?.trayecto == 3 || trayectoSaber.value?.trayecto == 4)
      ) {
        record.titulo_grado = '¡Si!'
        record.puntos += puntos.porTituloCorrecto
      } else {
        record.titulo_grado = '¡No!'
        record.puntos -= puntos.porTituloCorrecto
      }
      // Retorna el profesor y ordena el arreglo en forma descendente por puntos
      return record
    })
    .sort((a, b) => (a.puntos - b.puntos) * -1)
})
const diasOptions = [
  { value: 'Lunes', name: 'Lunes' },
  { value: 'Martes', name: 'Martes' },
  { value: 'Miercoles', name: 'Miercoles' },
  { value: 'Jueves', name: 'Jueves' },
  { value: 'Viernes', name: 'Viernes' }
]

const columnsLibres: Column[] = [
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
  await cargas.fetchFullList()
})
</script>

<template>
  <AuthLayout>
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
          :sortable="false"
        >
        </TableComponent>

        <!--/table Card-->
      </template>
    </CardContainer>
  </AuthLayout>
</template>
