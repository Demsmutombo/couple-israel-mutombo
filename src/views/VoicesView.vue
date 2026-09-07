<script setup>
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import AudioCard from '@/components/ui/AudioCard.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-6xl px-6 py-16">
      <p class="museum-kicker">Voix</p>
      <h1 class="museum-title mt-4">Les voix qui ont marqué cette journée</h1>
      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AudioCard
          v-for="v in content.voices"
          :key="v.id"
          :name="v.name"
          :role="v.role"
          :kind="v.kind"
          :src="v.src"
        />
      </div>
    </section>
  </MemoryLayout>
</template>
