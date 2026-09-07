<script setup>
import { RouterLink } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import ArchiveVisual from '@/components/ui/ArchiveVisual.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content, couple } = useMemory()
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-5xl px-6 py-16">
      <p class="museum-kicker">Notre histoire</p>
      <h1 class="museum-title mt-4">Tout commence par une histoire.</h1>
      <p class="mt-6 max-w-2xl text-sm leading-relaxed text-ink/80">
        OneMemoria ne commence pas avec une photo ou une vidéo. Elle commence avec l’histoire des personnes que nous
        voulons préserver.
      </p>
      <p class="mt-4 text-sm text-subtle">
        {{ couple.husband }} et son épouse · {{ couple.years }}
      </p>
      <div class="mt-12 grid gap-6 md:grid-cols-2">
        <ArchiveVisual
          v-for="post in content.media.facebookPosts"
          :key="post.id"
          :seed="post.id"
          :src="post.src"
          :title="post.title"
          kicker="Le couple"
          :object-position="post.objectPosition"
        />
      </div>
      <div class="mt-16 space-y-10">
        <article v-for="t in content.timeline" :key="t.id" :id="t.id" class="grid items-center gap-6 border-t border-primary/15 pt-10 md:grid-cols-12">
          <p class="font-display text-4xl text-primary md:col-span-3">{{ t.year }}</p>
          <div class="md:col-span-9">
            <h2 class="font-display text-3xl">{{ t.title }}</h2>
            <p class="mt-3 text-sm leading-relaxed text-subtle">{{ t.description }}</p>
          </div>
        </article>
      </div>
      <RouterLink class="gold-btn mt-12 inline-flex" to="/timeline">Voir la timeline</RouterLink>
    </section>
  </MemoryLayout>
</template>
