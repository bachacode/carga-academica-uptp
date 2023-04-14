import type { saberType } from '@/stores/saberes'
import type { dataType } from '@/types/moduleDataType'
import { reactive } from 'vue'
import { computed } from 'vue'
import {
  requiredValidation,
  minLengthValidation,
  maxLengthValidation,
  numericValidation,
  minValueValidation,
  maxValueValidation
} from '@/helpers/validationHelpers'
import { helpers } from '@vuelidate/validators'
const isCodigoTaken = (value: never) =>
  !data.store.uniqueKeysList['codigo'].includes(value) ||
  data.store.singleData['codigo'] == value ||
  !data.store.singleData
const isUnique = helpers.withAsync(isCodigoTaken, () => data.formData.codigo)
export const data: dataType<saberType> = {
  store: '',
  columns: [
    {
      name: 'Codigo',
      isAsc: false
    },
    {
      name: 'Materia',
      isAsc: false
    },
    {
      name: 'Trayecto',
      isAsc: false
    },
    {
      name: 'Profesores',
      relationTitle: 'Profesores que dan ',
      noRelations: '¡Esta materia no tiene profesores asignados!',
      fatherName: 'materia',
      multipleData: [
        {
          name: 'Nombre'
        },
        {
          name: 'Apellido'
        },
        {
          name: 'Cedula'
        },
        {
          name: 'Telefono'
        },
      ]
    },
    {
      name: 'Periodo',
      isAsc: false
    },
    {
      name: 'Creditos',
      isAsc: false
    }
  ],
  formData: reactive<saberType>({
    codigo: '',
    materia: '',
    trayecto: null,
    periodo: null,
    creditos: null
  }),
  formRules: computed(() => {
    return {
      codigo: {
        required: requiredValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(40),
        unique: helpers.withMessage('Ya existe un saber con ese codigo', isUnique)
      },
      materia: {
        required: requiredValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(80)
      },
      trayecto: {
        required: requiredValidation(),
        numeric: numericValidation(),
        minValue: minValueValidation(),
        maxValue: maxValueValidation(4)
      },
      periodo: {
        required: requiredValidation(),
        numeric: numericValidation(),
        minValue: minValueValidation(),
        maxValue: maxValueValidation(3)
      },
      creditos: {
        required: requiredValidation(),
        numeric: numericValidation(),
        minValue: minValueValidation(),
        maxValue: maxValueValidation(99)
      }
    }
  })
}
