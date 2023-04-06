import type { registerUserType } from '@/stores/usuarios'
import type { dataType } from '@/types/moduleDataType'
import { reactive } from 'vue'
import { computed } from 'vue'
import {
  requiredValidation,
  minLengthValidation,
  maxLengthValidation,
  emailValidation,
  passwordValidation
} from '@/helpers/validationHelpers'
import { helpers } from '@vuelidate/validators'
// Unique Validations
const isUsernameTaken = (value: string) => !data.store.uniqueKeysList?.username.includes(value)
const isEmailTaken = (value: string) => !data.store.uniqueKeysList?.email.includes(value)
const isCedulaTaken = (value: string) => !data.store.uniqueKeysList?.cedula.includes(value)
const usernameIsUnique = helpers.withAsync(isUsernameTaken, () => data.formData.username)
const emailIsUnique = helpers.withAsync(isEmailTaken, () => data.formData.email)
const cedulaIsUnique = helpers.withAsync(isCedulaTaken, () => data.formData.cedula)

export const data: dataType<registerUserType> = {
  store: '',
  columns: [
    {
      name: 'username',
      nameAlias: 'Usuario',
      isAsc: false
    },
    {
      name: 'email',
      nameAlias: 'Correo',
      isAsc: false
    },
    {
      name: 'name',
      nameAlias: 'Nombre',
      isAsc: false
    },
    {
      name: 'Status',
      nameAlias: 'Estado',
      isToggable: true
    },
    {
      name: 'Apellido',
      isAsc: false
    },
    {
      name: 'Cedula',
      isAsc: false
    }
  ],
  formData: reactive<registerUserType>({
    username: '',
    email: '',
    emailVisibility: true,
    password: '',
    passwordConfirm: '',
    name: '',
    apellido: '',
    cedula: '',
    telefono: '',
    cargo: '',
    rol: 'Operador',
    status: true
  }),
  formRules: computed(() => {
    return {
      username: {
        required: requiredValidation(),
        minLength: minLengthValidation(),
        unique: helpers.withMessage(
          '¡Ya existe un usuario con ese nombre registrado!',
          usernameIsUnique
        )
      },
      password: {
        required: requiredValidation(),
        minLength: minLengthValidation(8)
      },
      passwordConfirm: {
        required: requiredValidation(),
        minLength: minLengthValidation(8),
        password: passwordValidation(data.formData.password)
      },
      email: {
        required: requiredValidation(),
        email: emailValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(40),
        unique: helpers.withMessage(
          '¡Ya existe un usuario con ese correo registrado!',
          emailIsUnique
        )
      },
      name: {
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
        maxLength: maxLengthValidation(40),
        unique: helpers.withMessage(
          '¡Ya existe un usuario con esa cedula registrada!',
          cedulaIsUnique
        )
      },
      telefono: {
        required: requiredValidation(),
        minLength: minLengthValidation(),
        maxLength: maxLengthValidation(40)
      },
      cargo: {
        required: requiredValidation()
      },
      rol: {
        required: requiredValidation()
      }
    }
  })
}
