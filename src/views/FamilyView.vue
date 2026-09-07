<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
const family = content.family
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-5xl px-6 py-16 text-center">
      <p class="museum-kicker">{{ family.sectionKicker }}</p>
      <h1 class="museum-title mt-4">{{ family.sectionTitle }}</h1>
      <p class="mx-auto mt-6 max-w-xl text-sm text-subtle">{{ family.intro }}</p>
    </section>

    <section class="mx-auto grid max-w-5xl gap-6 px-6 pb-8 md:grid-cols-2">
      <article class="border border-primary/15 px-8 py-10 text-center">
        <p class="text-[11px] uppercase tracking-[0.18em] text-primary">{{ family.parentsGroom.label }}</p>
        <p class="mt-4 font-display text-2xl text-ink">{{ family.parentsGroom.names }}</p>
      </article>
      <article class="border border-primary/15 px-8 py-10 text-center">
        <p class="text-[11px] uppercase tracking-[0.18em] text-primary">{{ family.parentsBride.label }}</p>
        <p class="mt-4 font-display text-2xl text-ink">{{ family.parentsBride.names }}</p>
      </article>
    </section>

    <section class="mx-auto max-w-5xl px-6 py-12 text-center">
      <h2 class="font-display text-3xl text-ink">{{ family.witnesses.sectionTitle }}</h2>
      <p class="mt-4 text-sm text-subtle">Les proches seront présentés ici dès que leurs noms seront confirmés.</p>
    </section>

    <section class="mx-auto max-w-5xl px-6 py-8 text-center">
      <h2 class="font-display text-3xl text-ink">{{ family.bridesmaids.sectionTitle }}</h2>
      <p class="mt-4 text-sm text-subtle">Les enfants seront ajoutés avec leurs portraits.</p>
    </section>

    <section class="mx-auto max-w-5xl px-6 pb-20 text-center">
      <h2 class="font-display text-3xl text-ink">{{ family.others.sectionTitle }}</h2>
      <p class="mt-4 font-display text-xl text-subtle">{{ family.others.names }}</p>
      <RouterLink class="gold-btn mt-10 inline-flex" to="/voix">Les voix de la famille</RouterLink>
    </section>
  </MemoryLayout>
</template>
