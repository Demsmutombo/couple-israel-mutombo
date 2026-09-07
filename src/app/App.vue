<script setup>
import { ref } from 'vue'
import WelcomeScreen from '@/components/ui/WelcomeScreen.vue'
import SplashScreen from '@/components/ui/SplashScreen.vue'
import PageTransition from '@/components/layout/PageTransition.vue'
import MusicFab from '@/components/ui/MusicFab.vue'
import { useMemory } from '@/composables/useMemory.js'

const mem = useMemory()

function comesFromQr() {
  try {
    const params = new URLSearchParams(window.location.search)
    return params.get('from') === 'qr' || params.get('welcome') === '1'
  } catch {
    return false
  }
}

/** QR scanners usually open with no referrer; a refresh must stay on splash. */
function isFreshExternalEntry() {
  try {
    const nav = performance.getEntriesByType('navigation')[0]
    if (nav?.type === 'reload' || nav?.type === 'back_forward') return false
    return !document.referrer
  } catch {
    return false
  }
}

const forceWelcome = comesFromQr() || isFreshExternalEntry()
if (forceWelcome) {
  mem.prepareWelcomeEntry()
}

const phase = ref(forceWelcome || !mem.state.welcomeSeen ? 'welcome' : 'splash')

function clearEntryParams() {
  try {
    const url = new URL(window.location.href)
    let changed = false
    ;['from', 'welcome'].forEach((key) => {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key)
        changed = true
      }
    })
    if (!changed) return
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  } catch {
    /* ignore */
  }
}

function onWelcomeStart() {
  mem.markWelcomeSeen()
  clearEntryParams()
  phase.value = 'splash'
}

function onSplashDone() {
  mem.enterMemory()
  phase.value = 'ready'
}
</script>

<template>
  <WelcomeScreen v-if="phase === 'welcome'" @start="onWelcomeStart" />
  <SplashScreen v-else-if="phase === 'splash'" @dismissed="onSplashDone" />
  <PageTransition v-else />
  <MusicFab v-if="phase === 'ready'" />
</template>
