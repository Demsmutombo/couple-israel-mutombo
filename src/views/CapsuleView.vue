<script setup>
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import CapsuleChest from '@/components/ui/CapsuleChest.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content, track } = useMemory()

function discover() {
  track('capsule_opened')
}
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-3xl px-6 py-20 text-center">
      <p class="museum-kicker">Capsule temporelle</p>
      <h1 class="museum-title mt-4">{{ content.capsule.title }}</h1>
      <p class="mt-4 text-sm italic text-subtle">{{ content.capsule.subtitle }}</p>
      <div class="mt-12" @click="discover">
        <CapsuleChest />
      </div>
      <p class="mt-10 font-display text-2xl">{{ content.capsule.dedicated }}</p>
      <p class="mt-6 text-[11px] uppercase tracking-[0.3em] text-primary">🔒 {{ content.capsule.status }}</p>
      <p class="mt-3 font-display text-4xl">Ouverture : {{ content.capsule.opens }}</p>
      <p class="demo-chip mx-auto mt-8">{{ content.capsule.note }}</p>
      <button type="button" class="gold-btn mt-8" @click="discover">Découvrir le concept</button>
    </section>
  </MemoryLayout>
</template>
