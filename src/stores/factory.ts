import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useAlertStore } from './alert'
import { computed, onMounted, ref, watch } from 'vue'
import router from '@/router'
import type { ListResult, Record } from 'pocketbase'
import type { relationsType } from '@/components/MultiSelect.vue'

/*
 * Tipos de alertas necesarias para los módulos
 * @var create, alerta para la función "create" de un CRUD
 * @var update, alerta para la función "update" de un CRUD
 * @var delete, alerta para la función "delete" de un CRUD
 */
export type alertMessages = {
  create: string
  update: string
  delete: string
}

/*
 * Interfaz de parametros de configuración para crear un módulo de solo vista
 * @var storeId, id unico de la pinia store que se quiere crear
 * @var collectionName, nombre de la colección de pocketbase que maneja la store
 * @callback mapData, función que añade palabras a las columnas de los registros, para facilitar su filtrado
 * @var relations, relaciones uno a muchos del módulo
 * @var autoFetch, booleano que dicta si se hace un fetchAll nada mas iniciar el módulo o no
 * @var defaultFetchQuery, objeto con los parametros por defecto de los fetch automaticos del módulo
 */
export interface IViewStoreOptions<IData> {
  storeId: string
  collectionName: string
  mapData?: (value: IData, index: number, array: IData[]) => IData
  relations?: Array<string>
  autoFetch?: boolean
  defaultFetchQuery?: {
    sortBy: string
    filter: string
  }
}

/*
 * Interfaz de parametros de configuración para crear un módulo base/crud
 * @var route, nombre de la ruta del módulo al que pertenece la pinia store
 * @var success, objeto con los mensajes de las alertas "satisfactorias" del módulo
 * @var error, objeto con los mensajes de las alertas "erroneas" del módulo
 * @var uniqueKeys, arreglo con los nombres de las columnas unicas del módulo
 * @var manyToMany, arreglo con los nombres de las llaves foraneas que manejan relaciones "muchos a muchos"
 */
export interface ICrudStoreOptions<IData> extends IViewStoreOptions<IData> {
  route: string
  success: alertMessages
  error: alertMessages
  uniqueKeys?: Array<string>
  manyToMany?: Array<string>
}

/*
 * Esta función utiliza el patrón "Factory" para crear pinia stores customizables que son
 * Utilizadas para guardar los datos de los módulos de manera persistente entre cambios
 * de ruta del sistema.
 */
export function createCrudStore<
  dataType extends {} | undefined,
  IData extends Record & dataType,
  uniqueKeysType = void
