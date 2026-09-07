<script setup>
import { ref } from 'vue'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
const selected = ref(content.mapPlaces[0])
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-5xl px-6 py-16">
      <p class="museum-kicker">Carte des souvenirs</p>
      <h1 class="museum-title mt-4">Des lieux pour les mémoires</h1>
      <div class="relative mt-12 aspect-[16/10] overflow-hidden bg-gradient-to-br from-mist to-void">
        <button
          v-for="p in content.mapPlaces"
          :key="p.id"
          type="button"
          class="absolute -translate-x-1/2 -translate-y-1/2 text-left"
          :style="{ left: `${p.x}%`, top: `${p.y}%` }"
          @click="selected = p"
        >
          <span class="block h-3 w-3 rounded-full bg-primary shadow-[0_0_16px_rgba(196,165,116,0.8)]" />
          <span class="mt-1 block text-[10px] uppercase tracking-[0.14em] text-ink">{{ p.title }}</span>
        </button>
      </div>
      <article v-if="selected" class="mt-8 border border-primary/20 p-6">
        <h2 class="font-display text-3xl">📍 {{ selected.title }}</h2>
        <p class="mt-3 text-sm text-subtle">{{ selected.text }}</p>
      </article>
    </section>
  </MemoryLayout>
</template>
