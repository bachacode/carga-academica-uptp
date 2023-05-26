import type { Record } from 'pocketbase'
import { createViewStore } from './factory'

export type claseType = {
  nombre: string
  apellido: string
  cedula: string
  horas: string
  dia: string
  saber: string
  seccion: string
}

export interface IClase extends claseType, Record {}

const appendWords = (record: IClase) => {
  //@ts-ignore
  if (!record.horas.toString().endsWith('horas')) {
    record.horas = `${record.horas} horas`
  }
  if (!record.seccion.toString().startsWith('Sección')) {
    record.seccion = `Sección "${record.seccion}"`
  }
  return record
}

export const useClaseStore = createViewStore<IClase>({
  storeId: 'clases',
  collectionName: 'carga_profesores',
  relations: ['saberes'],
  autoFetch: false,
  mapData: appendWords
})
