import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'
import type { IContratos } from './contratos'
import type { ITitulo } from './titulos'
import type { IPosgrado } from './posgrados'
import type { ISaber } from './saberes'
export type Profesor = {
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

export interface IProfesor extends Profesor, Record {
  expand: {
    contrato_id: IContratos
    titulo_id: ITitulo
    posgrado_id: IPosgrado
    saberes: Array<ISaber>
  }
}

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
  if (!record.expand.contrato_id.nombre.toString().endsWith('horas')) {
    record.expand.contrato_id.nombre = `${record.expand.contrato_id.nombre} - ${record.expand.contrato_id.horas} horas`
  }
  if (
    record.expand.titulo_id &&
    !record.expand.titulo_id.nombre.toString().startsWith('Ing') &&
    !record.expand.titulo_id.nombre.toString().startsWith('Tec') &&
    !record.expand.titulo_id.nombre.toString().startsWith('Lic')
  ) {
    record.expand.titulo_id.nombre = `${record.expand.titulo_id.grado} en ${record.expand.titulo_id.nombre}`
  }
  if (
    record.expand.posgrado_id &&
    !record.expand.posgrado_id.nombre.toString().startsWith('Maes') &&
    !record.expand.posgrado_id.nombre.toString().startsWith('Mag') &&
    !record.expand.posgrado_id.nombre.toString().startsWith('Doc')
  ) {
    record.expand.posgrado_id.nombre = `${record.expand.posgrado_id.grado} en ${record.expand.posgrado_id.nombre}`
  }
  return record
}

export const useProfesorStore = createCrudStore<Profesor, IProfesor>({
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
