<script setup>
import { computed, ref } from 'vue'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import DocumentaryPlayer from '@/components/ui/DocumentaryPlayer.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import { useMemory } from '@/composables/useMemory.js'
import { memoryContent } from '@/content'

const { content, track } = useMemory()
const active = ref(content.ceremony[0].id)
const search = ref('')
const step = computed(() => content.ceremony.find((s) => s.id === active.value))
const stepMedia = computed(() => content.media.steps[active.value] || content.media.steps.ceremonie)
const filmStills = computed(() => content.media.videos.filter((v) => v.poster))
const filtered = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return memoryContent.transcription.sections
  return memoryContent.transcription.sections.filter(
    (s) => s.text.toLowerCase().includes(q) || s.title.toLowerCase().includes(q),
  )
})

function openStep(s) {
  active.value = s.id
  track('timeline_opened', { id: s.id })
  track('video_played', { source: 'ceremony' })
}
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-6xl px-6 py-16 text-center md:text-left">
      <p class="museum-kicker">Cérémonie</p>
      <h1 class="museum-title mt-4">Revivre la cérémonie</h1>
      <div class="mt-10 flex gap-3 overflow-x-auto pb-4">
        <button
          v-for="s in content.ceremony"
          :key="s.id"
          type="button"
          class="min-w-[140px] border px-4 py-3 text-left"
          :class="active === s.id ? 'border-primary text-primary' : 'border-primary/20 text-subtle'"
          @click="openStep(s)"
        >
          <span class="block text-[10px] tracking-[0.2em]">{{ s.time }}</span>
          <span class="mt-1 block text-sm">{{ s.title }}</span>
        </button>
      </div>

      <div class="mt-8 grid gap-8 lg:grid-cols-5">
        <div class="lg:col-span-3">
          <DocumentaryPlayer />
          <p class="mt-4 font-display text-2xl">{{ step.title }}</p>
          <p class="mt-2 text-sm text-subtle">{{ step.body }}</p>
        </div>
        <aside class="space-y-6 lg:col-span-2">
          <div class="border border-primary/20 p-5">
            <p class="museum-kicker">Transcription</p>
            <p class="mt-2 text-xs text-subtle">Durée {{ memoryContent.transcription.duration }} · recherche dans le texte</p>
            <input
              v-model="search"
              type="search"
              class="om-field mt-4 w-full px-3 py-2 text-sm"
              placeholder="Rechercher dans la transcription"
            />
            <ul class="mt-4 space-y-4">
              <li v-for="sec in filtered" :key="sec.t">
                <p class="text-[10px] uppercase tracking-[0.2em] text-primary">{{ sec.t }} · {{ sec.title }}</p>
                <p class="mt-1 text-sm leading-relaxed text-ink/80">{{ sec.text }}</p>
              </li>
            </ul>
          </div>
          <div>
            <p class="museum-kicker mb-3">Médias de l’étape</p>
            <div class="grid grid-cols-2 gap-3">
              <ArchiveVisual
                :seed="step.id + 'p'"
                :src="stepMedia.photo"
                title="Photographie"
                kicker="Photo"
                object-position="center 30%"
              />
              <ArchiveVisual
                :seed="step.id + 'v'"
                :src="stepMedia.video"
                title="Séquence"
                kicker="Image"
                object-position="center 30%"
              />
            </div>
          </div>
        </aside>
      </div>

      <div class="mt-16">
        <p class="museum-kicker">Images de la journée</p>
        <h2 class="mt-3 font-display text-3xl">Les séquences conservées</h2>
        <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ArchiveVisual
            v-for="clip in filmStills"
            :key="clip.id"
            :seed="clip.id"
            ratio="aspect-video"
            :src="clip.poster"
            :title="clip.title"
            :kicker="clip.category"
          />
        </div>
      </div>

      <div class="mt-16">
        <p class="museum-kicker">Moments clés</p>
        <h2 class="mt-3 font-display text-3xl">Les instants importants</h2>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <article v-for="m in content.moments" :key="m.id" class="border border-primary/15 p-5">
            <p class="text-xl">{{ m.icon }}</p>
            <h3 class="mt-3 font-display text-2xl">{{ m.title }}</h3>
            <p class="text-[11px] uppercase tracking-[0.16em] text-primary">{{ m.timestamp }} · {{ m.type }}</p>
            <p class="mt-3 text-sm text-subtle">{{ m.description }}</p>
          </article>
        </div>
      </div>
    </section>
  </MemoryLayout>
</template>
