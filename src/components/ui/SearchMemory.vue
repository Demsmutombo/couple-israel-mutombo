<script setup>
import { ref } from 'vue'
import { simulateSearch, memoryContent } from '@/content'
import { useMemory } from '@/composables/useMemory.js'

const mem = useMemory()
const query = ref('')
const result = ref(null)

function run(q) {
  query.value = q
  result.value = simulateSearch(q)
  mem.state.searchResult = result.value
  mem.track('feature_opened', { name: 'search' })
  mem.showTip(
    'ia',
    'Mémoire intelligente',
    'Cette fonctionnalité permettra de rechercher dans les contenus de la mémoire. Ici, la réponse est simulée.',
  )
}
</script>

<template>
  <section class="border border-primary/20 bg-night-elevated/60 p-6 md:p-10">
    <p class="museum-kicker">Mémoire intelligente · démonstration UX</p>
    <h2 class="mt-4 font-display text-3xl md:text-5xl">Que souhaitez-vous retrouver ?</h2>
    <form class="mt-8 flex flex-col gap-3 sm:flex-row" @submit.prevent="run(query)">
      <input
        v-model="query"
        type="search"
        class="flex-1 border border-primary/25 bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-subtle"
        placeholder="Que voulez-vous retrouver dans cette mémoire ?"
      />
      <button type="submit" class="gold-btn-solid">Rechercher</button>
    </form>
    <div class="mt-6 flex flex-wrap gap-2">
      <button
        v-for="s in memoryContent.searchSuggestions"
        :key="s"
        type="button"
        class="border border-primary/20 px-3 py-2 text-left text-xs text-ink/80 hover:border-primary/50"
        @click="run(s)"
      >
        {{ s }}
      </button>
    </div>

    <div v-if="result" class="mt-10 space-y-6">
      <p class="font-display text-2xl text-primary-soft">{{ result.headline }}</p>
      <p class="demo-chip">{{ result.note }}</p>
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <p class="museum-kicker mb-3">Vidéos</p>
          <ul class="space-y-2 text-sm">
            <li v-for="v in result.videos" :key="v.title" class="border-b border-primary/10 py-2">
              {{ v.title }} <span class="text-subtle">{{ v.t }}</span>
            </li>
          </ul>
        </div>
        <div>
          <p class="museum-kicker mb-3">Photographies</p>
          <ul class="space-y-2 text-sm">
            <li v-for="p in result.photos" :key="p.title" class="border-b border-primary/10 py-2">
              {{ p.title }} <span class="text-subtle">{{ p.year }}</span>
            </li>
          </ul>
        </div>
        <div>
          <p class="museum-kicker mb-3">Témoignages</p>
          <ul class="space-y-2 text-sm">
            <li v-for="t in result.testimonials" :key="t.title" class="border-b border-primary/10 py-2">
              {{ t.title }} <span class="text-subtle">{{ t.rel }}</span>
            </li>
          </ul>
        </div>
        <div>
          <p class="museum-kicker mb-3">Transcription</p>
          <p class="text-sm leading-relaxed text-ink/80">{{ result.transcription.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
