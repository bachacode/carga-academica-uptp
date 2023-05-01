import { ref } from 'vue'
import {
  helpers,
  required,
  minValue,
  maxValue,
  numeric,
  maxLength,
  minLength,
  email,
  sameAs
} from '@vuelidate/validators'

type uniqueStoreType = {
  uniqueKeysList: any
  singleData: any
}
// Validación Unica
export const isUnique = (store: uniqueStoreType, key: any) => (value: never) => {
  return (
    !store.uniqueKeysList[key].includes(value) ||
    (store.singleData && store.singleData[key] == value)
  )
}
const errorMessages = ref({
  required: 'Este campo es obligatorio',
  numeric: 'El valor de este campo tiene que ser numerico',
  email: 'El valor de este campo tiene que ser un correo',
  minValue: (min: number) => `El valor de este campo es de minimo ${min}`,
  maxValue: (max: number) => `El valor de este campo es de maximo ${max}`,
  minLength: (min: number) => `Este campo tiene un minimo de ${min} caracteres`,
  maxLength: (max: number) => `Este campo tiene un limite de maximo ${max} caracteres`,
  unique: (value: string, table: string) => `Este ${value} ya existe en el módulo ${table}`,
  password: () => `Las contraseña no coinciden`
})

export const requiredValidation = () => {
  return helpers.withMessage(errorMessages.value.required, required)
}

export const numericValidation = () => {
  return helpers.withMessage(errorMessages.value.numeric, numeric)
}

export const emailValidation = () => {
  return helpers.withMessage(errorMessages.value.email, email)
}

export const minValueValidation = (min: number = 1) => {
  return helpers.withMessage(errorMessages.value.minValue(min), minValue(min))
}

export const maxValueValidation = (max: number) => {
  return helpers.withMessage(errorMessages.value.maxValue(max), maxValue(max))
}

export const minLengthValidation = (min: number = 1) => {
  return helpers.withMessage(errorMessages.value.minLength(min), minLength(min))
}

export const maxLengthValidation = (max: number) => {
  return helpers.withMessage(errorMessages.value.maxLength(max), maxLength(max))
}

export const uniqueValidation = (value: string, table: string, unique: any, formInput: any) => {
  return helpers.withMessage(
    errorMessages.value.unique(value, table),
    helpers.withAsync(unique, () => formInput)
  )
}

export const passwordValidation = (value: string) => {
  return helpers.withMessage(errorMessages.value.password, sameAs(value))
}
