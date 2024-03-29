<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import type { OnClickOutsideHandler } from '@vueuse/core'

export type optionType = {
  name: string
  value: string
  isActive: boolean
}

export type relationsType = {
  table: string
  stored: Array<string>
  removed: Array<string>
}

interface Props {
  name: string
  selectedOptions: Array<string> | undefined | null
  modelRelations?: relationsType
  tags?: optionType[]
}
defineProps<Props>()
defineEmits(['removeTag'])

const dropdown = ref(false)

const dropdownHandler: OnClickOutsideHandler = () => {
  dropdown.value = false
}

const toggle = () => {
  dropdown.value = !dropdown.value
}

const toggleTag = (tag: optionType, selectedOptions: any, modelRelations?: relationsType) => {
  tag.isActive = !tag.isActive
  if (tag.isActive) {
    selectedOptions.push(tag.value)
  } else if (!tag.isActive) {
    selectedOptions.splice(selectedOptions.indexOf(tag.value), 1)
  }
  if (modelRelations) {
    if (modelRelations.stored.includes(tag.value) && !tag.isActive) {
      modelRelations.removed.push(tag.value)
    } else if (modelRelations.stored.includes(tag.value) && tag.isActive) {
      modelRelations.removed.splice(modelRelations.removed.indexOf(tag.value), 1)
    }
  }
}
</script>

<template>
  <div>
    <!-- Search Bar -->
    <!-- <input 
          type="hidden" 
          :value="modelValue"
          @input="updateValue"
          :name="name"
          > -->
    <div class="relative">
      <input :id="name" @click.stop="toggle" type="checkbox" class="modal-toggle" />
      <div
        @click.stop="toggle"
        class="flex min-h-[42px] w-full cursor-pointer items-center rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-indigo-900 shadow-sm focus:border-gray-500 focus:ring-gray-500"
      ></div>
      <div
        @click.stop="toggle"
        class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2"
      >
        <font-awesome-icon v-if="!dropdown" icon="chevron-down" class="text-indigo-500" />
        <font-awesome-icon v-else icon="chevron-up" class="text-indigo-500" />
      </div>
      <div
        id="tags"
        @click.stop="toggle"
        class="absolute inset-y-2 left-0 flex h-auto cursor-pointer space-x-2.5 pl-2"
      >
        {{
          `${
            selectedOptions
              ? `${selectedOptions.length} ${name} seleccionadas`
              : 'Seleccione una opción'
          }`
        }}
      </div>
    </div>
    <div
      v-show="dropdown"
      v-on-click-outside.bubble="dropdownHandler"
      class="block max-h-60 w-full overflow-auto rounded-b-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 shadow-sm focus:border-gray-500 focus:ring-gray-500"
    >
      <ul class="relative" v-for="tag in tags" :key="tag.value">
        <li
          :class="`${
            !tag.isActive ? 'hover:bg-green-300' : 'hover:bg-red-300'
          } cursor-pointer rounded-md py-1 px-2`"
          @click.stop="toggleTag(tag, selectedOptions, modelRelations)"
        >
          <span>{{ tag.name }}</span>
          <font-awesome-icon
            icon="check"
            v-if="tag.isActive"
            class="absolute inset-y-2 right-0 pr-1"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
