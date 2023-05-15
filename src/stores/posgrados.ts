import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
import type { alertMessages } from './factory'

export type posgradoType = {
  grado: string
  nombre: string
}

export interface IPosgrado extends posgradoType, Record {}

const successMessages: alertMessages = {
  create: 'El posgrado se ha guardado correctamente',
  update: 'El posgrado se ha actualizado correctamente',
  delete: 'El posgrado se ha borrado correctamente'
}

const errorMessages: alertMessages = {
  create: 'Ha ocurrido un error al crear el posgrado',
  update: 'Ha ocurrido un error al actualizar el posgrado',
  delete: 'Ha ocurrido un error al borrar el posgrado'
}

export const usePosgradoStore = createCrudStore<posgradoType, IPosgrado>({
  storeId: 'posgrados',
  route: 'posgrados',
  collectionName: 'posgrados',
  success: successMessages,
  error: errorMessages
})
