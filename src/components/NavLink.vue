<script setup lang="ts">
defineProps<{
  text: string
  classes?: string
  [props: string]: any
}>()
</script>

<template>
  <RouterLink
    to="#"
    :class="`${classes} block border-b-2 border-white py-1 pl-1 align-middle text-gray-500 no-underline hover:border-red-500 hover:text-gray-900 md:py-3`"
  >
    <i class="fa fa-wallet fa-fw mr-3"></i><span class="pb-1 text-sm md:pb-0">{{ text }}</span>
  </RouterLink>
</template>
