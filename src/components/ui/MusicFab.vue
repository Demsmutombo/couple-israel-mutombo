<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { siteContent } from '@/content'
import { usePublicUrl } from '@/composables/usePublicUrl.js'

const isPlaying = ref(false)
const loadError = ref(false)
/** @type {import('vue').Ref<HTMLAudioElement | null>} */
const audioEl = ref(null)

const show = computed(
  () => siteContent.music?.enabled && siteContent.music?.src,
)
const showFab = ref(false)

const trackUrl = computed(() =>
  show.value ? usePublicUrl(siteContent.music.src) : '',
)

function onPlay() {
  isPlaying.value = true
}

function onPause() {
  isPlaying.value = false
}

function onError() {
  loadError.value = true
}

function updateFabVisibility() {
  showFab.value = window.scrollY > 120
}

function toggle() {
  const a = audioEl.value
  if (!a || loadError.value) return
  if (a.paused) {
    a.play().catch(() => {
      loadError.value = true
    })
  } else {
    a.pause()
  }
}

onMounted(() => {
  updateFabVisibility()
  window.addEventListener('scroll', updateFabVisibility, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateFabVisibility)
  audioEl.value?.pause()
})
</script>

<template>
  <div
    v-if="show && showFab"
    class="pointer-events-none fixed bottom-24 left-4 z-30 sm:bottom-8 sm:left-8"
  >
    <audio
      ref="audioEl"
      class="sr-only"
      :src="trackUrl"
      loop
      preload="none"
      @play="onPlay"
      @pause="onPause"
      @error="onError"
    />
    <button
      type="button"
      class="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-void text-primary shadow-lg transition duration-500 hover:scale-110 hover:bg-primary hover:text-night focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95"
      :class="loadError ? 'cursor-not-allowed opacity-50' : ''"
      :title="siteContent.music?.titleHover"
      :aria-pressed="isPlaying"
      :aria-label="isPlaying ? 'Mettre la musique en pause' : 'Lancer la musique'"
      :disabled="loadError"
      @click="toggle"
    >
      <i
        v-if="!isPlaying"
        class="fas fa-music pl-0.5 text-base"
        aria-hidden="true"
      />
      <i v-else class="fas fa-pause text-base" aria-hidden="true" />
    </button>
  </div>
</template>
