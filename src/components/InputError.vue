<script setup lang="ts">
import type { Ref } from 'vue'
defineProps<{
  message: string | Ref<string>
}>()
</script>

<template>
  <p class="pt-1 pl-1 text-sm text-red-600">{{ message }}</p>
</template>
