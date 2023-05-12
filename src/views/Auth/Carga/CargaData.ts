import { reactive } from 'vue'
import { computed } from 'vue'
import { requiredValidation, numericValidation } from '@/helpers/validationHelpers'
import type { claseType } from '@/stores/clases'

export const data = {
  columns: [
    {
      name: 'Nombre',
      isAsc: false
    },
    {
      name: 'Apellido',
      isAsc: false
    },
    {
      name: 'Titulo',
      isAsc: false
    },
    {
      name: 'Horas',
      nameAlias: 'Horas Totales',
      isAsc: false
    },
    {
      name: 'Materia',
      isAsc: false
    }
  ],
  formData: reactive<claseType>({
    id_seccion: '',
    id_profesor: '',
    id_saber: '',
    dia: '',
    horas: ''
  }),
  formRules: computed(() => {
    return {
      id_seccion: {
        required: requiredValidation()
      },
      id_profesor: {
        required: requiredValidation()
      },
      id_saber: {
        required: requiredValidation()
      },
      dia: {
        required: requiredValidation()
      },
      horas: {
        required: requiredValidation(),
        numeric: numericValidation()
      }
    }
  })
}

export const daySelector = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'all']
