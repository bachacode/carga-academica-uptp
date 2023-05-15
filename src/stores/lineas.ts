import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
import type { alertMessages } from './factory'

export type lineaType = {
  grado: string
  nombre: string
}

export interface ILinea extends lineaType, Record {}

const successMessages: alertMessages = {
  create: 'La línea de investigación se ha guardado correctamente',
  update: 'La línea de investigación se ha actualizado correctamente',
  delete: 'La línea de investigación se ha borrado correctamente'
}

const errorMessages: alertMessages = {
  create: 'Ha ocurrido un error al crear La línea de investigación',
  update: 'Ha ocurrido un error al actualizar La línea de investigación',
  delete: 'Ha ocurrido un error al borrar La línea de investigación'
}

export const useLineaStore = createCrudStore<lineaType, ILinea>({
  storeId: 'lineas_de_investigacion',
  route: 'lineas',
  collectionName: 'lineas_de_investigacion',
  success: successMessages,
  error: errorMessages
})
