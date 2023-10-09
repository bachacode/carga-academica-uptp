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
type Store = {
  uniqueKeysList: any
}
// Validación Unica
export const isUnique = (store: Store, key: any, currentValue?: any) => (value: never) => {
  if (!currentValue) {
    return !store.uniqueKeysList[key].includes(value)
  } else return !store.uniqueKeysList[key].includes(value) || currentValue[key] == value
}

const password = helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/)

export const idMatches = (trayecto: string) => (value: string) => {
  const regex = new RegExp(`/^i${trayecto}/`)
  return false;
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
  sameAs: () => `Las contraseña no coinciden`,
  password: () => `La contraseña debe tener al menos una letra y un numero`,
  seccionId: () => `El ID de la sección no coincide con el trayecto`
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

export const sameAsValidation = (value: string) => {
  return helpers.withMessage(errorMessages.value.sameAs, sameAs(value))
}

export const passwordValidation = () => {
  return helpers.withMessage(errorMessages.value.password, password)
}

export const seccionIdValidation = (trayecto: string, validator: any, formInput: string) => {
  return helpers.withMessage(
    errorMessages.value.seccionId,
    helpers.withAsync(validator, () => formInput)
  )
}
