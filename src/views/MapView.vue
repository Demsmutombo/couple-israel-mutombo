<script setup>
import { computed, ref } from 'vue'
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
const selected = ref(content.mapPlaces[0])
const search = ref('')
const userPos = ref(null)
const locateError = ref('')
const locateBusy = ref(false)

function embedUrl(query, zoom = 12) {
  const q = (query || content.mapCenter.query).trim()
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&hl=fr&z=${zoom}&output=embed`
}

function mapsLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

const activeQuery = computed(() => {
  if (userPos.value && selected.value?.id === 'here') {
    return `${userPos.value.lat},${userPos.value.lng}`
  }
  if (search.value.trim()) return search.value.trim()
  if (selected.value?.query) return selected.value.query
  return content.mapCenter.query
})

const activeZoom = computed(() => {
  if (userPos.value && selected.value?.id === 'here') return 15
  if (search.value.trim()) return 13
  return selected.value?.zoom || content.mapCenter.zoom
})

const iframeSrc = computed(() => embedUrl(activeQuery.value, activeZoom.value))

function pick(place) {
  search.value = ''
  selected.value = place
}

function submitSearch() {
  if (!search.value.trim()) return
  selected.value = {
    id: 'search',
    title: search.value.trim(),
    text: 'Résultat affiché sur Google Maps.',
    query: search.value.trim(),
    zoom: 13,
  }
}

function locateMe() {
  if (!navigator.geolocation) {
    locateError.value = 'La géolocalisation n’est pas disponible sur cet appareil.'
    return
  }
  locateBusy.value = true
  locateError.value = ''
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userPos.value = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      selected.value = {
        id: 'here',
        title: 'Ma position',
        text: 'Localisation actuelle, affichée sur Google Maps.',
        query: `${pos.coords.latitude},${pos.coords.longitude}`,
        zoom: 15,
      }
      search.value = ''
      locateBusy.value = false
    },
    () => {
      locateError.value = 'Impossible de lire la position. Autorisez la localisation dans le navigateur.'
      locateBusy.value = false
    },
    { enableHighAccuracy: true, timeout: 10000 },
  )
}
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-6xl px-6 py-16">
      <p class="museum-kicker">Carte des souvenirs</p>
      <h1 class="museum-title mt-4">Des lieux pour les mémoires</h1>
      <p class="mt-4 max-w-2xl text-sm text-subtle">
        Chaque souvenir peut être relié à un lieu réel sur Google Maps. Les adresses exactes du couple seront ajoutées dès qu’elles seront confirmées.
      </p>

      <form class="mt-8 flex flex-col gap-3 sm:flex-row" @submit.prevent="submitSearch">
        <input
          v-model="search"
          type="search"
          class="om-field flex-1 px-4 py-3 text-sm"
          placeholder="Rechercher un lieu sur Google Maps"
        />
        <button type="submit" class="gold-btn-solid">Voir sur Maps</button>
        <button type="button" class="gold-btn" :disabled="locateBusy" @click="locateMe">
          {{ locateBusy ? 'Localisation…' : 'Ma position' }}
        </button>
      </form>
      <p v-if="locateError" class="mt-3 text-sm text-primary">{{ locateError }}</p>

      <div class="mt-8 overflow-hidden border border-primary/20">
        <iframe
          :key="iframeSrc"
          class="h-[420px] w-full md:h-[520px]"
          :src="iframeSrc"
          title="Google Maps — carte des souvenirs"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        />
      </div>

      <div class="mt-4 flex flex-wrap gap-3">
        <a class="gold-btn inline-flex" :href="mapsLink(activeQuery)" target="_blank" rel="noopener">
          Ouvrir dans Google Maps
        </a>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-2">
        <button
          v-for="p in content.mapPlaces"
          :key="p.id"
          type="button"
          class="border p-5 text-left transition"
          :class="selected?.id === p.id ? 'border-primary' : 'border-primary/15 hover:border-primary/40'"
          @click="pick(p)"
        >
          <p class="text-[11px] uppercase tracking-[0.16em] text-primary">Souvenir</p>
          <h2 class="mt-2 font-display text-2xl text-ink">{{ p.title }}</h2>
          <p class="mt-2 text-sm text-subtle">{{ p.text }}</p>
        </button>
      </div>

      <article v-if="selected" class="mt-8 border border-primary/20 p-6">
        <h2 class="font-display text-3xl">📍 {{ selected.title }}</h2>
        <p class="mt-3 text-sm text-subtle">{{ selected.text }}</p>
      </article>
    </section>
  </MemoryLayout>
</template>
