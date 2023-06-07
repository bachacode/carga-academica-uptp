<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps<{
  to: string
  text?: string
  classes?: string
  [props: string]: any
}>()
</script>

<template>
  <RouterLink
    :to="to"
    :class="`${classes} flex flex-col border-b-2 border-white px-2 py-1 text-center align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3 lg:text-left lg:hover:border-indigo-500`"
    active-class="text-indigo-600 lg:border-b-2 lg:border-indigo-500"
  >
    <slot></slot>
    <span class="py-1 text-sm md:pb-0">{{ text }}</span>
  </RouterLink>
</template>
