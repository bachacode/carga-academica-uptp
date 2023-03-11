<script setup lang="ts">
import { useAuthStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')

const login = async () => {
  await auth.pb
    .collection('users')
    .authWithPassword(username.value, password.value)
    .then(() => {
      router.push('dashboard')
      console.log('You successfully logged in!')
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  auth.user = auth.pb.authStore.model
})
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');
.font-family-karla {
  font-family: karla;
}
</style>

<template>
  <div></div>
  <main class="font-family-karla h-screen bg-blue-100">
    <div class="flex w-full flex-wrap">
      <!-- Login Section -->
      <div class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <span class="bg-blue-800 p-4 text-xl font-bold text-white">Logo</span>
        </div>

        <div
          class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32"
        >
          <p class="text-center text-3xl">¡Bienvenido!</p>
          <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="login()">
            <div class="flex flex-col pt-4">
              <label for="text" class="text-lg">Nombre de usuario</label>
              <input
                v-model="username"
                type="text"
                id="text"
                placeholder="Usuario"
                class="focus:shadow-outline mt-1 w-full appearance-none rounded border bg-blue-50 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            <div class="flex flex-col pt-4">
              <label for="password" class="text-lg">Contraseña</label>
              <input
                v-model="password"
                type="password"
                id="password"
                placeholder="Contraseña"
                class="focus:shadow-outline mt-1 w-full appearance-none rounded border bg-blue-50 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>
            <button
              type="submit"
              class="mt-8 bg-blue-800 p-2 text-lg font-bold text-white hover:bg-blue-900"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>

      <!-- Image Section -->
      <div class="w-1/2 shadow-2xl">
        <img
          class="hidden h-screen w-full object-cover md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
        />
      </div>
    </div>
  </main>
</template>
