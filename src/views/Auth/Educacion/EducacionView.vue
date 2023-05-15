<script setup lang="ts">
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <AuthLayout>
    <div class="flex flex-row items-start">
      <!-- Sidebar -->
      <aside
        class="ml-6 mt-20 w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full overflow-y-auto rounded-lg bg-gray-50 px-3 py-6 shadow-lg">
          <ul class="space-y-2 font-medium">
            <!-- Datos personales -->
            <li>
              <router-link
                :to="{ name: 'titulos' }"
                class="block border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3"
                active-class="text-indigo-600 hover:text-indigo-700"
              >
                <span class="ml-3">Titulos Universitarios</span>
              </router-link>
            </li>

            <!-- Cambiar contraseña -->
            <li>
              <router-link
                active-class="text-indigo-600 hover:text-indigo-700"
                :to="{ name: 'posgrados' }"
                class="block border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3"
              >
                <span class="ml-3">Titulos de Posgrados</span>
              </router-link>
            </li>

            <!-- Cambiar correo -->
            <li>
              <router-link
                active-class="text-indigo-600 hover:text-indigo-700"
                :to="{ name: 'titulos' }"
                class="block border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3"
              >
                <span class="ml-3">Lineas de Investigación</span>
              </router-link>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Active Form -->
      <Suspense>
        <RouterView :key="$route.fullPath" />
      </Suspense>
    </div>
  </AuthLayout>
</template>
