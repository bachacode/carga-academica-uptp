import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'

export type Seccion = {
  codigo: string
  trayecto: string
  estudiantes: string
}

export interface ISeccion extends Seccion, Record {}

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

const appendWords = (record: any) => {
  if (!record.trayecto.toString().startsWith('Trayecto'))
    record.trayecto = `Trayecto ${record.trayecto}`
  if (!record.estudiantes.toString().endsWith('estudiantes'))
    record.estudiantes = `${record.estudiantes} estudiantes`
  return record
}

export const useSeccionStore = createCrudStore<Seccion, ISeccion>({
  storeId: 'seccion',
  route: 'secciones',
  collectionName: 'secciones',
  success: successMessages,
  error: errorMessages,
  uniqueKeys: ['codigo'],
  mapData: appendWords
})
