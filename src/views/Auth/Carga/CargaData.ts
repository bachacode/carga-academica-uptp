import type { profesorType } from '@/stores/profesores'
import type { dataType } from '@/types/moduleDataType'
import { reactive, ref } from 'vue'
import { computed } from 'vue'
import {
  requiredValidation,
  emailValidation,
  minLengthValidation,
  maxLengthValidation
} from '@/helpers/validationHelpers'
import type { relationsType } from '@/components/MultiSelect.vue'
export const data: dataType<profesorType> = {
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
  formData: reactive<profesorType>({
    nombre: '',
    apellido: '',
    cedula: '',
    titulo: '',
    saberes: [],
    telefono: '',
    correo: ''
  }),
  formRules: computed(() => {
    return {
      nombre: {
        required: requiredValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(40)
      },
      apellido: {
        required: requiredValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(40)
      },
      cedula: {
        required: requiredValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(40)
      },
      titulo: {
        required: requiredValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(40)
      },
      telefono: {
        required: requiredValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(40)
      },
      correo: {
        required: requiredValidation(),
        email: emailValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(40)
      }
    }
  }),
  relations: reactive<relationsType>({
    table: 'saberes',
    stored: [],
    removed: []
  })
}

export const daySelector = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'all']
