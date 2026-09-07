<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import { useMemory } from '@/composables/useMemory.js'

const route = useRoute()
const router = useRouter()
const mem = useMemory()
const { state, content, setModeration } = mem

const tabs = [
  'dashboard',
  'souvenirs',
  'photos',
  'videos',
  'audios',
  'temoignages',
  'invites',
  'timeline',
  'capsules',
  'documents',
  'utilisateurs',
  'permissions',
  'moderation',
  'sauvegardes',
  'statistiques',
]

const tab = computed(() => String(route.params.tab || 'dashboard').toLowerCase())
const stats = content.adminStats

function go(t) {
  router.push(`/admin/${t}`)
}

function submitMedia() {
  state.mediaDraft.title = ''
  state.mediaDraft.description = ''
}
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <p class="museum-kicker">Administration</p>
      <h1 class="museum-title mt-3">Tableau de bord</h1>
      <p class="demo-chip mt-4">Interface simulée — aucun backend connecté</p>

      <div class="mt-8 flex gap-2 overflow-x-auto pb-2">
        <button
          v-for="t in tabs"
          :key="t"
          type="button"
          class="shrink-0 border px-3 py-2 text-[10px] uppercase tracking-[0.14em]"
          :class="tab === t ? 'border-primary text-primary' : 'border-primary/20 text-subtle'"
          @click="go(t)"
        >
          {{ t }}
        </button>
      </div>

      <div v-if="tab === 'dashboard' || tab === 'statistiques'" class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="k in ['souvenirs','photos','videos','audios','temoignages','messages','capsules']" :key="k" class="border border-primary/15 p-5">
          <p class="text-[10px] uppercase tracking-[0.2em] text-subtle">{{ k }}</p>
          <p class="mt-2 font-display text-4xl text-primary">{{ stats[k] }}</p>
        </article>
        <article class="border border-primary/15 p-5 sm:col-span-2">
          <p class="text-[10px] uppercase tracking-[0.2em] text-subtle">Stockage</p>
          <p class="mt-2 font-display text-3xl">{{ stats.storage }}</p>
          <div class="mt-4 h-2 bg-primary/15">
            <div class="h-full w-2/5 bg-primary" />
          </div>
        </article>
      </div>

      <div v-if="tab === 'permissions' || tab === 'utilisateurs'" class="mt-10 space-y-6">
        <p class="text-sm text-subtle">Rôle actuel de prévisualisation : {{ state.role }}</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="r in content.roles"
            :key="r"
            type="button"
            class="border px-3 py-2 text-xs"
            :class="state.role === r ? 'border-primary text-primary' : 'border-primary/20'"
            @click="state.role = r"
          >
            {{ r }}
          </button>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <article v-for="(perms, role) in content.permissions" :key="role" class="border border-primary/15 p-5">
            <h3 class="font-display text-2xl">{{ role }}</h3>
            <ul class="mt-3 list-disc pl-5 text-sm text-subtle">
              <li v-for="p in perms" :key="p">{{ p }}</li>
            </ul>
          </article>
        </div>
      </div>

      <div v-if="['photos','videos','audios','documents','souvenirs'].includes(tab)" class="mt-10 max-w-xl space-y-4">
        <p class="font-display text-2xl">Gestion des médias</p>
        <select v-model="state.mediaDraft.kind" class="om-field w-full px-3 py-2 text-sm">
          <option value="photo">Upload photo</option>
          <option value="video">Upload vidéo</option>
          <option value="audio">Upload audio</option>
          <option value="document">Upload document</option>
        </select>
        <input v-model="state.mediaDraft.title" class="om-field w-full px-3 py-2 text-sm" placeholder="Titre" />
        <input v-model="state.mediaDraft.date" type="date" class="om-field w-full px-3 py-2 text-sm" />
        <input v-model="state.mediaDraft.category" class="om-field w-full px-3 py-2 text-sm" placeholder="Catégorie" />
        <input v-model="state.mediaDraft.people" class="om-field w-full px-3 py-2 text-sm" placeholder="Personnes" />
        <input v-model="state.mediaDraft.place" class="om-field w-full px-3 py-2 text-sm" placeholder="Lieu" />
        <textarea v-model="state.mediaDraft.description" class="om-field w-full px-3 py-2 text-sm" placeholder="Description" />
        <div class="flex gap-2">
          <button v-for="v in ['PUBLIC','FAMILLE','PRIVÉ']" :key="v" type="button" class="border px-3 py-2 text-xs" :class="state.mediaDraft.visibility === v ? 'border-primary text-primary' : 'border-primary/20'" @click="state.mediaDraft.visibility = v">{{ v }}</button>
        </div>
        <button type="button" class="gold-btn-solid" @click="submitMedia">Enregistrer (simulation)</button>
      </div>

      <div v-if="tab === 'moderation' || tab === 'temoignages' || tab === 'invites'" class="mt-10">
        <h2 class="font-display text-3xl">Modération des souvenirs</h2>
        <ul class="mt-6 space-y-3">
          <li v-for="row in state.moderation" :key="row.id" class="flex flex-wrap items-center justify-between gap-3 border border-primary/15 p-4">
            <div>
              <p class="text-sm">{{ row.author }} · {{ row.type }}</p>
              <p class="text-xs text-subtle">{{ row.excerpt }} · {{ row.status }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button type="button" class="gold-btn" @click="setModeration(row.id, 'approved')">Approuver</button>
              <button type="button" class="gold-btn" @click="setModeration(row.id, 'pending')">Modifier</button>
              <button type="button" class="gold-btn" @click="setModeration(row.id, 'refused')">Refuser</button>
              <button type="button" class="gold-btn" @click="state.moderation = state.moderation.filter((m) => m.id !== row.id)">Supprimer</button>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="tab === 'timeline'" class="mt-10 space-y-3">
        <article v-for="t in content.timeline" :key="t.id" class="border border-primary/15 p-4">
          {{ t.year }} — {{ t.title }}
        </article>
      </div>

      <div v-if="tab === 'capsules'" class="mt-10 border border-primary/20 p-8">
        <p class="font-display text-3xl">Capsule 2036</p>
        <p class="mt-2 text-sm text-subtle">{{ content.capsule.dedicated }}</p>
      </div>

      <div v-if="tab === 'sauvegardes'" class="mt-10 space-y-4 text-sm">
        <p>Stockage principal *</p>
        <p>Sauvegarde secondaire *</p>
        <p>Export *</p>
        <p>Versionnage *</p>
        <p>Restauration *</p>
        <p class="mt-6">Dernière sauvegarde : {{ stats.backup }}</p>
        <p>État : {{ stats.backupState }}</p>
        <p class="demo-chip">{{ stats.backupNote }}</p>
      </div>
    </section>
  </MemoryLayout>
</template>
