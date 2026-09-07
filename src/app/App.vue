<script setup>
import { ref } from 'vue'
import SplashScreen from '@/components/ui/SplashScreen.vue'
import PitchDeck from '@/components/ui/PitchDeck.vue'
import PageTransition from '@/components/layout/PageTransition.vue'
import MusicFab from '@/components/ui/MusicFab.vue'
import { useMemory } from '@/composables/useMemory.js'

const mem = useMemory()
const splashDone = ref(false)

function onSplashDone() {
  mem.enterMemory()
  splashDone.value = true
}
</script>

<template>
  <SplashScreen v-if="!splashDone" @dismissed="onSplashDone" />
  <PageTransition v-else />
  <MusicFab v-if="splashDone" />
  <PitchDeck />
</template>
