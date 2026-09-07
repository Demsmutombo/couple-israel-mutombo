<script setup>
import { ref } from 'vue'

const ajar = ref(false)
</script>

<template>
  <div class="flex flex-col items-center">
    <button
      type="button"
      class="relative h-56 w-56"
      aria-label="Coffre numérique"
      @click="ajar = !ajar"
    >
      <span class="absolute inset-x-8 bottom-4 top-16 border border-primary/50 bg-gradient-to-b from-mist to-void" />
      <span
        class="absolute inset-x-6 top-8 h-24 origin-bottom border border-primary bg-gradient-to-b from-primary/40 to-mist transition duration-700"
        :class="ajar ? '-translate-y-4 -rotate-x-12 rotate-[-8deg] opacity-90' : ''"
      />
      <span class="absolute left-1/2 top-24 h-8 w-8 -translate-x-1/2 rounded-full border-2 border-primary" />
    </button>
    <p class="mt-4 text-[11px] uppercase tracking-[0.24em] text-subtle">
      {{ ajar ? 'Ouverture partielle — contenu scellé' : 'Coffre scellé' }}
    </p>
  </div>
</template>