>({
  storeId,
  route,
  collectionName,
  success,
  error,
  uniqueKeys = [],
  mapData = (record: IData) => {
    return record
  },
  relations,
  manyToMany,
  autoFetch = true,
  defaultFetchQuery = {
    sortBy: '-created',
    filter: ''
  }
}: ICrudStoreOptions<IData>) {
  return defineStore(storeId, () => {
    // Objeto con las funciones necesarias para interactuar con la API de pocketbase
    const { pb } = useAuthStore()

    // Store para poder utilizar alertas en el sistema
    const alert = useAlertStore()

    // Variable en la que se guarda una lista de items de un módulo a través de "getList"
    const data = ref<ListResult<IData>>()

    // Variable en la que se guarda la lista completa de items de un módulo a través de "getFullList"
    const fullData = ref<IData[]>()

    // Variable que guarda la query de busqueda de una tabla de un módulo
    const searchQuery = ref<string>('')

    // Constante que guarda el nombre de algunas propiedades de un item, para su uso mas abajo
    const defaultRecordKeys = ['collectionId', 'collectionName', 'id', 'expand']

    // Variable que guarda el numero de items por pagina
    const itemsPerPage = ref(20)

    // Variable que guarda la pagina actual en la que se encuentra la tabla del módulo
    const actualPage = ref(1)

    /*
     * Esta función devuelve una lista de items de un módulo y la guarda en la variable "data"
     * @var collectionName el nombre de la colección de pocketbase que se quiere usar
     * @var actualPage la pagina que se quiere obtener
     * @var itemsPerPage cantidad de items que se quiere pedir a la API
     * @param sortBy cambia si el orden es ASC o DESC y por cual columna se ordena, default "-created"
     * @param filter cambia que filtros tiene que cumplir la query, actua como un WHERE en SQL, no default
     * @var expand recibe un string separado por comas con los nombres de las llaves foraneas
     * este lo recibe del parametro de configuración "relations"
     */
    async function fetchAll(
      sortBy: string = defaultFetchQuery.sortBy,
      filter: string = defaultFetchQuery.filter,
      autoCancel: boolean = true
    ) {
      data.value = await pb
        .collection(collectionName)
        .getList<IData>(actualPage.value, itemsPerPage.value, {
          sort: sortBy,
          expand: relations?.toString(),
          filter: filter,
          $autoCancel: autoCancel
        })
    }
    /*
     * Esta función devuelve la lista completa de items de un módulo y la guarda en la variable "fullData"
     * @var collectionName el nombre de la colección de pocketbase que se quiere usar
     * @param sortBy cambia si el orden es ASC o DESC y por cual columna se ordena, default "-created"
     * @param filter cambia que filtros tiene que cumplir la query, actua como un WHERE en SQL, no default
     * @var expand recibe un string separado por comas con los nombres de las llaves foraneas
     * este lo recibe del parametro de configuración "relations"
     */
    async function fetchFullList(
      sortBy: string = defaultFetchQuery.sortBy,
      filter: string = defaultFetchQuery.filter,
      autoCancel: boolean = true
    ) {
      fullData.value = await pb.collection(collectionName).getFullList<IData>({
        sort: sortBy,
        expand: relations?.toString(),
        filter: filter,
        $autoCancel: autoCancel
      })
    }

    /*
     * Observa a la variable actualPage por cambios, si esta variable cambia
     * Realizara un fetchAll con el nuevo numero de pagina que se requiere
     */
    watch(actualPage, async () => {
      await fetchAll()
    })

    /*
     * Esta función devuelve un solo item de un módulo y lo guarda en la variable "singleData"
     * @var collectionName el nombre de la colección de pocketbase que se quiere usar
     * @param id el id unico del item que se quiere obtener
     * @var expand recibe un string separado por comas con los nombres de las llaves foraneas
     * este lo recibe del parametro de configuración "relations"
     */
    async function fetchOne(id: string) {
      return await pb.collection(collectionName).getOne<IData>(id, {
        expand: relations?.toString()
      })
    }

    /*
     * Esta función hace una llamada a la API para guardar un nuevo item en un módulo
     * @var collectionName el nombre de la colección de pocketbase que se quiere usar
     * @param data un objeto con los datos que se quieren guardar en la BD
     * Si la petición se cumple,
     * revisa si el módulo tiene relaciones muchos a muchos,
     * esto es para sincronizar los cambios en ambas tablas,
     * despues vuelve a hacer fetchAll con el nuevo registro,
     * despues te envia a la ruta base del módulo,
     * despues activa la alerta de "success".
     * Si la petición no se cumple,
     * activa la alerta de "error"
     */
    async function save(data: dataType) {
      await pb
        .collection(collectionName)
        .create<IData>(data)
        .then(async (data: IData) => {
          if (manyToMany) {
            await sync(data)
          }
          await saveToLog('create')
          await router.push({ name: route })
          alert.setSuccess({ message: success.create })
        })
        .catch(async () => {
          alert.setError({ message: error.create })
        })
    }

    /*
     * Esta función sincroniza las relaciones de dos items en dos módulos distintos,
     * que tengan una relación de "muchos a muchos".
     * Esto es necesario debido a como funciona SQLite y el backend de Pocketbase.
     * No lastima significativamente el rendimiento de la aplicación debido a que
     * pocketbase utiliza SQLite en WAL mode, lo que optimiza el remndimiento
     * cuando se realizan multiples peticiones a la base de datos
     */
    async function sync(father: IData) {
      manyToMany?.forEach(async (relation: string) => {
        father[relation].forEach(async (childId: string) => {
          const relatedRecord = await pb
            .collection(relation)
            .getOne(childId, { $autoCancel: false })
          if (!relatedRecord[collectionName].includes(father.id)) {
            relatedRecord[collectionName].push(father.id)
            await pb
              .collection(relation)
              .update(childId, relatedRecord, { $autoCancel: false })
              .catch((err) => console.log(err.data))
          }
        })
      })
    }

    async function saveToLog(action: string) {
      await pb
        .collection('historial')
        .create({
          usuario_id: pb.authStore.model?.id,
          tabla: collectionName,
          accion: action
        })
        .then(async () => {
          await pb.collection('historial').getList(1, 20, {
            sort: '-created'
          })
        })
    }

    /*
     * Esta función desincroniza las relaciones de dos items en dos módulos distintos,
     * que tengan una relación de "muchos a muchos".
     * Esto es necesario debido a como funciona SQLite y el backend de Pocketbase.
     * No lastima significativamente el rendimiento de la aplicación debido a que
     * pocketbase utiliza SQLite en WAL mode, lo que optimiza el remndimiento
     * cuando se realizan multiples peticiones a la base de datos
     */
    async function deSync(fatherId: string, relations: relationsType) {
      relations.removed.forEach(async (relation) => {
        const relatedRecord = await pb
          .collection(relations.table)
          .getOne(relation, { $autoCancel: false })
        relatedRecord[collectionName].splice(relatedRecord[collectionName].indexOf(fatherId), 1)
        await pb
          .collection(relations.table)
          .update(relation, relatedRecord, { $autoCancel: false })
          .catch((err) => console.log(err.data))
      })
    }

    /*
     * Esta función hace una llamada a la API para actualizar un item existente en un módulo
     * @var collectionName el nombre de la colección de pocketbase que se quiere usar
     * @param id el id unico del item que se quiere actualizar
     * @param data un objeto con los datos que se quieren actualizar en la BD
     * Si la petición se cumple,
     * revisa si el módulo tiene relaciones muchos a muchos,
     * esto es para sincronizar los cambios en ambas tablas,
     * despues vuelve a hacer fetchAll con el nuevo registro,
     * despues te envia a la ruta base del módulo,
     * despues activa la alerta de "success".
     * Si la petición no se cumple,
     * activa la alerta de "error"
     */
    async function update(id: string, data: dataType | any) {
      await pb
        .collection(collectionName)
        .update<IData>(id, data)
        .then(async (data) => {
          if (manyToMany) {
            await sync(data)
          }
          await saveToLog('update')
          await router.push({ name: route })
          alert.setSuccess({ message: success.update })
        })
        .catch(async () => {
          alert.setError({ message: error.update })
        })
    }

    /*
     * Esta función hace una llamada a la API para eliminar un item existente en un módulo
     * @var collectionName el nombre de la colección de pocketbase que se quiere usar
     * @param id el id unico del item que se quiere actualizar
     * Si la petición se cumple,
     * vuelve a hacer fetchAll para eliminar el item borrado de la interfaz,
     * despues activa la alerta de "success".
     * Si la petición no se cumple,
     * activa la alerta de "error"
     */
    async function destroy(id: string) {
      await pb
        .collection(collectionName)
        .delete(id)
        .then(async () => {
          await saveToLog('delete')
          await fetchAll(defaultFetchQuery.sortBy, defaultFetchQuery.filter, false)
          alert.setSuccess({ message: success.delete })
        })
        .catch(async (err) => {
          if (err.data.code == 400) {
            alert.setError({
              message: '¡Este registro esta relacionado con otro registro en una tabla distinta!'
            })
          } else alert.setError({ message: error.delete })
        })
    }

    async function goToCreate() {
      router.push({ name: `${route}.create` })
    }

    async function goToEdit(id: string) {
      router.push({ name: `${route}.edit`, params: { id } })
    }

    /*
     * Esta es una variable computada que devuelve la lista de items eliminando columnas innecesarias
     * y con palabras clave en algunas columnas para que su busqueda sea mas facil. E.j:
     * la columna de trimestre solo guarda un numero pero se le añade "trimestre" para que se pueda
     * buscar "trimestre 3" y solo se filtren los trimestres y no cualquier columna con el numero 3
     */
    const filteredData = computed(() => {
      return data.value?.items
        ?.filter((record: any) => {
          const keys = Object.keys(record).filter((el) => !defaultRecordKeys.includes(el))
          const testArray = keys.map((key) => {
            return record[key].toString().toLowerCase()
          })
          return testArray.some((text: string) => {
            return text.includes(searchQuery.value.toLowerCase())
          })
        })
        .map(mapData)
    })

    /*
     * Esta es una variable computada que devuelve el valor de las columnas unicas de los items
     * de un módulo, esto se utiliza para hacer la validación de campos unicos en los formularios
     * de un módulo
     */
    const uniqueKeysList = computed<uniqueKeysType>(() => {
      const things = {}
      if (Array.isArray(uniqueKeys) && uniqueKeys.length) {
        for (let index = 0; index < uniqueKeys.length; index++) {
          //@ts-ignore
          things[uniqueKeys[index]] = data.value?.items.map((record) => {
            return record[uniqueKeys[index]]
          })
        }
      }
      return things as any
    })

    /*
     * Cuando el componente que utiliza esta store es inicializado, si la config de "autoFetch"
     * es "true", se realizara un fetchAll nada mas inicializar el módulo, esto se hace en caso de que
     * se requiera desactivar para hacer un fetchAll personalizado en un módulo que lo requiera
     */
    onMounted(async () => {
      if (autoFetch == true) {
        await fetchAll(defaultFetchQuery.sortBy, defaultFetchQuery.filter)
      }
    })

    pb.collection(collectionName).subscribe('*', async function (e) {
      await fetchAll(defaultFetchQuery.sortBy, defaultFetchQuery.filter, false)
      console.log(e)
    })

    /*
     * @return un objeto con todas las variables, constantes, funciones y computed variables del módulo
     */

    return {
      data,
      fullData,
      pb,
      actualPage,
      save,
      update,
      destroy,
      fetchAll,
      fetchOne,
      filteredData,
      searchQuery,
      uniqueKeysList,
      defaultRecordKeys,
      sync,
      deSync,
      goToCreate,
      goToEdit,
      fetchFullList,
      defaultFetchQuery
    }
  })
}

