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

export function createCrudStore<dataType, IData extends Record & Object>(
  storeId: string,
  route: string,
  collectionName: string,
  success: Alertmessages,
  error: Alertmessages
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
    const editData = ref<dataType>()
    const searchQuery = ref<string>('')
    const recordKeys = ref(['collectionId', 'collectionName', 'id', 'expand'])

    async function fetchAll(sortBy: string = '-created') {
      data.value = await pb.collection(collection.value).getFullList<IData>({
        sort: sortBy
      })
    }

    async function fetchEdit(id: string) {
      editData.value = await pb.collection(collection.value).getOne<dataType>(id)
    }

    async function fetchOne(id: string) {
      singleData.value = await pb.collection(collection.value).getOne<IData>(id)
    }

    const dataIds = computed(() => {
      return data.value?.map((value: any) => {
        return value?.codigo;
      })
    })

    async function save(data: any) {
      await pb
        .collection(collection.value)
        .create<dataType>(data)
        .then(async () => {
          await fetchAll()
          await router.push({ path: parentRoute.value })
          alert.setSuccess(successMessages.value.create)
        })
        .catch(async () => {
          alert.setError(errorMessages.value.create)
        })
    }

    async function update(id: string, data: any) {
      await pb
        .collection(collection.value)
        .update<dataType>(id, data)
        .then(async () => {
          await fetchAll()
          await router.push({ path: parentRoute.value })
          alert.setSuccess(successMessages.value.update)
        })
        .catch(async () => {
          alert.setError(errorMessages.value.update)
        })
    }

    async function destroy(id: string) {
      await pb
        .collection(collection.value)
        .delete(id)
        .then(async () => {
          alert.setSuccess(successMessages.value.delete)
          await fetchAll()
        })
        .catch(async () => {
          alert.setError(errorMessages.value.delete)
          await fetchAll()
        })
    }

    const filteredData = computed(() => {
      return data.value?.filter((record) => {
        let keys = Object.keys(record)
        keys = keys.filter((el) => !recordKeys.value.includes(el))
        const testArray = keys.map((key) => {
          return record[key].toString()
        })
        return testArray.some((text: string) => {
          return text.includes(searchQuery.value)
        })
      })
    })

    onMounted(async () => {
      await fetchAll()
    })

    return {
      data,
      singleData,
      editData,
      save,
      update,
      destroy,
      fetchAll,
      fetchOne,
      fetchEdit,
      filteredData,
      searchQuery,
      dataIds
    }
  })
}
