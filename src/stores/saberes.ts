import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
import type { alertMessages } from './factory'

export type saberType = {
  codigo: string
  materia: string
  trayecto: number | null
  periodos: number | null
  creditos: number | null
}

export interface ISaber extends saberType, Record {
  id: string
  created: string
  updated: string
}

export type uniqueKeysType = {
  codigo: Array<string>
}

const successMessages: alertMessages = {
  create: 'El saber se ha guardado correctamente',
  update: 'El saber se ha actualizado correctamente',
  delete: 'El saber se ha borrado correctamente'
}

const errorMessages: alertMessages = {
  create: 'Ha ocurrido un error al crear el saber',
  update: 'Ha ocurrido un error al actualizar el saber',
  delete: 'Ha ocurrido un error al borrar el saber'
}

const appendShit = (record: any) => {
  if (!record.trayecto.toString().startsWith('trayecto'))
    record.trayecto = `trayecto ${record.trayecto}`
  if (!record.periodos.toString().endsWith('periodos'))
    record.periodos = `${record.periodos} periodos`
  if (!record.creditos.toString().endsWith('creditos'))
    record.creditos = `${record.creditos} creditos`
  return record
}

export const useSaberStore = createCrudStore<saberType, ISaber, uniqueKeysType>(
  {
    storeId: 'saber',
    route: '/saberes',
    collectionName: 'saberes',
    success: successMessages,
    error: errorMessages,
    uniqueKeys: ['codigo'],
    mapData: appendShit
  }
)
