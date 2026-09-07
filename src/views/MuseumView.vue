<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-6xl px-6 py-16">
      <p class="museum-kicker">Musée numérique</p>
      <h1 class="museum-title mt-4">Un lieu pour toutes les salles de la mémoire</h1>
      <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="room in content.museumRooms"
          :key="room.to"
          :to="room.to"
          class="group royal-panel p-8 transition hover:border-primary/60"
        >
          <p class="text-2xl">{{ room.icon }}</p>
          <h2 class="mt-4 font-display text-3xl group-hover:text-primary">{{ room.label }}</h2>
          <p class="mt-2 text-sm text-subtle">{{ room.text }}</p>
        </RouterLink>
      </div>
    </section>
  </MemoryLayout>
</template>
