<script setup>
defineProps({
  visible: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    v-show="visible"
    type="button"
    class="floating-ui fixed bottom-24 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-void/95 text-primary shadow-lg transition duration-500 hover:scale-110 hover:bg-primary hover:text-night sm:bottom-8 sm:right-8"
    aria-label="Retour en haut"
    @click="emit('click')"
  >
    <i class="fas fa-angle-double-up" />
  </button>
</template>
