<script setup>
import { computed } from 'vue'
import { memoryContent } from '@/content'

const chapters = memoryContent.playerChapters
const media = memoryContent.media
const embedSrc = computed(
  () =>
    `https://www.youtube-nocookie.com/embed/${media.youtubeId}?rel=0&modestbranding=1&hd=1&color=white`,
)
</script>

<template>
  <div class="overflow-hidden border border-primary/20 bg-void">
    <div class="relative aspect-video bg-night">
      <iframe
        :src="embedSrc"
        class="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
        title="Mariage Israël Mutombo — cérémonie"
      />
    </div>

    <div class="space-y-4 p-4 md:p-6">
      <p class="museum-kicker">Film de la cérémonie</p>
      <p class="font-display text-2xl text-white">{{ media.youtubeTitle }}</p>
      <p class="text-xs uppercase tracking-[0.18em] text-subtle">YouTube · Wantete tv · lecture HD</p>
      <div class="flex flex-wrap gap-2">
        <a
          v-for="ch in chapters"
          :key="ch.id"
          class="border border-primary/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-subtle transition hover:border-primary hover:text-primary"
          :href="`https://www.youtube.com/watch?v=${media.youtubeId}&t=${ch.start}s`"
          target="_blank"
          rel="noopener noreferrer"
        >
          [{{ ch.id }}] {{ ch.title }}
        </a>
      </div>
    </div>
  </div>
</template>
