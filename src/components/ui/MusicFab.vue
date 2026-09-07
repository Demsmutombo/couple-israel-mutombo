<script setup>
import { useAmbientMusic } from '@/composables/useAmbientMusic.js'

const { enabled, isPlaying, loadError, title, toggle } = useAmbientMusic()
</script>

<template>
  <div
    v-if="enabled"
    class="pointer-events-none fixed bottom-24 left-4 z-40 sm:bottom-8 sm:left-8"
  >
    <button
      type="button"
      class="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-void text-primary shadow-lg transition duration-500 hover:scale-110 hover:bg-primary hover:text-night focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95"
      :class="loadError ? 'cursor-not-allowed opacity-50' : ''"
      :title="title"
      :aria-pressed="isPlaying"
      :aria-label="isPlaying ? 'Arrêter la musique' : 'Lancer la musique'"
      :disabled="loadError"
      @click="toggle"
    >
      <i v-if="!isPlaying" class="fas fa-play pl-0.5 text-sm" aria-hidden="true" />
      <i v-else class="fas fa-pause text-sm" aria-hidden="true" />
    </button>
  </div>
</template>
