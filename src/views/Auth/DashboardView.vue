<script setup lang="ts">
import MetricCard from '@/components/MetricCard.vue'
import AuthLayout from './AuthLayout.vue'
import { useProfesorStore } from '@/stores/profesores'
import { useUsuarioStore } from '@/stores/usuarios'
import { useSeccionStore } from '@/stores/secciones'
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted } from 'vue'
import TableComponent from '@/components/Containers/TableComponent.vue'
import { reactive } from 'vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
const profesores = useProfesorStore()
const usuarios = useUsuarioStore()
const secciones = useSeccionStore()
const auth = useAuthStore()
const totalProfs = computed(() => {
  return profesores.data?.length
})
const profsConMaterias = computed(() => {
  return profesores.data?.filter((profesor) => {
    return profesor.expand.saberes
  }).length
})
const totalUsers = computed(() => {
  return usuarios.data?.length
})
const totalSecciones = computed(() => {
  return secciones.data?.length
})
const totalActiveUsers = computed(() => {
  return usuarios.data?.filter((usuario) => {
    return usuario.status == true
  }).length
})

const theadColumns = reactive([
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
    name: 'Titulo',
    isAsc: false
  }
])

onMounted(() => {
  usuarios.fetchAll()
})
</script>

<template>
  <AuthLayout>
    <!--Container-->
    <div class="container mx-auto w-full">
      <!-- Loading Circle -->
      <LoadingCircle :is-loaded="!(profesores.data && secciones.data && usuarios.data)" />
      <div
        v-if="profesores.data && secciones.data && usuarios.data"
        class="mb-16 w-full px-4 leading-normal text-gray-800 md:mt-8 md:px-0"
      >
        <!--Console Content-->
        <div class="flex flex-wrap">
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <MetricCard
              title="Secciones con horario asignado"
              :amount="`0 / ${totalSecciones}`"
              main-icon-color="green"
              secondary-icon-color="green"
            >
              <template #main-icon>
                <font-awesome-icon icon="user-group" class="fa-2x fa-fw fa-inverse" />
              </template>
            </MetricCard>
            <!--/Metric Card-->
          </div>
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <MetricCard
              title="Profesores con materias"
              :amount="`${profsConMaterias} / ${totalProfs}`"
              main-icon-color="green"
              secondary-icon-color="green"
            >
              <template #main-icon>
                <font-awesome-icon icon="chalkboard-teacher" class="fa-2x fa-fw fa-inverse" />
              </template>
            </MetricCard>
            <!--/Metric Card-->
          </div>
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <MetricCard
              title="Profesores asignados"
              :amount="`0 / ${totalProfs}`"
              main-icon-color="green"
              secondary-icon-color="green"
            >
              <template #main-icon>
                <font-awesome-icon icon="chalkboard" class="fa-2x fa-fw fa-inverse" />
              </template>
            </MetricCard>
            <!--/Metric Card-->
          </div>
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <div class="rounded border bg-white p-2 shadow">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded bg-blue-600 p-3">
                    <i class="fas fa-server fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-500">Server Uptime</h5>
                  <h3 class="text-3xl font-bold">152 days</h3>
                </div>
              </div>
            </div>
            <!--/Metric Card-->
          </div>
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <div class="rounded border bg-white p-2 shadow">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded bg-indigo-600 p-3">
                    <i class="fas fa-tasks fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-500">To Do List</h5>
                  <h3 class="text-3xl font-bold">7 tasks</h3>
                </div>
              </div>
            </div>
            <!--/Metric Card-->
          </div>
          <div v-if="auth.user?.rol == 'Administrador'" class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <MetricCard
              title="Usuarios Activos"
              :amount="`${totalActiveUsers} / ${totalUsers}`"
              main-icon-color="green"
              secondary-icon-color="green"
            >
              <template #main-icon>
                <font-awesome-icon icon="user" class="fa-2x fa-fw fa-inverse" />
              </template>
            </MetricCard>
            <!--/Metric Card-->
          </div>
        </div>

        <!--Divider-->
        <hr class="my-8 mx-4 border-b-2 border-gray-400" />

        <div class="mt-2 flex flex-grow flex-row flex-wrap">
          <div class="w-full p-3">
            <!--Table Card-->
            <TableComponent
              title="Ultimos profesores agregados"
              :columns="theadColumns"
              :filtered-data="profesores.filteredData"
              :sortable="false"
              :view-only="true"
            />

            <!--/table Card-->
          </div>
        </div>
        <!--/ Console Content-->
      </div>
    </div>
    <!--/container-->
  </AuthLayout>
</template>
