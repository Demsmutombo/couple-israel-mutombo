<script setup>
import { ref } from 'vue'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import { useMemory } from '@/composables/useMemory.js'

const { addMessage, state, content } = useMemory()
const type = ref('Texte')
const author = ref('')
const excerpt = ref('')
const sent = ref(false)
const types = ['Texte', 'Message vocal', 'Message vidéo', 'Photo + message']

function submit() {
  if (!excerpt.value.trim()) return
  addMessage({ type: type.value, author: author.value.trim() || 'Un visiteur', excerpt: excerpt.value })
  excerpt.value = ''
  sent.value = true
}
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-2xl px-6 py-16 text-center">
      <p class="museum-kicker">{{ content.message.voeuxKicker }}</p>
      <h1 class="museum-title mt-4">{{ content.message.voeuxTitle }}</h1>
      <p class="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ink/80">
        {{ content.message.voeuxIntro }}
      </p>
    </section>

    <section class="mx-auto max-w-xl px-6 pb-20">
      <div class="grid grid-cols-2 gap-2">
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
        <input v-model="author" class="om-field w-full px-4 py-3 text-sm" placeholder="Votre nom" />
        <textarea v-model="excerpt" rows="5" class="om-field w-full px-4 py-3 text-sm" placeholder="Votre message, prière ou bénédiction" />
        <button type="submit" class="gold-btn-solid w-full">Envoyer le message</button>
      </form>
      <p v-if="sent" class="mt-4 text-center text-sm text-primary">
        Message enregistré — il pourra être lu par le couple.
      </p>
      <ul class="mt-10 space-y-3 text-sm">
        <li v-for="m in state.messages" :key="m.id" class="border border-primary/15 p-4">
          <span class="text-primary">{{ m.type }}</span> · {{ m.author }} — {{ m.excerpt }}
        </li>
      </ul>
    </section>
  </MemoryLayout>
</template>
