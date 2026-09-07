<script setup>
defineProps({
  text: { type: String, default: 'Bienvenue dans l’histoire de 15 années…' },
  enabled: { type: Boolean, default: false },
})
</script>

<template>
  <div
    v-if="enabled"
    class="fixed bottom-28 left-1/2 z-30 hidden -translate-x-1/2 border border-primary/20 bg-void/90 px-4 py-2 text-[11px] tracking-wide text-subtle md:block"
  >
    🎙️ {{ text }}
    <span class="ml-2 uppercase tracking-[0.16em] text-primary/70">Composant prévu — voix à enregistrer</span>
  </div>
</template>
