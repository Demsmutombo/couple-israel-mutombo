<script setup>
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { useMemory } from '@/composables/useMemory.js'

const emit = defineEmits(['enter', 'tour'])
const { couple, content } = useMemory()
</script>

<template>
  <div class="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-void px-6 py-16">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(181,142,109,0.22),transparent_58%)]" />

    <p class="relative z-10 mb-6 text-[11px] uppercase tracking-[0.35em] text-primary">
      {{ content.brand.name }}
    </p>

    <div class="relative z-10 overflow-hidden rounded-sm border border-primary/35 bg-night p-2 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <BrandLogo size="hero" />
    </div>

    <p class="relative z-10 mt-6 text-center text-sm uppercase tracking-[0.28em] text-white/80">
      {{ couple.anniversary }} ans · {{ couple.years }}
    </p>

    <div class="relative z-10 mt-10 flex flex-wrap justify-center gap-3">
      <button type="button" class="gold-btn-solid" @click="emit('enter')">Entrer dans la mémoire</button>
      <button type="button" class="btn-ghost-light" @click="emit('tour')">▶ Découvrir en 5 minutes</button>
    </div>
  </div>
</template>
