import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'

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

const successMessages = {
  create: 'El saber se ha guardado correctamente',
  update: 'El saber se ha actualizado correctamente',
  delete: 'El saber se ha borrado correctamente'
}

const errorMessages = {
  create: 'Ha ocurrido un error al crear el saber',
  update: 'Ha ocurrido un error al actualizar el saber',
  delete: 'Ha ocurrido un error al borrar el saber'
}

export const useSaberStore = createCrudStore<saberType, ISaber>(
  'saber',
  '/saberes',
  'saberes',
  successMessages,
  errorMessages
)