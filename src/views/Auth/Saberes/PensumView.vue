<script setup lang="ts">
import AuthLayout from '@/views/Auth/AuthLayout.vue'
//@ts-ignore
import html2pdf from 'html2pdf.js'
import { ref } from 'vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import { usePensumStore } from '@/stores/pensum'
import router from '@/router'
const store = usePensumStore()
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
function check(trayecto: number, periodo: number) {
  const count = store.data?.items.filter((record) => {
    //@ts-ignore
    if (record.expand.id_saber.trayecto == trayecto && record.periodo == periodo) {
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
</script>

<template>
  <AuthLayout>
    <!-- Success Alert -->
    <div class="w-full px-16 pb-8">
      <!--Table Card-->
      <button @click="router.back()" class="btn mb-3 rounded-lg bg-green-700 text-white">
        <font-awesome-icon icon="arrow-left" class="mr-2" />Volver
      </button>
      <button @click="pdf()" class="btn mb-3 ml-4 rounded-lg bg-cyan-700 text-white">
        <font-awesome-icon icon="print" class="mr-2" /> Imprimir a PDF
      </button>
      <div ref="table" class="rounded-xl bg-white px-8 pb-6 pt-3 shadow">
        <h5 class="mb-3 border-b border-gray-300 pb-3 font-bold uppercase text-gray-600">PENSUM</h5>
        <LoadingCircle :is-loaded="!store.data" />
        <template v-if="store.data">
          <template v-for="trayecto in 4" :key="trayecto">
            <table v-for="periodo in 3" :key="periodo" class="mb-6 w-full border border-green-700">
              <thead>
                <tr>
                  <th colspan="5" class="bg-green-700 py-2 pl-2 text-left text-white">
                    {{ `TRAYECTO ${trayecto} - PERIODO ${periodo}` }}
                  </th>
                </tr>
                <tr>
                  <th class="w-2/12 bg-green-300 py-2 pl-2 text-left">CodMateria</th>
                  <th class="w-7/12 bg-green-300 py-2 pl-2 text-left">Materia</th>
                  <th class="w-1/12 bg-green-300 py-2 pl-2 text-left">Trayecto</th>
                  <th class="w-1/12 bg-green-300 py-2 pl-2 text-center">Periodo</th>
                  <th class="w-1/12 bg-green-300 py-2 pl-2 text-center">Creditos</th>
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
                <template v-for="record in store.data.items" :key="record.codigo">
                  <template v-if="!check(trayecto, periodo)">
                    <tr class="bg-white even:bg-gray-200">
                      <td class="p-2">{{ record.codigo }}</td>
                      <td class="p-2">
                        {{
                          //@ts-ignore
                          record.expand.id_saber.materia
                        }}
                      </td>
                      <td class="p-2 text-center">
                        {{
                          //@ts-ignore
                          record.expand.id_saber.trayecto
                        }}
                      </td>
                      <td class="p-2 text-center">{{ record.periodo }}</td>
                      <td class="p-2 text-center">{{ record.creditos }}</td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </template>
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
