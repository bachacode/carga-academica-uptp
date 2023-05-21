<script setup lang="ts">
import MetricCard from '@/components/MetricCard.vue'
import AuthLayout from './AuthLayout.vue'
import { useProfesorStore } from '@/stores/profesores'
import { useUsuarioStore } from '@/stores/usuarios'
import { useSeccionStore } from '@/stores/secciones'
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted } from 'vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import { useProfesoresLibresStore } from '@/stores/profesoresLibres'
import { useSeccionesLibresStore } from '@/stores/seccionesLibres'
import { Chart, registerables } from 'chart.js'
import { PieChart } from 'vue-chart-3'
Chart.register(...registerables)
// Store de profesores
const profesores = useProfesorStore()

// Store de usuarios
const usuarios = useUsuarioStore()

// Store de secciones
const secciones = useSeccionStore()

// Store de profesores libres
const profesoresLibres = useProfesoresLibresStore()

// Store de secciones libres
const seccionesLibres = useSeccionesLibresStore()

// Store de autenticación
const auth = useAuthStore()

// Valor computado que devuelve la cantidad total de profesores
const totalProfs = computed(() => {
  return profesores.data?.items.length
})

// Valor computado que devuelve la cantidad total de secciones
const totalSecciones = computed(() => {
  return secciones.data?.items.length
})

// Valor computado que devuelve la cantidad total de usuarios operadores y administradores
const totalUsers = computed(() => {
  return usuarios.data?.items.length
})

// Valor computado que devuelve la cantidad de profesores con carga asignada
const profsConCarga = computed(() => {
  if (profesores.data && profesoresLibres.data)
    return profesores.data?.items.length - profesoresLibres.data.items.length
  else return 0
})

// Valor computado que devuelve la cantidad de secciones con carga asignada
const seccionesConCarga = computed(() => {
  if (secciones.data && seccionesLibres.data)
    return secciones.data?.items.length - seccionesLibres.data.items.length
  else return 0
})

// Valor computado que devuelve la cantidad de profesores con materias dadas asignadas
const profsConMaterias = computed(() => {
  return profesores.data?.items.filter((profesor) => {
    return profesor.expand.saberes
  }).length
})

// Valor computado que devuelve la cantidad total de usuarios activos en el sistema
const totalActiveUsers = computed(() => {
  if (usuarios.data)
    return usuarios.data?.items.filter((usuario) => {
      return usuario.estado == true
    }).length
  else return 0
})

// Valor computado que devuelve la cantidad total de usuarios inactivos en el sistema
const totalInactiveUsers = computed(() => {
  if (usuarios.data)
    return usuarios.data.items.filter((usuario) => {
      return usuario.estado == false
    }).length
  else return 0
})

// Valor computado que devuelve la cantidad de profesores sin carga asignada
const profsSinCarga = computed(() => {
  if (profesoresLibres.data) return profesoresLibres.data.items.length
  else return 0
})

// Valor computado que devuelve la cantidad de secciones sin carga asignada
const seccionesSinCarga = computed(() => {
  if (seccionesLibres.data) return seccionesLibres.data.items.length
  else return 0
})

// Datos de la grafica "Profesores Asignados"
const dataSetProfesores = computed(() => {
  return [profsConCarga.value, profsSinCarga.value]
})

const profsAsignadosChart = computed(() => ({
  labels: ['Asignados', 'No Asignados'],
  datasets: [
    {
      data: dataSetProfesores.value,
      backgroundColor: ['#4ade80', '#f87171']
    }
  ]
}))

//Datos de la grafica "Secciones Asignadas"
const dataSetSecciones = computed(() => {
  return [seccionesConCarga.value, seccionesSinCarga.value]
})

const seccionesAsignadasChart = computed(() => ({
  labels: ['Asignados', 'No Asignados'],
  datasets: [
    {
      data: dataSetSecciones.value,
      backgroundColor: ['#4ade80', '#f87171']
    }
  ]
}))

//Datos de la grafica "Operadores Activos"
const dataSetOperadores = computed(() => {
  return [totalActiveUsers.value, totalInactiveUsers.value]
})

const operadoresActivosChart = computed(() => ({
  labels: ['Activos', 'Desactivados'],
  datasets: [
    {
      data: dataSetOperadores.value,
      backgroundColor: ['#4ade80', '#f87171']
    }
  ]
}))

// Al inicializar el componente, hace fetch de tres módulos distintos
onMounted(async () => {
  await seccionesLibres.fetchAll()
  await profesoresLibres.fetchAll()
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
          <!-- Secciones Totales -->
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <MetricCard
              title="Secciones con horas asignadas"
              :amount="`${seccionesConCarga} / ${totalSecciones}`"
              main-icon-color="green"
              secondary-icon-color="green"
            >
              <template #main-icon>
                <font-awesome-icon icon="user-group" class="fa-2x fa-fw fa-inverse" />
              </template>
            </MetricCard>
          </div>

          <!-- Profesores con materias -->
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

          <!-- Profesores con horas asignadas -->
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <MetricCard
              title="Profesores con horas asignadas"
              :amount="`${profsConCarga} / ${totalProfs}`"
              main-icon-color="green"
              secondary-icon-color="green"
            >
              <template #main-icon>
                <font-awesome-icon icon="chalkboard" class="fa-2x fa-fw fa-inverse" />
              </template>
            </MetricCard>
            <!--/Metric Card-->
          </div>

          <!-- Usuarios operadores activos -->
          <div v-if="auth.user?.rol == 'Administrador'" class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <MetricCard
              title="Operadores Activos"
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

        <!-- Grafica de profesores asignados -->
        <hr class="my-8 mx-4 border-b-2 border-gray-400" />
        <div class="mt-2 flex flex-grow flex-row flex-wrap">
          <div class="w-full p-3 md:w-1/3">
            <div class="rounded border bg-white shadow">
              <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Profesores asignados</h5>
              </div>
              <div class="p-5">
                <PieChart :chartData="profsAsignadosChart" />
              </div>
            </div>
          </div>

          <!-- Grafica de Secciones asignadas -->
          <div class="w-full p-3 md:w-1/3">
            <div class="rounded border bg-white shadow">
              <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Secciones Asignadas</h5>
              </div>
              <div class="p-5">
                <PieChart :chartData="seccionesAsignadasChart" />
              </div>
            </div>
          </div>

          <!-- Grafica de Operadores Activos -->
          <div class="w-full p-3 md:w-1/3">
            <div class="rounded border bg-white shadow">
              <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Operadores Activos</h5>
              </div>
              <div class="p-5">
                <PieChart :chartData="operadoresActivosChart" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/container-->
  </AuthLayout>
</template>
