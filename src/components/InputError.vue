<script setup lang="ts">
import type { Ref } from 'vue'
defineProps<{
  message: string | Ref<string>
  classes?: string
}>()
</script>

<template>
  <p :class="`${classes} text-sm text-red-600`">{{ message }}</p>
</template>
