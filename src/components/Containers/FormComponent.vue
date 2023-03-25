<script setup lang="ts">
import router from '@/router'
export interface Props {
  submitText?: string
  backText?: string

}

withDefaults(defineProps<Props>(), {
  submitText: 'Crear',
  backText: 'Volver'
})
defineEmits(['formSubmit'])

</script>

<template>
  <div class="flex items-center justify-center">
      <div class="w-2/4 px-16 pb-8">
        <div class="rounded border bg-white shadow">
          <button
            class="btn-ghost px-2 pt-2 hover:bg-white hover:text-blue-700 mb-6"
            @click="router.back()"
          >
            <i class="fas fa-arrow-left pr-1"></i>{{backText}}
          </button>
          <form class="px-6 pb-6" @submit.prevent="$emit('formSubmit')">
            <slot name="inputs">

            </slot>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-6 py-3 text-center">
              {{submitText}}
            </button>
          </form>
        </div>
      </div>
    </div>
</template>
