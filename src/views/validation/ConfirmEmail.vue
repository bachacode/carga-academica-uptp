<script setup lang="ts"></script>

<template>
  <main class="h-screen bg-blue-100">
    <div class="flex w-full flex-wrap">
      <!-- Recover Password Section -->
      <div class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <span class="bg-blue-800 p-4 text-xl font-bold text-white">Logo</span>
        </div>
        <div
          class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32"
        >
          <p class="text-center text-3xl">Validación de correo</p>
          <p>¡Su correo ha sido confirmado correctamente!</p>
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
