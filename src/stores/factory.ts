import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useAlertStore } from './alert'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import router from '@/router'
import type { Record } from 'pocketbase'

export type alertMessages = {
  create: string
  update: string
  delete: string
}

export interface IStoreOptions<IData> {
  storeId: string
  route: string
  collectionName: string
  success: alertMessages
  error: alertMessages
  uniqueKeys?: Array<string>,
  mapData?: (value: IData, index: number, array: IData[]) => unknown,
  relations?: Array<string>
}
export function createCrudStore<
dataType extends {} | undefined,
IData extends Record & Object,
uniqueKeysType = void
>(
  {
    storeId,
    route,
    collectionName,
    success,
    error,
    uniqueKeys = [],
    mapData = (record: any) => {
      return record
    },
    relations
  }: IStoreOptions<IData>
) {
  return defineStore(storeId, () => {
    const { pb } = useAuthStore()
    const alert = useAlertStore()
    const data = ref<IData[]>()
    const singleData = ref<IData>()
    const searchQuery = ref<string>('')
    const defaultRecordKeys = ref(['collectionId', 'collectionName', 'id', 'expand'])
    const relationships = ref('saberes')

    async function fetchAll(sortBy: string = '-created') {
      data.value = await pb.collection(collectionName).getFullList<IData>({
        sort: sortBy,
        expand: relationships.value
      })
    }

    async function fetchOne(id: string) {
      singleData.value = await pb.collection(collectionName).getOne<IData>(id)
    }

    async function save(data: dataType) {
      await pb
        .collection(collectionName)
        .create<IData>(data)
        .then(async (data: IData) => {
          if(relations) {
            await sync(data)
          }
          await fetchAll()
          await router.push({ path: route })
          alert.setSuccess({ message: success.create })
        })
        .catch(async () => {
          alert.setError({ message: error.create })
        })
    }

    async function sync(father: IData) {
      father[relationships.value].forEach(async (childId: string) => {
        const relation = await pb
          .collection(relationships.value)
          .getOne(childId, { $autoCancel: false })

        if (!relation[collectionName].includes(father.id)) {
          relation[collectionName].push(father.id)
          await pb
            .collection(relationships.value)
            .update(childId, relation, { $autoCancel: false })
            .catch((err) => console.log(err.data))
        }
      })
    }

    async function update(id: string, data: dataType) {
      await pb
        .collection(collectionName)
        .update<IData>(id, data)
        .then(async (data) => {
          if(relations) {
            await sync(data)
          }
          await fetchAll()
          await router.push({ path: route })
          alert.setSuccess({ message: success.update })
        })
        .catch(async () => {
          alert.setError({ message: error.update })
        })
    }

    async function destroy(id: string) {
      await pb
        .collection(collectionName)
        .delete(id)
        .then(async () => {
          await fetchAll()
          alert.setSuccess({ message: success.delete })
        })
        await fetchAll()
        .catch(async () => {
          alert.setError({ message: error.delete })
        })
    }

    const filteredData = computed(() => {
      return data.value
        ?.filter((record) => {
          const keys = Object.keys(record).filter((el) => !defaultRecordKeys.value.includes(el))
          const testArray = keys.map((key) => {
            return record[key].toString()
          })
          return testArray.some((text: string) => {
            return text.includes(searchQuery.value)
          })
        })
        .map(mapData)
    })

    const uniqueKeysList = computed<uniqueKeysType>(() => {
      if (!data.value) return
      if (Array.isArray(uniqueKeys) && uniqueKeys.length) {
        for (let index = 0; index < uniqueKeys.length; index++) {
          return { [uniqueKeys[index]] : data.value.map((record) => {
            return record[uniqueKeys[index]]
          })} as any
        }
      }
      console.log('dependencies changed')
    })

    onMounted(async () => {
      await fetchAll()
    })

    return {
      data,
      pb,
      singleData,
      save,
      update,
      destroy,
      fetchAll,
      fetchOne,
      filteredData,
      searchQuery,
      uniqueKeysList,
      defaultRecordKeys,
      sync
    }
  })
}
