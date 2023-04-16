<script setup lang="ts">
export interface Props {
  cardWidth: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-center">
    <div :class="`${cardWidth} mb-6 min-h-[240px] rounded border bg-white shadow`">
      <slot></slot>
    </div>
  </div>
</template>
