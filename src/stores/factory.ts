import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useAlertStore } from './alert'
import { ref } from 'vue'
import router from '@/router'

type Alertmessages = {
  create: string
  update: string
  delete: string
}

export function createCrudStore<dataType, IData>(
  storeId: string,
  route: string,
  collectionName: string,
  success: Alertmessages,
  error: Alertmessages,
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

    async function fetchAll() {
      data.value = await pb.collection(collection.value).getFullList<IData>({
        sort: '-created'
      })
    }

    async function fetchOne(id: string) {
      singleData.value = await pb.collection(collection.value).getOne<IData>(id)
    }

    async function store(data: any) {
      await pb
        .collection(collection.value)
        .create<dataType>(data)
        .then(async () => {
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

    return { data, singleData, store, update, destroy, fetchAll, fetchOne }
  })
}
