import type { Record } from 'pocketbase'
import { createCrudStore } from './factory'

export type usuarioType = {
  username: string
  email: string
  name: string
  apellido: string
  cedula: string
  telefono: string
  cargo: string
  rol: 'Administrador' | 'Operador' | '' 
  status: boolean
}

export interface IUsuario extends usuarioType, Record {
  id: string
  created: string
  updated: string
}

export type uniqueKeysType = {
  username: Array<string>
  email: Array<string>
  cedula: Array<string>

}

const successMessages = {
  create: 'El usuario se ha creado correctamente',
  update: 'El usuario se ha actualizado correctamente',
  delete: 'El usuario se ha borrado correctamente'
}

const errorMessages = {
  create: 'Ha ocurrido un error al crear el usuario',
  update: 'Ha ocurrido un error al actualizar el usuario',
  delete: 'Ha ocurrido un error al borrar el usuario'
}

export const useUsuarioStore = createCrudStore<usuarioType, IUsuario, uniqueKeysType>({
  storeId: 'usuario',
  route: '/usuarios',
  collectionName: 'users',
  success: successMessages,
  error: errorMessages,
  uniqueKeys: ['username', 'email', 'cedula'],
})
