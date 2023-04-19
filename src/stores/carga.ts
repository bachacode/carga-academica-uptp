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
  create: 'Se ha asignado la carga al profesor correctamente',
  update: 'Se ha actualizado la carga del profesor correctamente',
  delete: 'Se ha borrado la carga del profesor correctamente'
}

const errorMessages = {
  create: 'Ha ocurrido un error al asignarle la carga al profesor',
  update: 'Ha ocurrido un error al actualizar la carga del profesor',
  delete: 'Ha ocurrido un error al borrar la carga del profesor'
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
