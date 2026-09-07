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
      <h1 class="museum-title mt-6">La mémoire numérique d’Israël Mutombo et de son épouse.</h1>
      <p class="mt-8 text-sm leading-relaxed text-subtle">
        Quinze années d’une histoire commune, réunies ici pour être conservées, revécues et transmises.
      </p>
      <blockquote class="mt-12 font-display text-2xl italic text-primary-soft">
        {{ content.brand.manifesto[0] }}
        <br />
        {{ content.brand.manifesto[1] }}
      </blockquote>
      <p class="mt-8 text-sm">{{ content.brand.signature }}</p>
      <div class="mt-12 flex flex-wrap justify-center gap-3">
        <RouterLink class="gold-btn-solid" to="/">Explorer la mémoire</RouterLink>
        <a class="gold-btn" :href="content.brand.whatsappHref" target="_blank" rel="noopener">Nous écrire</a>
      </div>
    </section>
  </MemoryLayout>
</template>
