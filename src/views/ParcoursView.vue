<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
const p = content.parcours
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-12 md:py-20">
      <div class="md:col-span-6">
        <p class="museum-kicker">{{ p.kicker }}</p>
        <h1 class="museum-title mt-4">
          {{ p.title }}
          <em class="script mt-1 block text-5xl md:text-6xl">{{ p.script }}</em>
        </h1>
        <p class="mt-4 text-[11px] uppercase tracking-[0.22em] text-primary">{{ p.subtitle }}</p>
        <p class="mt-6 max-w-xl text-sm leading-relaxed text-ink/80">{{ p.intro }}</p>
      </div>
      <ArchiveVisual
        class="md:col-span-6"
        seed="parcours"
        ratio="aspect-[4/5] md:aspect-[5/6]"
        :src="p.portrait"
        :title="p.title"
        :kicker="p.nickname"
        :object-position="p.objectPosition"
      />
    </section>

    <section class="border-y border-primary/15 bg-surface">
      <div class="mx-auto grid max-w-6xl gap-px sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="item in p.identity" :key="item.label" class="bg-page px-6 py-8">
          <p class="text-[10px] uppercase tracking-[0.2em] text-primary">{{ item.label }}</p>
          <p class="mt-3 font-display text-xl text-ink">{{ item.value }}</p>
        </article>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-20">
      <p class="museum-kicker">Ligne de vie</p>
      <h2 class="mt-3 font-display text-4xl text-ink md:text-5xl">
        Le <em class="script text-5xl">chemin</em>
      </h2>
      <div class="mt-14 space-y-10">
        <article v-for="step in p.timeline" :key="step.year + step.title" class="grid gap-4 md:grid-cols-12">
          <p class="font-display text-3xl text-primary md:col-span-3">{{ step.year }}</p>
          <div class="md:col-span-9">
            <h3 class="font-display text-2xl text-ink">{{ step.title }}</h3>
            <p class="mt-3 max-w-2xl text-sm leading-relaxed text-subtle">{{ step.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section-dark px-6 py-20 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <p class="museum-kicker">Signature</p>
        <h2 class="mt-3 font-display text-4xl text-white md:text-5xl">
          Ce qu’il a <em class="script text-5xl">bâti</em>
        </h2>
        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <article v-for="work in p.works" :key="work.title" class="border border-white/10 px-6 py-8">
            <p class="text-[10px] uppercase tracking-[0.2em] text-primary">{{ work.kicker }}</p>
            <h3 class="mt-3 font-display text-2xl text-white">{{ work.title }}</h3>
            <p class="mt-4 text-sm leading-relaxed text-white/70">{{ work.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-20">
      <p class="museum-kicker">Actions</p>
      <h2 class="mt-3 font-display text-4xl text-ink md:text-5xl">
        Ce qui <em class="script text-5xl">reste</em>
      </h2>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="action in p.actions" :key="action.title" class="border border-primary/15 px-6 py-8">
          <h3 class="font-display text-2xl text-ink">{{ action.title }}</h3>
          <p class="mt-4 text-sm leading-relaxed text-subtle">{{ action.text }}</p>
        </article>
      </div>
    </section>

    <section class="bg-surface px-6 py-20 text-center lg:px-8">
      <blockquote class="mx-auto max-w-3xl font-display text-3xl leading-snug text-ink md:text-4xl">
        “{{ p.quote }}”
      </blockquote>
      <p class="mt-6 text-[11px] uppercase tracking-[0.18em] text-primary">{{ p.quoteMeta }}</p>
      <p class="mx-auto mt-10 max-w-2xl text-sm leading-relaxed text-subtle">{{ p.note }}</p>
      <RouterLink class="gold-btn mt-10 inline-flex" to="/histoire">L’histoire du couple</RouterLink>
    </section>

    <section class="mx-auto max-w-6xl px-6 pb-24">
      <p class="museum-kicker">Sources</p>
      <h2 class="mt-3 font-display text-3xl text-ink">Repères publics</h2>
      <ul class="mt-8 space-y-3 text-sm">
        <li v-for="source in p.sources" :key="source.href">
          <a
            :href="source.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-ink/80 underline-offset-4 hover:text-primary hover:underline"
          >
            {{ source.label }}
          </a>
        </li>
      </ul>
    </section>
  </MemoryLayout>
</template>
