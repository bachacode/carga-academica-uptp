<script setup lang="ts">
export interface Props {
  cardWidth: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-center">
    <div :class="`${cardWidth} mb-6 rounded border bg-white shadow`">
      <slot></slot>
    </div>
  </div>
</template>
