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
      <p class="museum-kicker">15 ans</p>
      <h1 class="museum-title mt-4">15 ans — une histoire en mouvement</h1>
      <p class="mt-6 max-w-2xl text-sm text-subtle">
        Les souvenirs sont souvent dispersés. Ici, ils redeviennent une ligne de vie.
      </p>
      <div class="relative mt-16 space-y-12 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-primary/30 md:before:left-1/2">
        <article
          v-for="(t, i) in content.timeline"
          :id="t.id"
          :key="t.id"
          class="grid items-center gap-6 md:grid-cols-2"
        >
          <ArchiveVisual
            :seed="t.year"
            :title="t.title"
            :kicker="t.year"
            :src="t.src"
            :class="i % 2 ? 'md:order-2' : ''"
            object-position="center 18%"
          />
          <div :class="i % 2 ? 'md:order-1 md:text-right' : ''">
            <p class="font-display text-5xl text-primary">{{ t.year }}</p>
            <h2 class="mt-3 font-display text-3xl">{{ t.title }}</h2>
            <p class="mt-3 text-sm leading-relaxed text-subtle">{{ t.description }}</p>
            <RouterLink class="mt-5 inline-block text-[11px] uppercase tracking-[0.2em] text-primary" to="/galerie">
              Découvrir
            </RouterLink>
          </div>
        </article>
      </div>

      <div class="mt-20 text-center">
        <p class="museum-kicker">Mémoire vivante</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4 font-display text-3xl text-primary">
          <template v-for="(y, i) in content.livingYears" :key="y">
            <span>{{ y }}</span>
            <span v-if="i < content.livingYears.length - 1" class="text-subtle">↓</span>
          </template>
        </div>
        <p class="mt-6 text-sm text-subtle">Le couple peut continuer à ajouter photos, événements, messages, vidéos, souvenirs.</p>
      </div>
    </section>
  </MemoryLayout>
</template>
