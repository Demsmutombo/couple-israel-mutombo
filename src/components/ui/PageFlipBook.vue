<script setup>
import { computed, ref } from 'vue'
import { memoryContent } from '@/content'

const page = ref(0)
const pages = memoryContent.bookPages
const current = computed(() => pages[page.value])
const turning = ref(false)

function go(dir) {
  const next = page.value + dir
  if (next < 0 || next >= pages.length) return
  turning.value = true
  setTimeout(() => {
    page.value = next
    turning.value = false
  }, 280)
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <div
      class="relative min-h-[420px] border border-primary/25 bg-secondary px-8 py-12 text-night shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition duration-300"
      :class="turning ? 'translate-x-2 opacity-70' : ''"
    >
      <p class="text-[10px] uppercase tracking-[0.4em] text-gold-dim">Page {{ current.n }}</p>
      <h2 class="mt-6 font-display text-4xl md:text-5xl">{{ current.title }}</h2>
      <p class="mt-8 max-w-lg text-base leading-relaxed text-night/80">{{ current.body }}</p>
      <p class="absolute bottom-6 right-8 font-display text-xl text-gold-dim">{{ current.n }}</p>
    </div>
    <div class="mt-6 flex justify-between">
      <button type="button" class="gold-btn" :disabled="page === 0" @click="go(-1)">Page précédente</button>
      <button type="button" class="gold-btn" :disabled="page === pages.length - 1" @click="go(1)">Page suivante</button>
    </div>
  </div>
</template>
