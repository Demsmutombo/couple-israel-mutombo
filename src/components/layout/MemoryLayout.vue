<script setup>
import { ref } from 'vue'
import MemoryNav from '@/components/layout/MemoryNav.vue'
import MobileDock from '@/components/layout/MobileDock.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import MusicFab from '@/components/ui/MusicFab.vue'
import BackToTopFab from '@/components/ui/BackToTopFab.vue'
import { useScrollChrome } from '@/composables/useScrollChrome.js'
import { useMemory } from '@/composables/useMemory.js'
import { useReveal } from '@/composables/useReveal.js'

defineProps({
  hideFooter: { type: Boolean, default: false },
  flush: { type: Boolean, default: false },
})

const mainEl = ref(null)
const { showBackTop, scrollToTop } = useScrollChrome()
const { state, dismissTip } = useMemory()
useReveal(mainEl)
</script>

<template>
  <div class="min-h-screen bg-page text-ink bottom-dock lg:pb-0">
    <MemoryNav />
    <main ref="mainEl" :class="flush ? '' : 'pt-24'">
      <slot />
    </main>
    <SiteFooter v-if="!hideFooter" />
    <MobileDock />
    <MusicFab />
    <BackToTopFab :visible="showBackTop" @click="scrollToTop" />

    <div
      v-if="state.activeTip"
      class="fixed bottom-24 right-4 z-50 max-w-xs border border-primary/30 bg-night-elevated p-4 shadow-2xl md:bottom-8"
    >
      <p class="text-sm font-medium text-primary">💡 {{ state.activeTip.title }}</p>
      <p class="mt-2 text-xs leading-relaxed text-ink/75">{{ state.activeTip.body }}</p>
      <button type="button" class="mt-3 text-[11px] uppercase tracking-[0.16em] text-primary" @click="dismissTip">
        Compris
      </button>
    </div>
  </div>
</template>
