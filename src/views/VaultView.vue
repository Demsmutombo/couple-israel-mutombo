<script setup>
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-4xl px-6 py-20 text-center">
      <p class="museum-kicker">Mémoire protégée</p>
      <h1 class="museum-title mt-4">Mémoire protégée</h1>
      <p class="mt-4 text-sm text-subtle">🔒 Les originaux restent ici. Simulation visuelle — pas de coffre réel connecté.</p>
      <div class="mt-14 grid gap-4 md:grid-cols-2">
        <article
          v-for="item in content.vaultItems"
          :key="item.id"
          class="border border-primary/25 bg-night-elevated px-6 py-8"
        >
          <p class="text-xs uppercase tracking-[0.3em] text-primary">🔒 {{ item.label }}</p>
        </article>
      </div>
      <p class="mt-10 text-xs text-subtle">
        Dernière sauvegarde : {{ content.adminStats.backup }} · État : {{ content.adminStats.backupState }}
      </p>
      <p class="demo-chip mx-auto mt-4">{{ content.adminStats.backupNote }}</p>
    </section>
  </MemoryLayout>
</template>
