<script setup lang="ts">
import AuthLayout from '../AuthLayout.vue'
import InputField from '@/components/InputField.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import { useTituloStore, type tituloType } from '@/stores/titulos'
import router from '@/router'
import { useVuelidate } from '@vuelidate/core'
import InputError from '@/components/InputError.vue'
import InputComponent from '@/components/InputComponent.vue'
import FormComponent from '@/components/Containers/FormComponent.vue'
import { maxLengthValidation, requiredValidation } from '@/helpers/validationHelpers'
// Store del módulo
const store = useTituloStore()

// Booleano para el botón de submit
const isLoading = ref(false)

// Id del item a editar
const id = ref()

// Variables reactivas del formulario
const formData = reactive<tituloType>({
  grado: '',
  nombre: ''
})

// Reglas de validación
const formRules = computed(() => {
  return {
    grado: {
      required: requiredValidation(),
      maxLength: maxLengthValidation(80)
    },
    nombre: {
      required: requiredValidation(),
      maxLength: maxLengthValidation(80)
    }
  }
})

// Objeto de validaciáon
const v$ = useVuelidate(formRules, formData)

// Función para enviar el formulario
const submitData = async () => {
  await v$.value.$validate()
  if (!v$.value.$error) {
    isLoading.value = true
    await store.update(id.value, formData)
    isLoading.value = false
  }
}

// Al inicializar el componente, asigna el id de la ruta a una variable reactiva de vue
onMounted(async () => {
  if (!(router.currentRoute.value.params.id instanceof Array)) {
    id.value = router.currentRoute.value.params.id
    await store.fetchOne(router.currentRoute.value.params.id)
    if (store.singleData) {
      Object.assign(formData, store.singleData)
    }
  }
})
</script>

<template>
  <AuthLayout>
    <FormComponent submit-text="Registrar titulo" @form-submit="submitData" :is-loading="isLoading">
      <template #inputs>
        <!-- Grado -->
        <InputField label="Grado del titulo" name="grado">
          <template #InputField
            ><InputComponent name="grado" v-model="formData.grado"
          /></template>
          <template #InputError
            ><InputError v-if="v$.grado.$error" :message="v$.grado.$errors[0]?.$message"
          /></template>
        </InputField>

        <!-- Titulo -->
        <InputField label="Nombre del titulo" name="nombre">
          <template #InputField
            ><InputComponent name="nombre" v-model="formData.nombre"
          /></template>
          <template #InputError
            ><InputError v-if="v$.nombre.$error" :message="v$.nombre.$errors[0]?.$message"
          /></template>
        </InputField>
      </template>
    </FormComponent>
  </AuthLayout>
</template>
