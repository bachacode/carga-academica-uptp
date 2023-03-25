import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useAlertStore } from './alert'
import { computed, onMounted, ref } from 'vue'
import router from '@/router'
import type { Record } from 'pocketbase'

type Alertmessages = {
  create: string
  update: string
  delete: string
}

export function createCrudStore<dataType, IData extends Record & Object, uniqueKeys = void>(
  storeId: string,
  route: string,
  collectionName: string,
  success: Alertmessages,
  error: Alertmessages,
  uniqueKeysParam: Array<string> | string = '',
  callback: any = (record: any) => {
    return record
  }
) {
  return defineStore(storeId, () => {
    const { pb } = useAuthStore()
    const alert = useAlertStore()
    const parentRoute = ref<string>(route)
    const collection = ref<string>(collectionName)
    const successMessages = ref<Alertmessages>(success)
    const errorMessages = ref<Alertmessages>(error)
    const data = ref<IData[]>()
    const singleData = ref<IData>()
    const searchQuery = ref<string>('')
    const recordKeys = ref(['collectionId', 'collectionName', 'id', 'expand'])
    const uniqueKeys = ref(uniqueKeysParam)
    const relationships = ref('saberes')
    async function fetchAll(sortBy: string = '-created') {
      data.value = await pb.collection(collection.value).getFullList<IData>({
        sort: sortBy,
        expand: relationships.value
      })
    }

    async function fetchOne(id: string) {
      singleData.value = await pb.collection(collection.value).getOne<IData>(id)
    }

    async function save(data: any) {
      await pb
        .collection(collection.value)
        .create<IData>(data)
        .then(async () => {
          
          // await sync(data.id)
          await router.push({ path: parentRoute.value })
          alert.setSuccess({ message: successMessages.value.create })
        })
        .catch(async (err) => {
          console.log(err)
          alert.setError({ message: errorMessages.value.create })
        })
    }

    async function sync(fatherId: string) {
      const father = await pb.collection(collection.value).getOne(fatherId, { $autoCancel: false })
      father[relationships.value].forEach(async (childId: string) => {
        const relation = await pb
          .collection(relationships.value)
          .getOne(childId, { $autoCancel: false })

        if (!relation[collection.value].includes(father.id)) {
          relation[collection.value].push(father.id)
          await pb
            .collection(relationships.value)
            .update(childId, relation, { $autoCancel: false })
            .catch((err) => console.log(err.data))
        }
      })
    }

    async function update(id: string, data: any) {
      await pb
        .collection(collection.value)
        .update<dataType>(id, data)
        .then(async () => {
          
          await sync(id)
          await router.push({ path: parentRoute.value })
          alert.setSuccess({ message: successMessages.value.update })
        })
        .catch(async () => {
          alert.setError({ message: errorMessages.value.update })
        })
    }

    async function destroy(id: string) {
      await pb
        .collection(collection.value)
        .delete(id)
        .then(async () => {
          alert.setSuccess({ message: successMessages.value.delete })
          
        })
        .catch(async () => {
          alert.setError({ message: errorMessages.value.delete })
          
        })
    }

    const filteredData = computed(() => {
      return data.value
        ?.filter((record) => {
          const keys = Object.keys(record).filter((el) => !recordKeys.value.includes(el))
          const testArray = keys.map((key) => {
            return record[key].toString()
          })
          return testArray.some((text: string) => {
            return text.includes(searchQuery.value)
          })
        })
        .map(callback)
    })

    const uniqueKeysList = computed<uniqueKeys[] | string>(() => {
      if (!data.value) return ''
      if (Array.isArray(uniqueKeys.value)) {
        return uniqueKeys.value.map((key) => {
          if (!data.value) return
          return data.value.map((record) => {
            return record[key]
          })
        })
      } else
        return data.value.map((record) => {
          if (!uniqueKeys.value) return
          if (typeof uniqueKeys.value === 'string') return record[uniqueKeys.value]
        })
    })

    onMounted(async () => {
      await fetchAll()
      pb.collection(collection.value).subscribe("*", async () => {
        await fetchAll()
      })
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
      recordKeys,
      sync
    }
  })
}
