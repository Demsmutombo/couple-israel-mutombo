<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme.js'

defineProps({
  onPhoto: { type: Boolean, default: false },
})

const { preference, setPreference } = useTheme()

function toggleTheme() {
  const html = document.documentElement
  html.classList.add('theme-animating')
  setPreference(preference.value === 'light' ? 'dark' : 'light')
  window.setTimeout(() => html.classList.remove('theme-animating'), 700)
}

const nextModeLabel = computed(() => (preference.value === 'light' ? 'sombre' : 'clair'))
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :class="{ 'is-light': preference === 'light', 'on-photo': onPhoto }"
    :title="`Passer en mode ${nextModeLabel}`"
    :aria-label="`Passer en mode ${nextModeLabel}`"
    @click="toggleTheme"
  >
    <span class="theme-toggle__stage" aria-hidden="true">
      <i class="fas fa-sun theme-toggle__sun" />
      <i class="fas fa-moon theme-toggle__moon" />
    </span>
  </button>
</template>
