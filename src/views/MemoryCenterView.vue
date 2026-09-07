<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'

const links = [
  { to: '/histoire', label: 'Histoire' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/ceremonie', label: 'Cérémonie' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/voix', label: 'Voix' },
  { to: '/temoignages', label: 'Témoignages' },
  { to: '/famille', label: 'Famille' },
  { to: '/livre', label: 'Livre' },
  { to: '/capsule', label: 'Capsule temporelle' },
]
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-6xl px-6 py-16">
      <p class="museum-kicker">Centre de mémoire</p>
      <h1 class="museum-title mt-4">Notre mémoire</h1>
      <div class="mt-10 flex flex-wrap gap-3">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="gold-btn">{{ l.label }}</RouterLink>
      </div>
    </section>
  </MemoryLayout>
</template>
