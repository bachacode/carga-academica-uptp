import type { Record } from 'pocketbase'
import { createViewStore } from './factory'
import { formatDate } from '@vueuse/core'

export type Historial = {
  username: string
  nombre: string
  apellido: string
  tabla: string
  accion: string
}

export interface IHistorial extends Historial, Record {}

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
  let date = new Date(Date.parse(record.created))
  record.created = formatDate(date, 'hh:mm A DD-MM-YYYY')
  return record
}

export const useHistorialStore = createViewStore<IHistorial>({
  storeId: 'historial',
  collectionName: 'historial_ver',
  mapData: appendWords
})
