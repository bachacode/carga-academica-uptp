<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { vOnClickOutside } from '@vueuse/components'
import type { OnClickOutsideHandler } from '@vueuse/core'
import NavLink from './NavLink.vue'
import router from '@/router'
const auth = useAuthStore()
defineProps<{
  username?: string | null
  classes?: string
}>()

type navLink = {
  route: string
  iconName: string
  label: string
  adminOnly: boolean
}

const navLinks = ref<navLink[]>([
  {
    route: '/dashboard',
    iconName: 'home',
    label: 'Inicio',
    adminOnly: false
  },
  {
    route: '/secciones',
    iconName: 'user-group',
    label: 'Secciones',
    adminOnly: false
  },
  {
    route: '/saberes',
    iconName: 'chalkboard',
    label: 'Saberes',
    adminOnly: false
  },
  {
    route: '/titulos',
    iconName: 'university',
    label: 'Títulos Académicos',
    adminOnly: false
  },
  {
    route: '/profesores',
    iconName: 'chalkboard-teacher',
    label: 'Profesores',
    adminOnly: false
  },
  {
    route: '/carga',
    iconName: 'clock',
    label: 'Carga Académica',
    adminOnly: false
  },
  {
    route: '/reportes',
    iconName: 'clipboard-list',
    label: 'Reportes',
    adminOnly: false
  },
  {
    route: '/usuarios',
    iconName: 'user',
    label: 'Operadores',
    adminOnly: true
  },
  {
    route: '/historial',
    iconName: 'list',
    label: 'Historial',
    adminOnly: true
  }
])

const dropdown = ref(false)

const dropdownHandler: OnClickOutsideHandler = () => {
  dropdown.value = false
}

function toggle() {
  dropdown.value = !dropdown.value
}

async function dashboard() {
  await router.push({ name: 'dashboard' })
}

async function myAccount() {
  await router.push({ name: 'my-account' })
}

async function verifyEmail() {
  await auth.sendVerification().then(() => toggle())
}
</script>

<template>
  <nav id="header" :class="`${classes} fixed top-0 z-10 w-full bg-white shadow`">
    <div class="container mx-auto mt-0 flex w-full flex-wrap items-center pt-3 pb-3 md:pb-0">
      <div class="w-1/2 pl-2 md:pl-0">
        <button
          class="cursor-pointer text-base font-bold text-gray-900 no-underline hover:no-underline xl:text-xl"
          @click="dashboard()"
        >
          <span>Carga Académica UPTP</span>
        </button>
      </div>
      <div class="w-1/2 pr-0">
        <div class="relative float-right flex">
          <div class="relative text-sm">
            <font-awesome-icon
              v-if="auth.user?.verified == false"
              icon="circle-exclamation"
              class="hover: absolute top-0 left-0 animate-bounce text-red-500"
            />
            <button
              @click.stop="toggle()"
              id="userButton"
              class="mr-3 flex items-center focus:outline-none"
            >
              <img
                class="ml-2 h-8 w-8 rounded-full md:mr-3"
                :src="`https://ui-avatars.com/api/?name=${auth.user?.nombre}+${auth.user?.apellido}`"
                alt="Avatar of User"
              />
              <span class="hidden md:inline-block">Hola, {{ username }}</span>
              <svg
                class="h-2 pl-2"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 129 129"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                enable-background="new 0 0 129 129"
              >
                <g>
                  <path
                    d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
                  />
                </g>
              </svg>
            </button>
            <div
              v-show="dropdown"
              v-on-click-outside.bubble="dropdownHandler"
              class="absolute top-8 right-0 z-30 mt-2 min-w-full overflow-auto rounded bg-white shadow-md"
            >
              <ul class="list-reset">
                <li>
                  <button
                    @click="myAccount()"
                    class="w-full cursor-pointer px-4 py-2 text-left text-gray-900 no-underline hover:bg-gray-400 hover:no-underline"
                  >
                    Mi cuenta
                  </button>
                </li>
                <template v-if="auth.user?.verified == false">
                  <li>
                    <hr class="border-t border-gray-400" />
                  </li>
                  <li class="relative">
                    <font-awesome-icon
                      v-if="auth.user?.verified == false"
                      icon="circle-exclamation"
                      class="hover: absolute top-3 right-3 animate-bounce text-red-500"
                    />
                    <button
                      @click="verifyEmail()"
                      class="w-full cursor-pointer px-4 py-2 text-left text-gray-900 no-underline hover:bg-gray-400 hover:no-underline"
                    >
                      Verificar correo
                    </button>
                  </li>
                </template>
                <li>
                  <hr class="border-t border-gray-400" />
                </li>
                <li>
                  <a
                    @click="auth.logout()"
                    class="block px-4 py-2 text-gray-900 no-underline hover:cursor-pointer hover:bg-gray-400 hover:no-underline"
                    >Cerrar sesión</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Navbar Moviles -->
      <div class="z-20 mt-2 flex w-full bg-white lg:hidden">
        <ul class="flex w-full flex-row items-center px-4 md:px-0 lg:flex">
          <!-- Links -->
          <template v-for="navLink in navLinks" :key="navLink.route">
            <li
              v-if="!navLink.adminOnly || auth.user?.rol == 'Administrador'"
              class="m-2 flex-grow"
            >
              <NavLink :to="navLink.route" :aria-label="navLink.label">
                <font-awesome-icon :icon="navLink.iconName" class="text-2xl" />
              </NavLink>
            </li>
          </template>

          <!-- Boton de ayuda -->
          <li class="m-2 flex-grow">
            <NavLink to="/">
              <font-awesome-icon icon="question-circle" class="text-2xl" />
            </NavLink>
          </li>
        </ul>
      </div>

      <!-- Navbar -->
      <div
        class="z-20 mt-2 hidden w-full flex-grow bg-white lg:mt-0 lg:flex lg:w-auto lg:items-center"
        id="nav-content"
      >
        <ul class="flex-1 items-center justify-between px-4 md:px-0 lg:flex">
          <!-- Links -->
          <div class="flex">
            <template v-for="navLink in navLinks" :key="navLink.route">
              <li
                v-if="!navLink.adminOnly || auth.user?.rol == 'Administrador'"
                class="my-2 mr-6 md:my-0"
              >
                <NavLink :to="navLink.route" :text="navLink.label">
                  <font-awesome-icon :icon="navLink.iconName" />
                </NavLink>
              </li>
            </template>
          </div>

          <!-- Botón de ayuda -->
          <li class="my-2 mr-6 md:my-0">
            <NavLink to="/" text="Ayuda">
              <font-awesome-icon icon="question-circle" />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
