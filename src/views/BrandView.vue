<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import RoyalMark from '@/components/ui/RoyalMark.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-3xl px-6 py-24 text-center">
      <RoyalMark class="mx-auto mb-8" size="lg" />
      <p class="museum-kicker">{{ content.brand.name }}</p>
      <h1 class="museum-title mt-6">Une plateforme de conservation et de transmission de la mémoire numérique.</h1>
      <p class="mt-8 text-sm leading-relaxed text-subtle">
        OneMemoria n’est pas un album photo. Ce n’est pas un réseau social. Ce n’est pas simplement un site web.
        C’est une manière de transformer des souvenirs dispersés en une histoire numérique organisée, consultable,
        partageable et destinée à être transmise.
      </p>
      <blockquote class="mt-12 font-display text-2xl italic text-primary-soft">
        {{ content.brand.manifesto[0] }}
        <br />
        {{ content.brand.manifesto[1] }}
      </blockquote>
      <p class="mt-8 text-sm">{{ content.brand.signature }}</p>
      <div class="mt-12 flex flex-wrap justify-center gap-3">
        <RouterLink class="gold-btn-solid" to="/">Explorer la mémoire</RouterLink>
        <a class="gold-btn" :href="content.brand.whatsappHref" target="_blank" rel="noopener">Contacter OneMemoria</a>
      </div>
    </section>
  </MemoryLayout>
</template>
