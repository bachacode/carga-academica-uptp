import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
import type { MensajesDeAlerta } from './factory'

export type Titulo = {
  grado: string
  nombre: string
}

export interface ITitulo extends Titulo, Record {}

const successMessages: MensajesDeAlerta = {
  create: 'El titulo se ha guardado correctamente',
  update: 'El titulo se ha actualizado correctamente',
  delete: 'El titulo se ha borrado correctamente'
}

const errorMessages: MensajesDeAlerta = {
  create: 'Ha ocurrido un error al crear el titulo',
  update: 'Ha ocurrido un error al actualizar el titulo',
  delete: 'Ha ocurrido un error al borrar el titulo'
}

export const useTituloStore = createCrudStore<Titulo, ITitulo>({
  storeId: 'titulos',
  route: 'pregrados',
  collectionName: 'titulos',
  success: successMessages,
  error: errorMessages
})
