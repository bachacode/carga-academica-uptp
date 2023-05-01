import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'

export type profesorType = {
  nombre: string
  apellido: string
  cedula: string
  titulo_id: string
  saberes: Array<string>
  id_contrato: string
  telefono: string
  correo: string
}

export interface IProfesor extends profesorType, Record {
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

export const useProfesorStore = createCrudStore<profesorType, IProfesor>({
  storeId: 'profesor',
  route: 'profesores',
  collectionName: 'profesores',
  success: successMessages,
  error: errorMessages,
  relations: ['saberes', 'titulo_id', 'id_contrato'],
  manyToMany: ['saberes']
})
