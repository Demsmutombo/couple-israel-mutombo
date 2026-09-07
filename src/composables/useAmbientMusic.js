import { ref } from 'vue'
import { memoryContent } from '@/content'
import { usePublicUrl } from '@/composables/usePublicUrl.js'

const isPlaying = ref(false)
const loadError = ref(false)

/** @type {HTMLAudioElement | null} */
let audio = null

function getAudio() {
  const src = memoryContent.music?.src
  if (!src || audio) return audio
  audio = new Audio(usePublicUrl(src))
  audio.loop = true
  audio.preload = 'none'
  audio.addEventListener('play', () => {
    isPlaying.value = true
  })
  audio.addEventListener('pause', () => {
    isPlaying.value = false
  })
  audio.addEventListener('error', () => {
    loadError.value = true
    isPlaying.value = false
  })
  return audio
}

export function useAmbientMusic() {
  const enabled = Boolean(memoryContent.music?.enabled && memoryContent.music?.src)

  function toggle() {
    if (!enabled || loadError.value) return
    const a = getAudio()
    if (!a) return
    if (a.paused) {
      a.play().catch(() => {
        loadError.value = true
        isPlaying.value = false
      })
    } else {
      a.pause()
    }
  }

  return {
    enabled,
    isPlaying,
    loadError,
    title: memoryContent.music?.titleHover || 'Musique d’ambiance',
    toggle,
  }
}
