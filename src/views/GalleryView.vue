<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import FacebookEmbed from '@/components/ui/FacebookEmbed.vue'
import { buildGalleryItems } from '@/content'
import { useMemory } from '@/composables/useMemory.js'

const items = buildGalleryItems()
const { content } = useMemory()
const filter = ref('Tous')
const index = ref(-1)
const cats = computed(() => ['Tous', ...content.galleryCategories])
const shown = computed(() => (filter.value === 'Tous' ? items : items.filter((i) => i.category === filter.value)))
const current = computed(() => (index.value >= 0 ? shown.value[index.value] : null))
const videoHref = computed(
  () => current.value?.href || content.media.ceremonyHref,
)
const startX = ref(0)
const deltaX = ref(0)
const dragging = ref(false)

function openItem(item) {
  const i = shown.value.findIndex((entry) => entry.id === item.id)
  index.value = i >= 0 ? i : 0
}

function close() {
  index.value = -1
}

function next() {
  if (!shown.value.length) return
  index.value = (index.value + 1) % shown.value.length
}

function prev() {
  if (!shown.value.length) return
  index.value = (index.value - 1 + shown.value.length) % shown.value.length
}

function onKey(event) {
  if (index.value < 0) return
  if (event.key === 'Escape') close()
}

function onPointerDown(event) {
  if (event.target.closest('button')) return
  dragging.value = true
  startX.value = event.clientX
  deltaX.value = 0
  event.currentTarget.setPointerCapture?.(event.pointerId)
}

function onPointerMove(event) {
  if (!dragging.value) return
  deltaX.value = event.clientX - startX.value
}

function onPointerUp() {
  if (!dragging.value) return
  if (deltaX.value < -64) next()
  else if (deltaX.value > 64) prev()
  dragging.value = false
  deltaX.value = 0
}

watch(current, (item) => {
  document.body.classList.toggle('overflow-hidden', Boolean(item))
})

watch(filter, close)

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-7xl px-6 py-16 text-center">
      <p class="museum-kicker">Galerie</p>
      <h1 class="museum-title mt-4">Notre galerie</h1>
      <p class="mx-auto mt-4 max-w-xl text-sm text-subtle">
        Ouvrez un souvenir, puis glissez pour passer au suivant.
      </p>
      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        <button
          v-for="post in content.media.facebookPosts"
          :key="post.id"
          type="button"
          class="text-left"
          @click="openItem(items.find((entry) => entry.src === post.src) || items[0])"
        >
          <ArchiveVisual
            :seed="post.id"
            ratio="aspect-[4/5]"
            :src="post.src"
            :title="post.title"
            kicker="Le couple"
            :object-position="post.objectPosition"
          />
        </button>
      </div>
      <div class="mt-8 flex justify-center gap-2 overflow-x-auto pb-2">
        <button
          v-for="c in cats"
          :key="c"
          type="button"
          class="shrink-0 border px-3 py-2 text-[11px] uppercase tracking-[0.14em]"
          :class="filter === c ? 'border-primary text-primary' : 'border-primary/20 text-subtle'"
          @click="filter = c"
        >
          {{ c }}
        </button>
      </div>
      <div class="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        <button v-for="item in shown" :key="item.id" type="button" class="text-left" @click="openItem(item)">
          <ArchiveVisual
            :seed="item.id"
            :src="item.src"
            :title="item.title"
            :kicker="item.category"
            :caption="item.kind === 'video' ? 'Film' : ''"
            :play="item.kind === 'video'"
            :object-position="item.objectPosition"
          />
        </button>
      </div>
    </section>

    <Teleport to="body">
      <div
        v-if="current"
        class="fixed inset-0 z-[70] touch-none overflow-hidden bg-void"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
      >
        <button
          type="button"
          class="absolute right-4 top-4 z-[71] flex h-12 w-12 items-center justify-center border border-white/30 text-2xl text-white"
          aria-label="Fermer"
          @click="close"
        >
          ×
        </button>

        <div class="flex h-full w-full items-center justify-center overflow-hidden">
          <FacebookEmbed
            v-if="current.kind === 'video'"
            class="w-[min(56vw,560px)]"
            :href="videoHref"
            kind="video"
            hide-source
          />
          <img
            v-else
            :src="current.src"
            :alt="current.title"
            class="max-h-full max-w-full select-none object-contain"
            draggable="false"
            :style="{
              objectPosition: current.objectPosition,
              transform: `translateX(${deltaX}px)`,
              transition: dragging ? 'none' : 'transform 0.25s ease',
            }"
          />
        </div>
      </div>
    </Teleport>
  </MemoryLayout>
</template>
