<script setup lang="ts">
import router from '@/router'

export interface Props {
  title: string
  backButton?: boolean
}

withDefaults(defineProps<Props>(), {
  backButton: false
})
</script>

<template>
  <main class="h-screen bg-blue-100">
    <div class="flex w-full flex-wrap">
      <!-- Login Section -->
      <div class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-12 md:-mb-24">
          <img
            src="/logo.png"
            @click="router.push({ name: 'login' })"
            class="mb-6 w-1/4 cursor-pointer py-4 pl-1 text-xl font-bold text-white"
          />
        </div>

        <div
          class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32"
        >
          <template v-if="backButton">
            <button
              class="btn-ghost pr-2 pt-2 text-center hover:bg-blue-100 hover:text-blue-700"
              @click="router.push('login')"
            >
              <i class="fas fa-arrow-left pr-1"></i><span>Volver al inicio</span>
            </button>
          </template>
          <p class="text-center text-3xl">{{ title }}</p>
          <slot></slot>
        </div>
      </div>
      <!-- Image Section -->
      <div class="w-1/2 shadow-2xl">
        <img
          class="hidden h-screen w-full object-cover md:block"
          src="https://img.freepik.com/free-vector/minimal-geometric-stripe-shape-background_1409-1014.jpg"
        />
      </div>
    </div>
  </main>
</template>
