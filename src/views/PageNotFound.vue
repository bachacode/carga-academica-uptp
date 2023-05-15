<script setup lang="ts"></script>
<template>
  <section class="flex h-screen items-center p-16">
    <div class="mx-auto flex flex-col items-center justify-center px-5">
      <div class="max-w-md text-center">
        <h2 class="mb-8 text-9xl font-extrabold">
          <span class="sr-only">Error</span><span class="text-indigo-600">404</span>
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">
          Lo siento, no pudimos encontrar esta pagina.
        </p>
        <p class="mt-4 mb-6">¡Dirigete a nuestra pagina de inicio para buscar lo que necesitas!.</p>
        <router-link :to="{ name: 'login' }" class="btn rounded-lg bg-indigo-600">
          <font-awesome-icon icon="arrow-left" class="mr-2" />Volver
        </router-link>
      </div>
    </div>
  </section>
</template>
