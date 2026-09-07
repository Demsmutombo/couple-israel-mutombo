<script setup>
import { ref } from 'vue'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import { useMemory } from '@/composables/useMemory.js'

const { addMessage, state } = useMemory()
const type = ref('Texte')
const author = ref('Un visiteur')
const excerpt = ref('')
const sent = ref(false)
const types = ['Texte', 'Message vocal', 'Message vidéo', 'Photo + message']

function submit() {
  if (!excerpt.value.trim()) return
  addMessage({ type: type.value, author: author.value, excerpt: excerpt.value })
  excerpt.value = ''
  sent.value = true
}
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-xl px-6 py-16">
      <p class="museum-kicker">Messages</p>
      <h1 class="museum-title mt-4">Laissez un message au couple</h1>
      <div class="mt-8 grid grid-cols-2 gap-2">
        <button
          v-for="t in types"
          :key="t"
          type="button"
          class="border px-3 py-3 text-xs uppercase tracking-[0.12em]"
          :class="type === t ? 'border-primary text-primary' : 'border-primary/20 text-subtle'"
          @click="type = t"
        >
          {{ t }}
        </button>
      </div>
      <form class="mt-8 space-y-4" @submit.prevent="submit">
        <input v-model="author" class="om-field w-full px-4 py-3 text-sm" placeholder="Votre nom (placeholder)" />
        <textarea v-model="excerpt" rows="5" class="om-field w-full px-4 py-3 text-sm" placeholder="Votre message" />
        <button type="submit" class="gold-btn-solid">Envoyer pour modération</button>
      </form>
      <p v-if="sent" class="mt-4 text-sm text-primary">Message enregistré dans la file de modération (simulation locale).</p>
      <ul class="mt-10 space-y-3 text-sm">
        <li v-for="m in state.messages" :key="m.id" class="border border-primary/15 p-4">
          <span class="text-primary">{{ m.type }}</span> · {{ m.author }} — {{ m.excerpt }}
        </li>
      </ul>
    </section>
  </MemoryLayout>
</template>
