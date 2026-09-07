<script setup>
import { computed, ref } from 'vue'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import { buildGalleryItems } from '@/content'
import { useMemory } from '@/composables/useMemory.js'

const items = buildGalleryItems()
const { content, toggleFavorite, state } = useMemory()
const filter = ref('Tous')
const selected = ref(null)
const cats = computed(() => ['Tous', ...content.galleryCategories])
const shown = computed(() => (filter.value === 'Tous' ? items : items.filter((i) => i.category === filter.value)))
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-7xl px-6 py-16 text-center">
      <p class="museum-kicker">Galerie</p>
      <h1 class="museum-title mt-4">Notre galerie</h1>
      <p class="mx-auto mt-4 max-w-xl text-sm text-subtle">
        Revivez chaque instant ici. Les photos s’ouvrent dans cette page.
      </p>
      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        <ArchiveVisual
          v-for="post in content.media.facebookPosts"
          :key="post.id"
          :seed="post.id"
          ratio="aspect-[4/5]"
          :src="post.src"
          :title="post.title"
          kicker="Le couple"
          :object-position="post.objectPosition"
        />
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
        <button v-for="item in shown" :key="item.id" type="button" class="text-left" @click="selected = item">
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
        v-if="selected"
        class="fixed inset-0 z-[70] flex items-center justify-center bg-void/92 p-4"
        @click.self="selected = null"
      >
        <div class="max-h-[90vh] w-full max-w-3xl overflow-y-auto">
          <iframe
            v-if="selected.kind === 'video'"
            class="aspect-video w-full"
            :src="`https://www.youtube-nocookie.com/embed/${content.media.youtubeId}?rel=0&autoplay=1`"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
            :title="selected.title"
          />
          <ArchiveVisual
            v-else
            :seed="selected.id"
            ratio="min-h-[50vh] aspect-[4/5]"
            :src="selected.src"
            :title="selected.title"
            :kicker="selected.category"
            :object-position="selected.objectPosition"
          />
          <p class="mt-4 text-sm text-subtle">{{ selected.description }}</p>
          <div class="mt-4 flex flex-wrap gap-3">
            <button type="button" class="gold-btn" @click="toggleFavorite(selected.id)">
              {{ state.favorites.includes(selected.id) ? 'Retiré des favoris' : 'Ajouter aux favoris' }}
            </button>
            <button type="button" class="gold-btn" @click="selected = null">Fermer</button>
          </div>
        </div>
      </div>
    </Teleport>
  </MemoryLayout>
</template>
