<script setup lang="ts">
export interface Props {
  modalText: string
}
defineProps<Props>()
defineEmits(['destroyItem'])
</script>

<template>
  <!-- Delete Modal -->
  <Teleport to="#modal">
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">¡Cuidado!</h3>
        <p class="py-4">
          Estas a punto de borrar {{ modalText }}. ¿Esta seguro que desea hacer esto?
        </p>
        <div class="modal-action items-center">
          <label
            for="my-modal"
            class="btn-outline mr-2 cursor-pointer rounded-xl p-2 hover:bg-white hover:text-green-700"
            >¡No!</label
          >
          <label for="my-modal" class="btn rounded-xl bg-red-700" @click="$emit('destroyItem')">
            Borrar
          </label>
        </div>
      </div>
    </div>
  </Teleport>
  <!-- /Delete Modal -->
</template>
