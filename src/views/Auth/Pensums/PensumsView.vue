<script setup lang="ts">
import { useSaberStore } from '@/stores/saberes'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
//@ts-ignore
import html2pdf from 'html2pdf.js'
import { ref, onMounted } from 'vue'
const store = useSaberStore()
const table = ref()
const options = ref({
  margin: 0.5,
  filename: 'pensum.pdf',
  html2canvas: { scale: 3 },
  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  pagebreak: {
    mode: ['avoid-all', 'css', 'legacy']
  }
})
function check(trayecto: any, periodo: any) {
  const count = store.data?.filter((record) => {
    if (record.trayecto == trayecto && record.periodo == periodo) {
      return true
    } else return false
  })
  if (count?.length == 0) {
    return true
  } else return false
}

function pdf() {
  html2pdf().from(table.value).set(options.value).save()
}

onMounted(async () => {
  await store.fetchAll()
})
</script>

<template>
  <AuthLayout>
    <!-- Success Alert -->
    <div class="w-full px-16 py-8">
      <!--Table Card-->
      <button @click="pdf()" class="btn mb-3 rounded-lg bg-cyan-700 text-white">
        <i class="fas fa-plus-circle pr-1"></i> Imprimir a PDF
      </button>
      <div ref="table" class="rounded-xl bg-white px-8 pb-6 pt-3 shadow">
        <h5 class="m-3 border-b border-gray-300 font-bold uppercase text-gray-600">PENSUM</h5>
        <template v-for="trayecto in 4" :key="trayecto">
          <table v-for="periodo in 3" :key="periodo" class="mb-6 w-full border border-blue-700">
            <thead>
              <tr>
                <th colspan="5" class="bg-blue-700 py-2 pl-2 text-left text-white">
                  {{ `TRAYECTO ${trayecto} - PERIODO ${periodo}` }}
                </th>
              </tr>
              <tr>
                <th class="w-2/12 bg-blue-300 py-2 pl-2 text-left">CodMateria</th>
                <th class="w-7/12 bg-blue-300 py-2 pl-2 text-left">Materia</th>
                <th class="w-1/12 bg-blue-300 py-2 pl-2 text-left">Trayecto</th>
                <th class="w-1/12 bg-blue-300 py-2 pl-2 text-center">Periodo</th>
                <th class="w-1/12 bg-blue-300 py-2 pl-2 text-center">Creditos</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="check(trayecto, periodo)">
                <tr>
                  <td colspan="5" class="bg-white p-2">
                    ¡No hay materias en este trayecto - periodo!
                  </td>
                </tr>
              </template>
              <template v-for="record in store.data" :key="record.codigo">
                <template v-if="record.trayecto == trayecto && record.periodo == periodo">
                  <tr class="bg-white even:bg-gray-200">
                    <td class="p-2">{{ record.codigo }}</td>
                    <td class="p-2">{{ record.materia }}</td>
                    <td class="p-2 text-center">{{ record.trayecto }}</td>
                    <td class="p-2 text-center">{{ record.periodos }}</td>
                    <td class="p-2 text-center">{{ record.creditos }}</td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </template>
      </div>
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
