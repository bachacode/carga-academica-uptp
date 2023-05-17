import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
import { contratos } from '@/assets/contratos'
export type profesorType = {
  nombre: string
  apellido: string
  cedula: string
  titulo_id: string
  saberes: Array<string>
  contrato_id: number | string
  telefono: string
  correo: string
}

export interface IProfesor extends profesorType, Record {}

const successMessages = {
  create: 'El profesor se ha guardado correctamente',
  update: 'El profesor se ha actualizado correctamente',
  delete: 'El profesor se ha borrado correctamente'
}

const errorMessages = {
  create: 'Ha ocurrido un error al crear el profesor',
  update: 'Ha ocurrido un error al actualizar el profesor',
  delete: 'Ha ocurrido un error al borrar el profesor'
}

const appendWords = (record: IProfesor) => {
  if (record.contrato_id == 0) {
    record.contrato_id = `${contratos[0].nom_contrato} - ${contratos[0].horas} horas`
  } else if (record.contrato_id == 1) {
    record.contrato_id = `${contratos[1].nom_contrato} - ${contratos[1].horas} horas`
  } else if (record.contrato_id == 2) {
    record.contrato_id = `${contratos[2].nom_contrato} - ${contratos[2].horas} horas`
  }
  return record
}

export const useProfesorStore = createCrudStore<profesorType, IProfesor>({
  storeId: 'profesor',
  route: 'profesores',
  collectionName: 'profesores',
  success: successMessages,
  error: errorMessages,
  relations: ['saberes', 'titulo_id'],
  manyToMany: ['saberes'],
  mapData: appendWords
})
