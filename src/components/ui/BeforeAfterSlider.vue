<script setup>
import { ref } from 'vue'

defineProps({
  beforeSrc: { type: String, default: '' },
  afterSrc: { type: String, default: '' },
  beforePosition: { type: String, default: 'center 18%' },
  afterPosition: { type: String, default: 'center 20%' },
})

const pos = ref(52)

function onMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.touches ? e.touches[0].clientX : e.clientX
  pos.value = Math.min(92, Math.max(8, ((x - rect.left) / rect.width) * 100))
}
</script>

<template>
  <div
    class="relative aspect-[16/9] cursor-ew-resize overflow-hidden"
    @mousemove="onMove"
    @touchmove.prevent="onMove"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-primary/25 to-void">
      <img
        v-if="beforeSrc"
        :src="beforeSrc"
        alt="2011 — Israël Mutombo"
        class="h-full w-full object-cover"
        :style="{ objectPosition: beforePosition }"
      />
      <p class="absolute left-6 top-6 font-display text-4xl text-white drop-shadow">2011</p>
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-tl from-primary/40 via-mist to-void"
      :style="{ clipPath: `inset(0 0 0 ${pos}%)` }"
    >
      <img
        v-if="afterSrc"
        :src="afterSrc"
        alt="2026 — Israël Mutombo et son épouse"
        class="h-full w-full object-cover"
        :style="{ objectPosition: afterPosition }"
      />
      <p class="absolute right-6 top-6 font-display text-4xl text-white drop-shadow">2026</p>
    </div>
    <div class="absolute inset-y-0 w-px bg-primary" :style="{ left: `${pos}%` }" />
    <div
      class="absolute top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-void text-center text-xs leading-10 text-white"
      :style="{ left: `${pos}%` }"
    >
      ⇆
    </div>
  </div>
</template>
