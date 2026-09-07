<script setup>
import { ref, watch } from 'vue'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import PageFlipBook from '@/components/ui/PageFlipBook.vue'
import { useMemory } from '@/composables/useMemory.js'

const open = ref(false)
const { track, state, currentBeat, content } = useMemory()

function openBook() {
  open.value = true
  track('book_opened')
}

watch(
  () => [state.tourActive, currentBeat.value?.id],
  ([active, id]) => {
    if (active && id === 'livre') openBook()
  },
  { immediate: true },
)
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-4xl px-6 py-20 text-center">
      <p class="museum-kicker">Le livre de nos {{ content.couple.anniversary }} ans</p>
      <div v-if="!open" class="mx-auto mt-10 max-w-md border border-primary/30 bg-gradient-to-b from-mist to-void px-8 py-24">
        <p class="font-display text-6xl">{{ content.couple.anniversary }} ANS</p>
        <p class="mt-4 font-display text-3xl italic text-primary-soft">Notre histoire</p>
        <button type="button" class="gold-btn-solid mt-12" @click="openBook">Ouvrir le livre</button>
      </div>
      <div v-else class="mt-10 text-left">
        <PageFlipBook />
      </div>
    </section>
  </MemoryLayout>
</template>
