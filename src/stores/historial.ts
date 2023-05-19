import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type historialType = {
  username: string
  nombre: string
  apellido: string
  tabla: string
  accion: string
}

export interface IHistorial extends historialType, Record {}

const appendWords = (record: IHistorial) => {
  // Mapear acciones a una frase
  if (record.accion == 'create') {
    record.accion = `Se creó un elemento`
  } else if (record.accion == 'update') {
    record.accion = `Se editó un elemento`
  } else if (record.accion == 'delete') {
    record.accion = `Se eliminó un elemento`
  }

  // Formato de fecha
  return record
}

export const useHistorialStore = createViewStore<IHistorial>({
  storeId: 'historial',
  collectionName: 'historial_ver',
  mapData: appendWords
})
