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
                class="flex border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3"
              >
                <svg
                  aria-hidden="true"
                  class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span class="ml-3">Datos Personales</span>
              </router-link>
            </li>

            <!-- Cambiar contraseña -->
            <li>
              <router-link
                exact-active-class="router-link-exact-sidebar-active"
                :to="{ name: 'my-password' }"
                class="flex border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3"
              >
                <svg
                  aria-hidden="true"
                  class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span class="ml-3">Cambiar Contraseña</span>
              </router-link>
            </li>

            <!-- Cambiar correo -->
            <li>
              <router-link
                exact-active-class="router-link-exact-sidebar-active"
                :to="{ name: 'my-email' }"
                class="flex border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3"
              >
                <svg
                  aria-hidden="true"
                  class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
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
