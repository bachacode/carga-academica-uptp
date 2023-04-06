import type { seccionType } from '@/stores/secciones'
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
export const data: dataType<seccionType> = {
  store: '',
  columns: [
    {
      name: 'Codigo',
      isAsc: false
    },
    {
      name: 'Trayecto',
      isAsc: false
    },
    {
      name: 'Estudiantes',
      isAsc: false
    }
  ],
  formData: reactive<seccionType>({
    codigo: '',
    trayecto: '',
    estudiantes: ''
  }),
  formRules: computed(() => {
    return {
      codigo: {
        lazy: true,
        required: requiredValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(4),
        unique: helpers.withMessage('Ya existe una sección con ese codigo', isUnique)
      },
      trayecto: {
        required: requiredValidation(),
        numeric: numericValidation(),
        minValue: minValueValidation(),
        maxValue: maxValueValidation(4)
      },
      estudiantes: {
        required: requiredValidation(),
        numeric: numericValidation(),
        minValue: minValueValidation(),
        maxValue: maxValueValidation(99)
      }
    }
  })
}
