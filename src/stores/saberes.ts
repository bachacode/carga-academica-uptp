import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
import type { MensajesDeAlerta } from './factory'
import type { IProfesor } from './profesores'

export type Saber = {
  nombre: string
  trayecto: number | string
  horas: number | string
}

export interface ISaber extends Saber, Record {
  expand: {
    profesores: Array<IProfesor>
  }
}

const successMessages: MensajesDeAlerta = {
  create: 'El saber se ha guardado correctamente',
  update: 'El saber se ha actualizado correctamente',
  delete: 'El saber se ha borrado correctamente'
}

const errorMessages: MensajesDeAlerta = {
  create: 'Ha ocurrido un error al crear el saber',
  update: 'Ha ocurrido un error al actualizar el saber',
  delete: 'Ha ocurrido un error al borrar el saber'
}

const appendWords = (record: ISaber) => {
  if (record.trayecto == 0) {
    record.trayecto = `Inicial (PIU)`
  } else if (!record.trayecto.toString().startsWith('Trayecto')) {
    record.trayecto = `Trayecto ${record.trayecto}`
  }
  if (!record.horas.toString().endsWith('horas')) {
    record.horas = `${record.horas} horas`
  }
  return record
}

export const useSaberStore = createCrudStore<Saber, ISaber>({
  storeId: 'saber',
  route: 'saberes',
  collectionName: 'saberes',
  success: successMessages,
  error: errorMessages,
  mapData: appendWords,
  relations: ['profesores'],
  manyToMany: ['profesores'],
  autoFetch: false
})
