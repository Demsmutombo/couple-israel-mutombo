<script setup>
defineProps({
  years: { type: Number, default: 15 },
  label: { type: String, default: '15 ANS — Israël & son épouse' },
})
</script>

<template>
  <div class="mx-auto max-w-sm bg-transparent p-0 text-ink">
    <p class="font-royal text-[10px] uppercase tracking-[0.28em] text-primary">Couple Israël Mutombo</p>
    <p class="mt-4 font-display text-4xl">{{ years }} ANS</p>
    <p class="mt-1 text-sm tracking-[0.12em] text-subtle">{{ label }}</p>
    <img
      src="/img/memoire/qr.jfif"
      alt="QR Memory — Israël Mutombo et son épouse"
      class="mx-auto mt-8 h-auto w-full max-w-[280px]"
      decoding="async"
    />
    <p class="mt-6 text-center text-[11px] leading-relaxed text-subtle">
      Scannez pour ouvrir la mémoire
    </p>
  </div>
</template>
