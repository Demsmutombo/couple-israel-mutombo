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
    return new URLSearchParams(window.location.search).get('from') === 'qr'
  } catch {
    return false
  }
}

const fromQr = comesFromQr()
if (fromQr) {
  mem.prepareWelcomeEntry()
}

const phase = ref(fromQr || !mem.state.welcomeSeen ? 'welcome' : 'splash')

function clearQrParam() {
  try {
    const url = new URL(window.location.href)
    if (!url.searchParams.has('from')) return
    url.searchParams.delete('from')
    const next = `${url.pathname}${url.search}${url.hash}`
    window.history.replaceState({}, '', next)
  } catch {
    /* ignore */
  }
}

function onWelcomeStart() {
  mem.markWelcomeSeen()
  clearQrParam()
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
