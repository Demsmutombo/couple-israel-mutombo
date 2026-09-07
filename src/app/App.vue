<script setup>
import { ref } from 'vue'
import WelcomeScreen from '@/components/ui/WelcomeScreen.vue'
import SplashScreen from '@/components/ui/SplashScreen.vue'
import PitchDeck from '@/components/ui/PitchDeck.vue'
import PageTransition from '@/components/layout/PageTransition.vue'
import MusicFab from '@/components/ui/MusicFab.vue'
import { useMemory } from '@/composables/useMemory.js'

const mem = useMemory()
const phase = ref('welcome')

function onWelcomeStart() {
  mem.enterMemory()
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
  <PitchDeck />
</template>
