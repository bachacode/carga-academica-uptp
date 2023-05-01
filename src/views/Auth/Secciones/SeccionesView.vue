<script setup lang="ts">
import { useSeccionStore } from '@/stores/secciones'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import { storeToRefs } from 'pinia'
import TableComponent from '@/components/Containers/TableComponent.vue'
import type { theadColumnType } from '@/types/moduleDataType'
import DeleteModal from '@/components/Containers/DeleteModal.vue'
// Store del módulo
const store = useSeccionStore()

// Query de filtrado de la tabla
const { searchQuery } = storeToRefs(store)

// Columnas de la tabla
const columns: theadColumnType[] = [
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

// Función para ordenar la tabla de forma ASC o DESC
const sortTable = async (column: string) => {
  await store.fetchAll(column)
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
    :modal-text="`la sección ${store.singleData?.codigo}`"
    @destroy-item="destroyItem(store.singleData?.id)"
  />
  <!-- /Delete Modal -->

  <AuthLayout>
    <div class="w-full px-16 pb-8">
      <button @click="create()" class="btn mb-3 rounded-lg bg-green-700 text-white">
        <font-awesome-icon icon="circle-plus" class="mr-2" />Crear Sección
      </button>
      <!--Table Card-->
      <TableComponent
        title="módulo Secciones"
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
