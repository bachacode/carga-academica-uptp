<script setup lang="ts">
import CardContainer from '@/components/Containers/CardContainer.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import { useSaberStore } from '@/stores/saberes'
import InputSelect from '@/components/InputSelect.vue'
import InputField from '@/components/InputField.vue'
import { ref, computed, watch, reactive } from 'vue'
import AuthLayout from '../AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import { useProfesoresLibresStore } from '@/stores/profesoresLibres'
const saberes = useSaberStore()
const selectedSaber = ref()
const selectedDia = ref()
const profesoresLibres = useProfesoresLibresStore()
const saberesOptions = computed(() => {
  return saberes.filteredData?.map((record: any) => {
    return {
      value: record.id,
      name: record.codigo + ' - ' + record.materia + ' - ' + record.periodo
    }
  })
})
const diasOptions = [
  { value: 'Lunes', name: 'Lunes' },
  { value: 'Martes', name: 'Martes' },
  { value: 'Miercoles', name: 'Miercoles' },
  { value: 'Jueves', name: 'Jueves' },
  { value: 'Viernes', name: 'Viernes' }
]

const columnsLibres = reactive([
  {
    name: 'Nombre',
    isAsc: false
  },
  {
    name: 'Apellido',
    isAsc: false
  },
  {
    name: 'Titulo',
    isAsc: false
  },
  {
    name: 'Saberes',
    relationTitle: 'Saberes que ha dado este profesor anteriormente ',
    noRelations: '¡Este profesor no tiene saberes asignados!',
    fatherName: 'nombre',
    multipleData: [
      {
        name: 'codigo'
      },
      {
        name: 'materia'
      }
    ]
  }
])
</script>

<template>
  <AuthLayout>
    <!-- Botones para elegir formulario -->
    <CardContainer card-width="w-full mt-10">
      <LoadingCircle :is-loaded="!saberes.data" />
      <div v-if="saberes.data" class="flex h-44 flex-col space-y-3 p-6">
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
        <div class="grid w-full grid-flow-row grid-cols-2 lg:flex-row">
          <!-- Tabla de profesores Libres -->
          <div class="relative mx-3 flex-grow pt-20">
            <TableComponent
              title="¡Profesores sin carga asignada!"
              :columns="columnsLibres"
              :view-only="true"
              :filtered-data="profesoresLibres.filteredData"
            >
            </TableComponent>
          </div>
          <div class="relative mx-3 flex-grow pt-20">
            <TableComponent
              title="Profesores que han dado ese saber anteriormente"
              :columns="columnsLibres"
              :view-only="true"
              :filtered-data="profesoresLibres.filteredData"
            >
            </TableComponent>
          </div>

          <div class="relative mx-3 flex-grow pt-10">
            <TableComponent
              title="Profesores sin carga asignada ese dia"
              :columns="columnsLibres"
              :view-only="true"
              :filtered-data="profesoresLibres.filteredData"
            >
            </TableComponent>
          </div>
        </div>
        <!--/table Card-->
      </template>
    </CardContainer>
  </AuthLayout>
</template>
