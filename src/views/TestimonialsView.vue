<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-6xl px-6 py-16">
      <p class="museum-kicker">Témoignages</p>
      <h1 class="museum-title mt-4">Ils ont partagé ce jour avec nous</h1>
      <p class="mt-4 text-sm text-subtle">Les noms réels ne sont pas inventés. Placeholders uniquement.</p>
      <div class="mt-12 grid gap-6 md:grid-cols-2">
        <article v-for="g in content.guests" :key="g.id" class="grid gap-4 border border-primary/15 p-5 sm:grid-cols-2">
          <ArchiveVisual :seed="g.id" :src="g.src" :title="g.name" :kicker="g.relation" object-position="center 35%" />
          <div>
            <h2 class="font-display text-2xl">{{ g.name }}</h2>
            <p class="text-xs uppercase tracking-[0.16em] text-primary">{{ g.relation }}</p>
            <p class="mt-4 text-sm leading-relaxed text-ink/80">« {{ g.message }} »</p>
          </div>
        </article>
      </div>
      <RouterLink class="gold-btn mt-12 inline-flex" to="/voeux">Laisser un message au couple</RouterLink>
    </section>
  </MemoryLayout>
</template>
