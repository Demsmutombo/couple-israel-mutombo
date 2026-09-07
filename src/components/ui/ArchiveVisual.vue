<script setup>
import { computed } from 'vue'

const props = defineProps({
  seed: { type: [String, Number], default: 'om' },
  title: { type: String, default: '' },
  caption: { type: String, default: '' },
  kicker: { type: String, default: '' },
  ratio: { type: String, default: 'aspect-[4/5]' },
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  eager: { type: Boolean, default: false },
  objectPosition: { type: String, default: 'center' },
  play: { type: Boolean, default: false },
  contain: { type: Boolean, default: false },
})

const angle = computed(() => {
  const s = String(props.seed)
  let h = 0
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 360
  return h
})

const bg = computed(() => {
  const a = angle.value
  return `linear-gradient(${a}deg, rgba(181,142,109,0.28) 0%, rgba(28,25,23,0.4) 40%, rgba(17,17,17,0.95) 100%),
    radial-gradient(circle at ${30 + (a % 40)}% ${20 + (a % 30)}%, rgba(212,180,150,0.16), transparent 42%)`
})

const label = computed(() => props.alt || props.title || 'Archive visuelle')
</script>

<template>
  <figure :class="['archive-card grain-overlay relative', ratio]">
    <div class="archive-media">
      <img
        v-if="src"
        :src="src"
        :alt="label"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        decoding="async"
        class="absolute inset-0 h-full w-full"
        :class="contain ? 'object-contain' : 'kenburns object-cover'"
        :style="{ objectPosition }"
      />
      <div v-else class="absolute inset-0 kenburns" :style="{ background: bg }" />
    </div>
    <div v-if="!contain" class="absolute inset-0 bg-gradient-to-t from-void via-void/15 to-black/20" />
    <div v-else class="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
    <span
      v-if="play"
      class="absolute left-1/2 top-1/2 z-[1] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white"
      aria-hidden="true"
    >
      <i class="fas fa-play pl-0.5 text-sm" />
    </span>
    <figcaption class="absolute inset-x-0 bottom-0 z-[1] p-4">
      <p v-if="kicker" class="museum-kicker mb-1">{{ kicker }}</p>
      <p v-if="title" class="font-display text-xl text-white">{{ title }}</p>
      <p v-if="caption" class="mt-1 text-[11px] tracking-wide text-white/70">{{ caption }}</p>
    </figcaption>
  </figure>
</template>
