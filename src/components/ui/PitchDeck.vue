<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMemory } from '@/composables/useMemory.js'

const router = useRouter()
const { state, content } = useMemory()
const index = ref(0)

function close() {
  state.pitchOpen = false
  index.value = 0
}

function next() {
  if (index.value < content.pitchSlides.length - 1) index.value += 1
  else {
    close()
    router.push('/')
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="state.pitchOpen"
      class="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-void px-6 text-center text-white"
    >
      <div class="w-full max-w-4xl px-8 py-16 sm:px-16 sm:py-20">
      <p class="museum-kicker">{{ content.pitchSlides[index].kicker }}</p>
      <h2 class="mt-8 max-w-4xl font-display text-4xl text-white sm:text-6xl">{{ content.pitchSlides[index].title }}</h2>
      <p class="mt-8 text-[11px] uppercase tracking-[0.3em] text-subtle">
        {{ String(index + 1).padStart(2, '0') }} / 08
      </p>
      <div class="mt-12 flex gap-4">
        <button v-if="index > 0" type="button" class="gold-btn" @click="index -= 1">Précédent</button>
        <button type="button" class="gold-btn-solid" @click="next">
          {{ index < 7 ? 'Suivant' : 'Explorer la mémoire' }}
        </button>
      </div>
      <button type="button" class="mt-8 text-[11px] uppercase tracking-[0.2em] text-subtle" @click="close">
        Fermer
      </button>
      </div>
    </div>
  </Teleport>
</template>
