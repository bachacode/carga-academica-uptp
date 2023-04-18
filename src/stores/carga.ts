import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'

export type cargaType = {
  nombre: string
  apellido: string
  cedula: string
  titulo: string
  saberes: Array<string>
  telefono: string
  correo: string
}

export interface ICarga extends cargaType, Record {
  id: string
  created: string
  updated: string
}

const successMessages = {
  create: 'El profesor se ha guardado correctamente',
  update: 'El profesor se ha actualizado correctamente',
  delete: 'El profesor se ha borrado correctamente'
}

const errorMessages = {
  create: 'Ha ocurrido un error al crear el profesor',
  update: 'Ha ocurrido un error al actualizar el profesor',
  delete: 'Ha ocurrido un error al borrar el profesor'
}

export const useCargaStore = createCrudStore<cargaType, ICarga>({
  storeId: 'carga',
  route: '/carga',
  collectionName: 'carga',
  success: successMessages,
  error: errorMessages,
  relations: ['saberes'],
  autoFetch: false
})
