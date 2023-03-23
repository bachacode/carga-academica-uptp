<script setup lang="ts">
import { useSaberStore } from '@/stores/saberes'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
const store = useSaberStore()
const { fetchAll, destroy, fetchOne } = store
const { searchQuery } = storeToRefs(store)
const theadColumns = [
  {
    name: 'CodMateria',
    isAsc: false
  },
  {
    name: 'Materia',
    isAsc: false
  },
  {
    name: 'Trayecto',
    isAsc: false
  },
  {
    name: 'Periodos',
    isAsc: false
  },
  {
    name: 'Creditos',
    isAsc: false
  }
]

function check (trayecto: number, periodo: number) {
  const count = store.data?.filter((record) => {
    if(record.trayecto == trayecto && record.periodos == periodo) {
      console.log(record.trayecto)
      return true
    } else
      return false
  })
  if(count?.length == 0) {
    return true
  } else
  return false
}

const sortTable = async (column: string) => {
  console.log(column)
  await fetchAll(column)
}

const selectItem = async (id: string) => {
  await fetchOne(id)
}

async function destroyItem(id: string | undefined) {
  if (id) {
    await destroy(id)
  }
}
</script>

<template>
  <!-- Delete Modal -->
  <Teleport to="#modal">
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">¡Cuidado!</h3>
        <p class="py-4">
          Estas a punto de borrar el saber {{ store.singleData?.codigo }}. ¿Esta seguro que desea
          hacer esto?
        </p>
        <div class="modal-action items-center">
          <label
            for="my-modal"
            class="btn-outline mr-2 cursor-pointer rounded-xl p-2 hover:bg-white hover:text-blue-700"
            >¡No!</label
          >
          <label
            for="my-modal"
            class="btn rounded-xl bg-red-700"
            @click="destroyItem(store.singleData?.id)"
            >Borrar</label
          >
        </div>
      </div>
    </div>
  </Teleport>
  <AuthLayout>
    <!-- Success Alert -->
    <div class="w-full px-16 py-8 bg-indigo-300">
      <!--Table Card-->
      <template v-for="trayecto in 4">
        <table v-for="periodo in 3" class="table table-zebra w-full mb-6">
          <thead>
            <tr>
              <th colspan="5" class="bg-blue-700 text-white">{{ `TRAYECTO ${trayecto} - PERIODO ${periodo}` }}</th>
            </tr>
            <tr >
              <th class="bg-blue-300" v-for="column in theadColumns">{{ column.name }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="check(trayecto, periodo)">
                <tr>
                  <td colspan="5">¡No hay materias en este trayecto - periodo!</td>
                </tr>
              </template>
            <template v-for="record in store.data">
              <template v-if="record.trayecto == trayecto && record.periodos == periodo">
                <tr>
                  <td>{{ record.codigo }}</td>
                  <td>{{ record.materia }}</td>
                  <td>{{ record.trayecto }}</td>
                  <td>{{ record.periodos }}</td>
                  <td>{{ record.creditos }}</td>
                </tr>
              </template>
            </template>
            </tbody>
          </table>
      </template>
      <!-- <TableComponent
        v-model="searchQuery"
        :columns="theadColumns"
        :filtered-data="store.filteredData"
        @editButton="edit"
        @deleteModal="selectItem"
        @sorting="sortTable"
      /> -->
      <!--/table Card-->
    </div>
  </AuthLayout>
</template>
