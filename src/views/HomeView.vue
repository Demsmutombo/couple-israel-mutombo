<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import CoupleAbout from '@/components/memory/CoupleAbout.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
const media = content.media
</script>

<template>
  <MemoryLayout flush>
    <section id="home" class="relative flex min-h-[100svh] items-center overflow-hidden pb-28 pt-28">
      <ArchiveVisual
        class="om-reveal-skip !absolute inset-0"
        seed="hero"
        ratio="h-full w-full"
        :src="media.hero"
        alt="Israël Mutombo et son épouse"
        eager
        object-position="center 18%"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
      <div class="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center lg:px-8">
        <p class="museum-kicker text-primary">{{ content.hero.kicker }}</p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl leading-[1.15] text-white sm:text-6xl md:text-7xl">
          {{ content.hero.titleBefore }}
          <em class="script mt-1 block text-5xl sm:text-6xl md:text-7xl">{{ content.hero.titleScript }}</em>
        </h1>
        <p class="mt-4 text-[11px] uppercase tracking-[0.28em] text-white/80">{{ content.hero.tagline }}</p>
        <p class="mt-6 max-w-lg text-sm leading-relaxed text-white/80">
          {{ content.hero.subtitle }}
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <RouterLink class="gold-btn-solid" to="/ceremonie">Revivre la cérémonie</RouterLink>
          <RouterLink class="btn-ghost-light" to="/histoire">Notre histoire →</RouterLink>
        </div>
      </div>
    </section>

    <CoupleAbout preview />

    <section class="section-dark px-6 py-20 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <p class="museum-kicker">{{ content.parcours.kicker }}</p>
        <h2 class="mt-4 font-display text-4xl text-white md:text-5xl">
          {{ content.parcours.title }}
          <em class="script block text-5xl">{{ content.parcours.script }}</em>
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75">
          Journaliste d’investigation, voix de Bosolo na Politik, fondateur de Bosolo TV.
          Le chemin public, à côté de l’histoire du couple.
        </p>
        <RouterLink class="gold-btn-solid mt-8 inline-flex" to="/parcours">Lire le parcours</RouterLink>
      </div>
    </section>

    <section class="bg-page px-6 pb-20 pt-20 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="museum-kicker">Galerie</p>
        <h2 class="mt-3 font-display text-4xl text-ink md:text-5xl">
          Notre <em class="script text-5xl">galerie</em>
        </h2>
        <div class="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <RouterLink v-for="card in content.homeStories" :key="card.id" to="/galerie" class="group">
            <ArchiveVisual
              :seed="card.id"
              ratio="aspect-[3/4]"
              :src="card.src"
              :title="card.title"
              :kicker="card.kicker"
              :object-position="card.objectPosition"
            />
          </RouterLink>
        </div>
        <RouterLink class="btn-ink mt-10 inline-flex" to="/galerie">Voir toute la galerie</RouterLink>
      </div>
    </section>

    <section class="section-dark px-6 py-20 text-center lg:px-8">
      <p class="museum-kicker">{{ content.message.voeuxKicker }}</p>
      <h2 class="mt-4 font-display text-4xl text-white md:text-5xl">{{ content.message.voeuxTitle }}</h2>
      <p class="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75">
        {{ content.message.voeuxIntro }}
      </p>
      <RouterLink class="gold-btn-solid mt-8 inline-flex" to="/voeux">Laisser un message</RouterLink>
    </section>
  </MemoryLayout>
</template>
