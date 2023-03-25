<script setup>
import { useSaberStore } from '@/stores/saberes'
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import html2pdf from 'html2pdf.js'
import { ref, onMounted } from 'vue';
const store = useSaberStore()
const theadColumns = [
  {
    name: 'CodMateria',
    isCentered: false
  },
  {
    name: 'Materia',
    isCentered: false
  },
  {
    name: 'Trayecto',
    isCentered: true
  },
  {
    name: 'Periodos',
    isCentered: true
  },
  {
    name: 'Creditos',
    isCentered: true
  }
]
const table = ref()

const options = ref({
  margin: 0.5,
  filename: 'pensum.pdf',
  html2canvas: { scale: 3 },
  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  pagebreak: {
        mode: ['avoid-all', 'css', 'legacy']
  },
})
function check (trayecto, periodo) {
  const count = store.data?.filter((record) => {
    if(record.trayecto == trayecto && record.periodos == periodo) {
      return true
    } else
      return false
  })
  if(count?.length == 0) {
    return true
  } else
  return false
}

function pdf() {
  html2pdf().from(table.value).set(options.value).save();
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
      <button @click="pdf()" class="btn mb-3 rounded-lg bg-green-700 text-white">
        <i class="fas fa-plus-circle pr-1"></i> Imprimir a PDF
      </button>
      <div ref="table" class="pb-6 pt-3 px-8 bg-white rounded-xl shadow">
          <h5 class="font-bold uppercase text-gray-600 m-3 border-b border-gray-300">PENSUM</h5>
      <template v-for="trayecto in 4">
        <table v-for="periodo in 3" class="w-full mb-6 ">
          <thead>
            <tr>
              <th colspan="5" class="text-left bg-blue-700 pl-2 py-2 text-white">{{ `TRAYECTO ${trayecto} - PERIODO ${periodo}` }}</th>
            </tr>
            <tr>
              <th class="text-left pl-2 py-2 bg-blue-300 w-2/12">CodMateria</th>
              <th class="text-left pl-2 py-2 bg-blue-300 w-7/12">Materia</th>
              <th class="text-left pl-2 py-2 bg-blue-300 w-1/12">Trayecto</th>
              <th class="text-center pl-2 py-2 bg-blue-300 w-1/12">Periodos</th>
              <th class="text-center pl-2 py-2 bg-blue-300 w-1/12">Creditos</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="check(trayecto, periodo)">
                <tr>
                  <td colspan="5" class="p-2 bg-white">¡No hay materias en este trayecto - periodo!</td>
                </tr>
              </template>
            <template v-for="record in store.data">
              <template v-if="record.trayecto == trayecto && record.periodos == periodo">
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