export function createViewStore<IData extends Record & Object>({
  storeId,
  collectionName,
  relations,
  mapData = (record: IData) => {
    return record
  },
  autoFetch = true,
  defaultFetchQuery = {
    sortBy: '-created',
    filter: ''
  }
}: IViewStoreOptions<IData>) {
  return defineStore(storeId, () => {
    // Objeto con las funciones necesarias para interactuar con la API de pocketbase
    const { pb } = useAuthStore()

    // Variable en la que se guarda una lista de items de un módulo a través de "getList"
    const data = ref<ListResult<IData>>()

    // Variable en la que se guarda un solo item de un módulo a través de "getOne"
    const singleData = ref<IData>()

    // Variable que guarda la query de busqueda de una tabla de un módulo
    const searchQuery = ref<string>('')

    // Constante que guarda el nombre de algunas propiedades de un item, para su uso mas abajo
    const defaultRecordKeys = ['collectionId', 'collectionName', 'id', 'expand']

    // Variable que guarda el numero de items por pagina
    const itemsPerPage = ref(20)

    // Variable que guarda la pagina actual en la que se encuentra la tabla del módulo
    const actualPage = ref(1)

    /*
     * Esta función devuelve una lista de items de un módulo y la guarda en la variable "data"
     * @var collectionName el nombre de la colección de pocketbase que se quiere usar
     * @var actualPage la pagina que se quiere obtener
     * @var itemsPerPage cantidad de items que se quiere pedir a la API
     * @param sortBy cambia si el orden es ASC o DESC y por cual columna se ordena, default "-created"
     * @param filter cambia que filtros tiene que cumplir la query, actua como un WHERE en SQL, no default
     * @var expand recibe un string separado por comas con los nombres de las llaves foraneas
     * este lo recibe del parametro de configuración "relations"
     */
    async function fetchAll(sortBy: string = '-created', filter: string = '') {
      data.value = await pb
        .collection(collectionName)
        .getList<IData>(actualPage.value, itemsPerPage.value, {
          sort: sortBy,
          expand: relations?.toString(),
          filter: filter
        })
    }

    /*
     * Observa a la variable actualPage por cambios, si esta variable cambia
     * Realizara un fetchAll con el nuevo numero de pagina que se requiere
     */
    watch(actualPage, async () => {
      await fetchAll(defaultFetchQuery.sortBy, defaultFetchQuery.filter)
    })

    /*
     * Esta función devuelve un solo item de un módulo y lo guarda en la variable "singleData"
     * @var collectionName el nombre de la colección de pocketbase que se quiere usar
     * @param id el id unico del item que se quiere obtener
     * @var expand recibe un string separado por comas con los nombres de las llaves foraneas
     * este lo recibe del parametro de configuración "relations"
     */
    async function fetchOne(id: string) {
      singleData.value = await pb.collection(collectionName).getOne<IData>(id, {
        expand: relations?.toString()
      })
    }

    /*
     * Esta es una variable computada que devuelve la lista de items eliminando columnas innecesarias
     * y con palabras clave en algunas columnas para que su busqueda sea mas facil. E.j:
     * la columna de trimestre solo guarda un numero pero se le añade "trimestre" para que se pueda
     * buscar "trimestre 3" y solo se filtren los trimestres y no cualquier columna con el numero 3
     */
    const filteredData = computed(() => {
      return data.value?.items
        ?.filter((record) => {
          const keys = Object.keys(record).filter((el) => !defaultRecordKeys.includes(el))
          const testArray = keys.map((key) => {
            return record[key].toString().toLowerCase()
          })
          return testArray.some((text: string) => {
            return text.includes(searchQuery.value.toLowerCase())
          })
        })
        .map(mapData)
    })

    /*
     * Cuando el componente que utiliza esta store es inicializado, si la config de "autoFetch"
     * es "true", se realizara un fetchAll nada mas inicializar el módulo, esto se hace en caso de que
     * se requiera desactivar para hacer un fetchAll personalizado en un módulo que lo requiera
     */
    onMounted(async () => {
      if (autoFetch == true) {
        await fetchAll(defaultFetchQuery.sortBy, defaultFetchQuery.filter)
      }
    })

    /*
     * @return un objeto con todas las variables, constantes, funciones y computed variables del módulo
     */
    return {
      data,
      pb,
      singleData,
      actualPage,
      fetchAll,
      fetchOne,
      filteredData,
      searchQuery,
      defaultRecordKeys
    }
  })
}
