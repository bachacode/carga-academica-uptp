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
    :class="`${classes} block border-b-2 border-white py-1 pl-1 text-center align-middle text-gray-500 no-underline hover:text-gray-900 md:py-3 lg:text-left lg:hover:border-green-500`"
  >
    <slot></slot>
    <span class="pl-2 pb-1 text-sm md:pb-0">{{ text }}</span>
  </RouterLink>
</template>
