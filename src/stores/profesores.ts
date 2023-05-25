import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
export type profesorType = {
  nombre: string
  apellido: string
  cedula: string
  titulo_id: string
  saberes: Array<string>
  contrato_id: string
  posgrado_id: string | null
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
  //@ts-ignore
  if (!record.expand.contrato_id.nombre.toString().endsWith('horas')) {
    //@ts-ignore
    record.expand.contrato_id.nombre = `${record.expand.contrato_id.nombre} - ${record.expand.contrato_id.horas} horas`
  }
  if (
    record.expand.titulo_id &&
    //@ts-ignore
    !record.expand.titulo_id.nombre.toString().startsWith('Ing') &&
    //@ts-ignore
    !record.expand.titulo_id.nombre.toString().startsWith('Tec') &&
    //@ts-ignore
    !record.expand.titulo_id.nombre.toString().startsWith('Lic')
  ) {
    //@ts-ignore
    record.expand.titulo_id.nombre = `${record.expand.titulo_id.grado} en ${record.expand.titulo_id.nombre}`
  }
  if (
    record.expand.posgrado_id &&
    //@ts-ignore
    !record.expand.posgrado_id.nombre.toString().startsWith('Maes') &&
    //@ts-ignore
    !record.expand.posgrado_id.nombre.toString().startsWith('Mag') &&
    //@ts-ignore
    !record.expand.posgrado_id.nombre.toString().startsWith('Doc')
  ) {
    //@ts-ignore
    record.expand.posgrado_id.nombre = `${record.expand.posgrado_id.grado} en ${record.expand.posgrado_id.nombre}`
  }
  return record
}

export const useProfesorStore = createCrudStore<profesorType, IProfesor>({
  storeId: 'profesor',
  route: 'profesores',
  collectionName: 'profesores',
  success: successMessages,
  error: errorMessages,
  relations: ['saberes', 'titulo_id', 'contrato_id', 'posgrado_id'],
  manyToMany: ['saberes'],
  uniqueKeys: ['correo', 'cedula'],
  mapData: appendWords
})
