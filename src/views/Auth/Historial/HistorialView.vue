<script setup lang="ts">
import { useHistorialStore } from '@/stores/historial'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import { storeToRefs } from 'pinia'
import type { columnType } from '@/types/columnType'
import { ref, watch } from 'vue'
// Store del módulo
const store = useHistorialStore()

// Query de filtrado de la tabla
const { searchQuery } = storeToRefs(store)

// Columnas de la tabla
const columns: columnType[] = [
  {
    name: 'username',
    nameAlias: 'Nombre de Usuario',
    isAsc: false
  },
  {
    name: 'accion',
    isAsc: false
  },
  {
    name: 'tabla',
    isAsc: false
  },
  {
    name: 'created',
    nameAlias: 'creado en',
    isAsc: false
  }
]

// Variable que guarda el ordén actual de la tabla
const sortedBy = ref('')

/*
 * Observa a la variable sortedBy por cambios, si esta variable cambia
 * Realizara un fetchAll con el orden de la tabla
 */
watch(sortedBy, async () => {
  await store.fetchAll(sortedBy.value)
})

// Función para ordenar la tabla de forma ASC o DESC
const sortTable = (column: string) => {
  sortedBy.value = column
}

// Función para seleccionar un item del módulo
const selectItem = async (id: string) => {
  await store.fetchOne(id)
}

// Función para cambiar pagina de la tabla
const changePage = async (page: number) => {
  store.actualPage = page
}
</script>

<template>
  <AuthLayout>
    <div class="w-full px-16 pb-8">
      <!--Table Card-->
      <TableComponent
        title="módulo Saberes"
        v-model="searchQuery"
        :columns="columns"
        :filtered-data="store.filteredData"
        @deleteModal="selectItem"
        @sorting="sortTable"
        @change-page="changePage"
        :total-pages="store.data?.totalPages"
        :actual-page="store.actualPage"
        :view-only="true"
      />
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>
