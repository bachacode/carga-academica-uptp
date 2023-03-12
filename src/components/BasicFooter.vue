<script setup lang="ts">
defineProps<{
  classes?: string
}>()
</script>

<template>
  <footer :class="`${classes} flex flex-col bg-blue-200 p-6 text-center`">
    <div class="font-bold">
      <p>&#169; 2023 Luis Mariano Rivera</p>
      <p>Este sitio web funciona con Vue.Js y PocketBase</p>
    </div>
    <p class="text-xs italic">
      Diseñado y desarrollado por Hilmaris Arrieta, Luis Gonzalez y Juan Villarroel
    </p>
  </footer>
</template>
