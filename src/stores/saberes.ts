import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
import type { alertMessages } from './factory'

export type saberType = {
  materia: string
  trayecto: number | null
}

export interface ISaber extends saberType, Record {
  id: string
  created: string
  updated: string
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

const appendWords = (record: any) => {
  if (!record.trayecto.toString().startsWith('Trayecto'))
    record.trayecto = `Trayecto ${record.trayecto}`
  return record
}

export const useSaberStore = createCrudStore<saberType, ISaber>({
  storeId: 'saber',
  route: 'saberes',
  collectionName: 'saberes',
  success: successMessages,
  error: errorMessages,
  mapData: appendWords,
  relations: ['profesores'],
  manyToMany: ['profesores']
})
