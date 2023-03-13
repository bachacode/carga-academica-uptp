<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { vOnClickOutside } from '@vueuse/components'
import type { OnClickOutsideHandler } from '@vueuse/core'
import NavLink from './NavLink.vue'

const auth = useAuthStore()

defineProps<{
  username?: string | null
  classes?: string
}>()

const dropdown = ref(false)

const dropdownHandler: OnClickOutsideHandler = () => {
  dropdown.value = false
}

function toggle() {
  dropdown.value = !dropdown.value
}
</script>

<template>
  <nav id="header" :class="`${classes} fixed top-0 z-10 w-full bg-white shadow`">
    <div class="container mx-auto mt-0 flex w-full flex-wrap items-center pt-3 pb-3 md:pb-0">
      <div class="w-1/2 pl-2 md:pl-0">
        <a
          class="text-base font-bold text-gray-900 no-underline hover:no-underline xl:text-xl"
          href="#"
        >
          <i class="fas fa-sun pr-3 text-pink-600"></i><span>Carga Academica UPTP</span>
        </a>
      </div>
      <div class="w-1/2 pr-0">
        <div class="relative float-right flex">
          <div class="relative text-sm">
            <button
              @click.stop="toggle()"
              id="userButton"
              class="mr-3 hidden items-center focus:outline-none md:flex"
            >
              <img
                class="mr-4 h-8 w-8 rounded-full"
                src="https://ui-avatars.com/api/?name=John+Doe"
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
                  <a
                    href="#"
                    class="block px-4 py-2 text-gray-900 no-underline hover:bg-gray-400 hover:no-underline"
                    >Mi cuenta</a
                  >
                </li>
                <li>
                  <hr class="mx-2 border-t border-gray-400" />
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
          <div class="block pr-4 lg:hidden">
            <button
              @click.stop="toggle()"
              id="nav-toggle"
              class="flex appearance-none items-center rounded border border-gray-600 px-3 py-2 text-gray-500 hover:border-teal-500 hover:text-gray-900 focus:outline-none"
            >
              <svg
                class="h-3 w-3 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        class="z-20 mt-2 hidden w-full flex-grow bg-white lg:mt-0 lg:flex lg:w-auto lg:items-center"
        id="nav-content"
      >
        <ul class="list-reset flex-1 items-center px-4 md:px-0 lg:flex">
          <li class="my-2 mr-6 md:my-0">
            <NavLink to="/dashboard" text="Dashboard">
              <i class="fa fa-home fa-fw mr-3"></i>
            </NavLink>
          </li>
          <li class="my-2 mr-6 md:my-0">
            <NavLink to="/secciones" text="Secciones">
              <i class="fa fa-wallet fa-fw mr-3"></i>
            </NavLink>
          </li>
          <li class="my-2 mr-6 md:my-0">
            <NavLink to="/saberes" text="Saberes">
              <i class="fa fa-wallet fa-fw mr-3"></i>
            </NavLink>
          </li>
          <li class="my-2 mr-6 md:my-0">
            <NavLink to="/profesores" text="Profesores">
              <i class="fas fa-chart-area fa-fw mr-3"></i>
            </NavLink>
          </li>
          <li class="my-2 mr-6 md:my-0">
            <NavLink to="/pensums" text="Pensums">
              <i class="fa fa-wallet fa-fw mr-3"></i>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
