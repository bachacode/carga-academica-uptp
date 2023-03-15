import { ref } from "vue"
import { helpers, required, minValue, maxValue, numeric, maxLength, minLength } from "@vuelidate/validators"

const errorMessages = ref({
  required: 'Este campo es obligatorio',
  numeric: 'El valor de este campo tiene que ser numerico',
  minValue: (min: number) => `El valor de este campo es de minimo ${min}`,
  maxValue: (max: number) => `El valor de este campo es de maximo ${max}`,
  minLength: (min: number) => `Este campo tiene un minimo de ${min} caracteres`,
  maxLength: (max: number) => `Este campo tiene un limite de maximo ${max} caracteres`,
})

export const requiredValidation = () => {
  return helpers.withMessage(errorMessages.value.required, required);
}

export const numericValidation = () => {
  return helpers.withMessage(errorMessages.value.numeric, numeric);
}

export const minValueValidation = (min: number = 1) => {
  return helpers.withMessage(errorMessages.value.minValue(min), minValue(min));
}

export const maxValueValidation = (max: number) => {
  return helpers.withMessage(errorMessages.value.maxValue(max), maxValue(max));
}
