<script setup>
import { RouterLink } from 'vue-router'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import { useMemory } from '@/composables/useMemory.js'

defineProps({
  preview: { type: Boolean, default: false },
})

const { content } = useMemory()
const about = content.about
</script>

<template>
  <section id="about" class="bg-page px-6 py-20 lg:px-8">
    <div class="mx-auto max-w-7xl text-center">
      <p class="museum-kicker">{{ about.sectionKicker }}</p>
      <h2 class="museum-title mt-3">{{ about.sectionTitle }}</h2>
    </div>

    <div class="mx-auto mt-14 max-w-7xl">
      <div class="grid md:grid-cols-2">
        <article class="flex flex-col justify-center bg-surface px-8 py-12 text-center md:text-right">
          <h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{{ about.groom.title }}</h3>
          <p class="mt-5 text-sm leading-relaxed text-ink/80">{{ about.groom.description }}</p>
          <p class="script mt-6 text-4xl text-subtle">{{ about.groom.name }}</p>
        </article>
        <ArchiveVisual
          seed="groom"
          class="h-full"
          ratio="min-h-[420px] h-full aspect-[4/5] md:aspect-auto"
          :src="about.groom.image"
          :title="about.groom.name"
          :kicker="about.groom.title"
          :object-position="about.groom.objectPosition"
        />
      </div>
      <div class="grid md:grid-cols-2">
        <ArchiveVisual
          seed="bride"
          class="h-full"
          ratio="min-h-[420px] h-full aspect-[4/5] md:aspect-auto"
          :src="about.bride.image"
          :title="about.bride.name"
          :kicker="about.bride.title"
          :object-position="about.bride.objectPosition"
        />
        <article class="flex flex-col justify-center bg-surface px-8 py-12 text-center md:text-left">
          <h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{{ about.bride.title }}</h3>
          <p class="mt-5 text-sm leading-relaxed text-ink/80">{{ about.bride.description }}</p>
          <p class="script mt-6 text-4xl text-subtle">{{ about.bride.name }}</p>
        </article>
      </div>
      <div v-if="preview" class="mt-10 text-center">
        <RouterLink class="gold-btn inline-flex" to="/apropos">Lire à propos du couple</RouterLink>
      </div>
    </div>
  </section>
</template>
