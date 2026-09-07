<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import { useMemory } from '@/composables/useMemory.js'

const { state, content } = useMemory()
const allowed = ['ADMIN', 'COUPLE', 'FAMILLE']
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-4xl px-6 py-16">
      <p class="museum-kicker">Espace famille</p>
      <h1 class="museum-title mt-4">Un lieu privé, pour ceux qui sont autorisés</h1>
      <p class="mt-4 text-sm text-subtle">Rôle actuel : {{ state.role }}</p>
      <div v-if="!allowed.includes(state.role)" class="mt-10 border border-primary/25 p-8">
        <p class="font-display text-2xl">Accès restreint</p>
        <p class="mt-3 text-sm text-subtle">
          Les membres autorisés peuvent consulter les souvenirs, ajouter des photos, laisser des messages, voir les
          capsules et télécharger certaines archives.
        </p>
        <p class="demo-chip mt-6">Simulation — changez le rôle dans l’administration</p>
        <RouterLink class="gold-btn mt-6 inline-flex" to="/admin/permissions">Gérer les permissions</RouterLink>
      </div>
      <ul v-else class="mt-10 space-y-4 text-sm">
        <li class="border border-primary/15 p-5">Consulter les souvenirs familiaux</li>
        <li class="border border-primary/15 p-5">Ajouter des photographies</li>
        <li class="border border-primary/15 p-5">Ajouter des messages</li>
        <li class="border border-primary/15 p-5">Consulter les capsules</li>
        <li class="border border-primary/15 p-5">Télécharger certaines archives</li>
      </ul>
      <p class="mt-8 text-xs text-subtle">{{ content.demo.note }}</p>
    </section>
  </MemoryLayout>
</template>
