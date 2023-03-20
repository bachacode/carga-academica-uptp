<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps<{
  to: string
  text: string
  classes?: string
  [props: string]: any
}>()
</script>

<template>
  <RouterLink
    :to="to"
    :class="`${classes} block border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:border-blue-500 hover:text-gray-900 md:py-3`"
  >
    <slot></slot>
    <span class="pl-2 pb-1 text-sm md:pb-0">{{ text }}</span>
  </RouterLink>
</template>
