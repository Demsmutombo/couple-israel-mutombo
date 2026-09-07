<script setup>
import { computed, onMounted, ref } from 'vue'

defineProps({
  years: { type: Number, default: 15 },
  label: { type: String, default: '15 ANS — Israël & son épouse' },
})

const qrSrc = ref('/img/memoire/qr.jfif')
const targetUrl = ref('')

onMounted(() => {
  const url = new URL(import.meta.env.BASE_URL || '/', window.location.origin)
  url.searchParams.set('from', 'qr')
  targetUrl.value = url.href
  qrSrc.value = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=14&data=${encodeURIComponent(url.href)}`
})

const alt = computed(() =>
  targetUrl.value
    ? `QR Memory — ouvre ${targetUrl.value}`
    : 'QR Memory — Israël Mutombo et son épouse',
)
</script>

<template>
  <div class="mx-auto max-w-sm bg-transparent p-0 text-ink">
    <p class="font-royal text-[10px] uppercase tracking-[0.28em] text-primary">Couple Israël Mutombo</p>
    <p class="mt-4 font-display text-4xl">{{ years }} ANS</p>
    <p class="mt-1 text-sm tracking-[0.12em] text-subtle">{{ label }}</p>
    <img
      :src="qrSrc"
      :alt="alt"
      class="mx-auto mt-8 h-auto w-full max-w-[280px] bg-white p-3"
      decoding="async"
    />
    <p class="mt-6 text-center text-[11px] leading-relaxed text-subtle">
      Scannez pour ouvrir la mémoire — page d’accueil bienvenue
    </p>
  </div>
</template>
