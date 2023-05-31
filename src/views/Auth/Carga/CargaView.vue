<script setup lang="ts">
import { useCargaStore } from '@/stores/carga'
import { useClaseStore, type claseType } from '@/stores/clases'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { reactive, ref, watchEffect } from 'vue'
import type { columnType } from '@/types/columnType'
import DeleteModal from '@/components/Containers/DeleteModal.vue'

// Store del módulo
const store = useCargaStore()

// Store del módulo 2
const clases = useClaseStore()

// Query de filtrado de la tabla
const { searchQuery } = storeToRefs(clases)

// Id del item a eliminar
const id = ref()

// Datos del registro seleccionado
const singleData = reactive<claseType>({
  nombre: '',
  apellido: '',
  cedula: '',
  horas: '',
  dia: '',
  saber: '',
  seccion: ''
})

// Columnas de la tabla
const columns: columnType[] = [
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
    nameAlias: 'Cédula',
    isAsc: false
  },
  {
    name: 'seccion',
    nameAlias: 'Sección',
    isAsc: false
  },
  {
    name: 'Saber',
    isAsc: false
  },
  {
    name: 'Horas',
    isAsc: false
  }
]

// Arreglo para el selector de dias
const daySelector = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'all']

// Función para ordenar la tabla de forma ASC o DESC
const sortTable = async (column: string) => {
  await clases.fetchAll(column)
}

// Función para ir a la vista de "create"
async function create() {
  await store.goToCreate()
}

// Función para ir a la vista de "edit"
const edit = async (id: string) => {
  await store.goToEdit(id)
}

// Función para seleccionar un item del módulo
const selectItem = async (selectedId: string) => {
  id.value = selectedId
  await store.fetchOne(id.value).then((data) => {
    Object.assign(singleData, data)
  })
}

// Función para borrar un item del módulo
async function destroyItem(id: string | undefined) {
  if (id) {
    await store.destroy(id).then(async () => {
      await clases.fetchAll('-horas', `dia = "${activeDay.value}"`)
    })
  }
}

// Función para cambiar pagina de la tabla
const changePage = async (page: number) => {
  store.actualPage = page
}

// Variable reactiva que guarda el dia seleccionado
const activeDay = ref('Lunes')

// WatchEffect qeu vigila el "activeDay", en caso de cambios, realiza fetch a la BD con el nuevo dia
watchEffect(async () => {
  if (activeDay.value == 'all') {
    clases.data = await clases.pb.collection('carga_total').getList(1, 50)
  } else await clases.fetchAll('-horas', `dia = "${activeDay.value}"`)
})
</script>

<template>
  <!-- Delete Modal -->
  <DeleteModal
    :modal-text="`la carga academica del profesor ${singleData?.nombre} ${singleData?.apellido}`"
    @destroy-item="destroyItem(id)"
  />
  <!-- /Delete Modal -->
  <AuthLayout>
    <div class="w-full space-x-3 px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-indigo-700 text-white">
        <font-awesome-icon icon="circle-plus" class="mr-2" />Registrar Horas Academicas
      </button>
      <button
        @click="router.push({ name: 'carga.recommend' })"
        class="btn mb-3 rounded-lg bg-yellow-500 text-yellow-900 hover:bg-yellow-900 hover:text-yellow-500"
      >
        <font-awesome-icon icon="star" class="mr-2" /> Profesores recomendados
      </button>
      <!--Table Card-->
      <TableComponent
        title="Carga Academica"
        v-model="searchQuery"
        :columns="columns"
        :filtered-data="clases.filteredData"
        @editButton="edit"
        @deleteModal="selectItem"
        @sorting="sortTable"
        @relation="selectItem"
        @change-page="changePage"
        :total-pages="store.data?.totalPages"
        :actual-page="store.actualPage"
      >
        <!-- Selector de dia -->
        <template #header>
          <div>
            <ul class="flex justify-around py-6 px-10">
              <li v-for="day in daySelector" :key="day">
                <button
                  v-if="day != 'all'"
                  @click="activeDay = day"
                  :title="day"
                  :class="`btn-outline btn rounded-xl px-16 hover:bg-indigo-900 ${
                    activeDay == day ? 'bg-indigo-700 text-white' : ''
                  }`"
                >
                  {{ day }}
                </button>
                <button
                  v-if="day == 'all'"
                  @click="activeDay = day"
                  title="Total"
                  :class="`btn-outline btn rounded-xl px-16 hover:bg-indigo-900 ${
                    activeDay == day ? 'bg-indigo-700 text-white' : ''
                  }`"
                >
                  Total
                </button>
              </li>
            </ul>
          </div>
        </template>
      </TableComponent>
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>
