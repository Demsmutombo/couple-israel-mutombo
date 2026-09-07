<script setup>
const props = defineProps({
  years: { type: Number, default: 15 },
  label: { type: String, default: '15 ANS — Israël & son épouse' },
})
</script>

<template>
  <div class="mx-auto max-w-sm border border-primary/40 bg-[#f7f1ea] p-8 text-[#1c1917] shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
    <p class="font-royal text-[10px] uppercase tracking-[0.4em] text-gold-dim">ONE MEMORIA</p>
    <p class="mt-4 font-display text-4xl">{{ years }} ANS</p>
    <p class="mt-1 text-sm tracking-[0.12em]">{{ label }}</p>
    <svg viewBox="0 0 120 120" class="mx-auto my-6 h-40 w-40" aria-label="QR Memory">
      <rect width="120" height="120" fill="#f4efe6" />
      <g fill="#0a0908">
        <rect v-for="n in 64" :key="n" :x="8 + ((n - 1) % 8) * 13" :y="8 + Math.floor((n - 1) / 8) * 13" :width="((n * 7) % 5) + 6" :height="((n * 3) % 5) + 6" />
      </g>
      <rect x="8" y="8" width="28" height="28" fill="#0a0908" />
      <rect x="14" y="14" width="16" height="16" fill="#f4efe6" />
      <rect x="84" y="8" width="28" height="28" fill="#0a0908" />
      <rect x="90" y="14" width="16" height="16" fill="#f4efe6" />
      <rect x="8" y="84" width="28" height="28" fill="#0a0908" />
      <rect x="14" y="90" width="16" height="16" fill="#f4efe6" />
    </svg>
    <p class="text-center text-[11px] leading-relaxed text-gold-dim">
      ONE MEMORIA · 15 ans
    </p>
  </div>
</template>
