import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'

export type seccionType = {
  codigo: string
  trayecto: string
  estudiantes: string
}

export interface ISeccion extends seccionType, Record {
  id: string
  created: string
  updated: string
}

export type uniqueKeysType = {
  codigo: string
}

const successMessages = {
  create: 'La sección se ha guardado correctamente',
  update: 'La sección se ha actualizado correctamente',
  delete: 'La sección se ha borrado correctamente'
}

const errorMessages = {
  create: 'Ha ocurrido un error al crear la sección',
  update: 'Ha ocurrido un error al actualizar la sección',
  delete: 'Ha ocurrido un error al borrar la sección'
}

export const useSeccionStore = createCrudStore<seccionType, ISeccion, uniqueKeysType>(
  'seccion',
  '/secciones',
  'secciones',
  successMessages,
  errorMessages,
  'codigo'
)
