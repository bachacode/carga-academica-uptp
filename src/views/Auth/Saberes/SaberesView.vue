<script setup lang="ts">
import { useSaberStore } from '@/stores/saberes'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import type { columnType } from '@/types/columnType'
import DeleteModal from '@/components/Containers/DeleteModal.vue'
// Store del módulo
const store = useSaberStore()

// Query de filtrado de la tabla
const { searchQuery } = storeToRefs(store)

// Columnas de la tabla
const columns: columnType[] = [
  {
    name: 'Nombre',
    nameAlias: 'Saber',
    isAsc: false
  },
  {
    name: 'Trayecto',
    isAsc: false
  },
  {
    name: 'Profesores',
    relationTitle: 'Profesores que dan ',
    noRelations: '¡Esta saber no tiene profesores asignados!',
    fatherName: 'saber',
    multipleData: [
      {
        name: 'Nombre'
      },
      {
        name: 'Apellido'
      },
      {
        name: 'Cedula'
      },
      {
        name: 'Telefono'
      }
    ]
  }
]

// Función para ordenar la tabla de forma ASC o DESC
const sortTable = async (column: string) => {
  await store.fetchAll(column)
}

// Función para ir a la vista de "pensum"
async function pensum() {
  await router.push('pensum.pdf')
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
const selectItem = async (id: string) => {
  await store.fetchOne(id)
}

// Función para borrar un item del módulo
async function destroyItem(id: string | undefined) {
  if (id) {
    await store.destroy(id)
  }
}

// Función para cambiar pagina de la tabla
const changePage = async (page: number) => {
  store.actualPage = page
}
</script>

<template>
  <!-- Delete Modal -->
  <DeleteModal
    :modal-text="`el saber ${store.singleData?.materia}`"
    @destroy-item="destroyItem(store.singleData?.id)"
  />
  <!-- /Delete Modal -->
  <AuthLayout>
    <div class="w-full px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-indigo-700 text-white">
        <font-awesome-icon icon="circle-plus" class="mr-2" />Crear Saber
      </button>
      <a href="pensum.pdf" target="_blank" class="btn mb-3 ml-4 rounded-lg bg-blue-700 text-white">
        <font-awesome-icon icon="clipboard" class="mr-2" />Ver Pensum
      </a>
      <!--Table Card-->
      <TableComponent
        title="módulo Saberes"
        v-model="searchQuery"
        :columns="columns"
        :filtered-data="store.filteredData"
        @editButton="edit"
        @deleteModal="selectItem"
        @sorting="sortTable"
        @change-page="changePage"
        :total-pages="store.data?.totalPages"
        :actual-page="store.actualPage"
      />
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>
