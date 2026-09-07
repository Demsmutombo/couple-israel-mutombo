<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content, couple } = useMemory()
const chapters = [
  { ...content.story.firstMeeting, side: 'left' },
  { ...content.story.journey, side: 'right' },
]
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-6xl px-6 py-16 text-center">
      <p class="museum-kicker">{{ content.story.sectionKicker }}</p>
      <h1 class="museum-title mt-4">{{ content.story.sectionTitle }}</h1>
      <p class="mx-auto mt-4 max-w-2xl text-sm text-subtle">
        {{ couple.displayName }} · {{ couple.years }}
      </p>
    </section>

    <section class="mx-auto max-w-6xl space-y-16 px-6 pb-20">
      <article
        v-for="(chapter, i) in chapters"
        :key="chapter.title"
        class="grid items-center gap-8 md:grid-cols-2"
      >
        <ArchiveVisual
          :seed="chapter.title"
          ratio="aspect-[4/5]"
          :src="chapter.image"
          :title="chapter.title"
          :kicker="i === 0 ? 'Première rencontre' : 'Parcours'"
          :object-position="chapter.objectPosition"
          :class="chapter.side === 'right' ? 'md:order-2' : ''"
        />
        <div :class="chapter.side === 'right' ? 'md:order-1 md:text-right' : ''">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{{ chapter.dateLabel }}</p>
          <h2 class="mt-3 font-display text-3xl text-ink md:text-4xl">{{ chapter.title }}</h2>
          <p class="mt-5 text-sm leading-relaxed text-ink/80">{{ chapter.body }}</p>
        </div>
      </article>

      <div class="border-t border-primary/15 pt-12 text-center">
        <p class="museum-kicker">Histoire complète</p>
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-ink/80">
          {{ content.story.fullStory }}
        </p>
        <RouterLink class="gold-btn mt-10 inline-flex" to="/evenement">Voir les étapes importantes</RouterLink>
      </div>
    </section>
  </MemoryLayout>
</template>
