<script setup lang="ts">
import AuthLayout from '@/views/Auth/AuthLayout.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <AuthLayout>
    <div class="flex flex-row items-start">
      <!-- Sidebar -->
      <aside
        class="ml-6 mt-3 w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full overflow-y-auto rounded-lg bg-gray-50 px-3 py-4 shadow-lg">
          <ul class="space-y-2 font-medium">
            <!-- Datos personales -->
            <li>
              <router-link
                exact-active-class="router-link-exact-sidebar-active"
                :to="{ name: 'my-account' }"
                class="block border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3"
              >
                <font-awesome-icon icon="user" />
                <span class="ml-3">Datos Personales</span>
              </router-link>
            </li>

            <!-- Cambiar contraseña -->
            <li>
              <router-link
                exact-active-class="router-link-exact-sidebar-active"
                :to="{ name: 'my-password' }"
                class="block border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3"
              >
                <font-awesome-icon icon="lock" />
                <span class="ml-3">Cambiar Contraseña</span>
              </router-link>
            </li>

            <!-- Cambiar correo -->
            <li>
              <router-link
                exact-active-class="router-link-exact-sidebar-active"
                :to="{ name: 'my-email' }"
                class="block border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3"
              >
                <font-awesome-icon icon="envelope" />
                <span class="ml-3">Cambiar Correo</span>
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
