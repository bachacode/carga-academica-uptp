import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
import type { MensajesDeAlerta } from './factory'

export type Posgrado = {
  grado: string
  nombre: string
}

export interface IPosgrado extends Posgrado, Record {}

const successMessages: MensajesDeAlerta = {
  create: 'El posgrado se ha guardado correctamente',
  update: 'El posgrado se ha actualizado correctamente',
  delete: 'El posgrado se ha borrado correctamente'
}

const errorMessages: MensajesDeAlerta = {
  create: 'Ha ocurrido un error al crear el posgrado',
  update: 'Ha ocurrido un error al actualizar el posgrado',
  delete: 'Ha ocurrido un error al borrar el posgrado'
}

export const usePosgradoStore = createCrudStore<Posgrado, IPosgrado>({
  storeId: 'posgrados',
  route: 'posgrados',
  collectionName: 'posgrados',
  success: successMessages,
  error: errorMessages
})
