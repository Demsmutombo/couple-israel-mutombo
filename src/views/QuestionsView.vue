<script setup>
import { computed, ref } from 'vue'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
const i = ref(0)
const q = computed(() => content.questions[i.value])
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-3xl px-6 py-20">
      <p class="museum-kicker">{{ content.questions.length }} questions — {{ content.couple.anniversary }} ans</p>
      <p class="mt-4 text-[11px] uppercase tracking-[0.28em] text-subtle">{{ String(i + 1).padStart(2, '0') }} / {{ content.questions.length }}</p>
      <h1 class="museum-title mt-6">{{ q }}</h1>
      <div class="mt-12 flex justify-between">
        <button type="button" class="gold-btn" :disabled="i === 0" @click="i -= 1">Question précédente</button>
        <button type="button" class="gold-btn" :disabled="i === content.questions.length - 1" @click="i += 1">Question suivante</button>
      </div>
    </section>
  </MemoryLayout>
</template>
