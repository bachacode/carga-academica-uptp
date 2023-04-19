import type { dataType } from '@/types/moduleDataType'
import { reactive } from 'vue'
import { computed } from 'vue'
import {
  requiredValidation,
  numericValidation
} from '@/helpers/validationHelpers'
import type { relationsType } from '@/components/MultiSelect.vue'
export const data: dataType<any> = {
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
      isAsc: false
    },
    {
      name: 'Saberes',
      relationTitle: 'Saberes del profesor ',
      noRelations: '¡Este profesor no tiene saberes asignados!',
      fatherName: 'nombre',
      multipleData: [
        {
          name: 'codigo'
        },
        {
          name: 'materia'
        }
      ]
    }
  ],
  formData: reactive<any>({
    id_seccion: '',
    id_profesor: '',
    id_saber: '',
    dia: '',
    horas: ''
  }),
  formRules: computed(() => {
    return {
      id_seccion: {
        required: requiredValidation(),
      },
      id_profesor: {
        required: requiredValidation(),
      },
      id_saber: {
        required: requiredValidation(),
      },
      dia: {
        required: requiredValidation(),
      },
      horas: {
        required: requiredValidation(),
        numeric: numericValidation(),
      },
    }
  }),
  relations: reactive<relationsType>({
    table: 'saberes',
    stored: [],
    removed: []
  })
}

export const daySelector = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'all']
