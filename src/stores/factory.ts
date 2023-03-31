import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useAlertStore } from './alert'
import { computed, onMounted, ref } from 'vue'
import router from '@/router'
import type { Record } from 'pocketbase'
import type { relationsType } from '@/components/MultiSelect.vue'

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
  uniqueKeys?: Array<string>
  mapData?: (value: IData, index: number, array: IData[]) => unknown
  relations?: Array<string>
}
export function createCrudStore<
  dataType extends {} | undefined,
  IData extends Record & Object,
  uniqueKeysType = void
>({
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
}: IStoreOptions<IData>) {
  return defineStore(storeId, () => {
    const { pb } = useAuthStore()
    const alert = useAlertStore()
    const data = ref<IData[]>()
    const singleData = ref<IData>()
    const searchQuery = ref<string>('')
    const defaultRecordKeys = ref(['collectionId', 'collectionName', 'id', 'expand'])

    async function fetchAll(sortBy: string = '-created') {
      data.value = await pb.collection(collectionName).getFullList<IData>({
        sort: sortBy,
        expand: relations?.toString()
      })
    }

    async function fetchOne(id: string) {
      singleData.value = await pb.collection(collectionName).getOne<IData>(id, {
        sort: '-created',
        expand: relations?.toString()
      })
    }

    async function save(data: dataType) {
      await pb
        .collection(collectionName)
        .create<IData>(data)
        .then(async (data: IData) => {
          if (relations) {
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
      relations?.forEach(async (relation: string) => {
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

    async function update(id: string, data: dataType) {
      await pb
        .collection(collectionName)
        .update<IData>(id, data)
        .then(async (data) => {
          if (relations) {
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
      await fetchAll().catch(async () => {
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
      const things = {}
      if (Array.isArray(uniqueKeys) && uniqueKeys.length) {
        for (let index = 0; index < uniqueKeys.length; index++) {
          //@ts-ignore
          things[uniqueKeys[index]] = data.value?.map((record) => {
            return record[uniqueKeys[index]]
          })
        }
      }
      return things as any
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
      sync,
      deSync
    }
  })
}
