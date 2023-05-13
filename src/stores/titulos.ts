import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
import type { alertMessages } from './factory'

export type tituloType = {
  grado: string
  nombre: string
}

export interface ITitulo extends tituloType, Record {}

const successMessages: alertMessages = {
  create: 'El titulo se ha guardado correctamente',
  update: 'El titulo se ha actualizado correctamente',
  delete: 'El titulo se ha borrado correctamente'
}

const errorMessages: alertMessages = {
  create: 'Ha ocurrido un error al crear el titulo',
  update: 'Ha ocurrido un error al actualizar el titulo',
  delete: 'Ha ocurrido un error al borrar el titulo'
}

export const useTituloStore = createCrudStore<tituloType, ITitulo>({
  storeId: 'titulos',
  route: 'titulos',
  collectionName: 'titulos',
  success: successMessages,
  error: errorMessages
})
