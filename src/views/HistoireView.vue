<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import CoupleAbout from '@/components/memory/CoupleAbout.vue'
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

    <CoupleAbout />

    <section class="mx-auto max-w-6xl space-y-16 px-6 py-16">
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

      <div class="border-t border-primary/15 pt-12">
        <p class="museum-kicker text-center">2011 — 2026</p>
        <div class="mt-10 space-y-10">
          <article v-for="t in content.timeline" :key="t.id" class="grid items-center gap-6 md:grid-cols-12">
            <p class="font-display text-4xl text-primary md:col-span-3">{{ t.year }}</p>
            <div class="md:col-span-9">
              <h2 class="font-display text-3xl">{{ t.title }}</h2>
              <p class="mt-3 text-sm leading-relaxed text-subtle">{{ t.description }}</p>
            </div>
          </article>
        </div>
        <p class="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink/80">
          {{ content.story.fullStory }}
        </p>
        <div class="mt-10 text-center">
          <RouterLink class="gold-btn inline-flex" to="/ceremonie">Revivre la cérémonie</RouterLink>
        </div>
      </div>
    </section>
  </MemoryLayout>
</template>
