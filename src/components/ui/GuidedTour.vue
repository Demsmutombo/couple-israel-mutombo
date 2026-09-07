<script setup>
import { computed, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMemory, tourBeats } from '@/composables/useMemory.js'

const router = useRouter()
const mem = useMemory()
const { state, currentBeat, tourProgress } = mem

const visible = computed(() => state.tourActive)
let auto = null

watch(
  () => [state.tourActive, state.tourIntro, state.tourIndex],
  async ([active, intro]) => {
    if (!active || intro || state.tourFinished) return
    const beat = tourBeats[state.tourIndex]
    if (!beat) return
    await router.push({ path: beat.route, hash: beat.hash || '' })
  },
)

watch(
  () => state.presentation && state.tourActive && !state.tourIntro && !state.tourFinished,
  (on) => {
    if (auto) clearInterval(auto)
    auto = null
    if (on) auto = setInterval(() => onNext(), 14000)
  },
)

onUnmounted(() => {
  if (auto) clearInterval(auto)
})

async function onNext() {
  if (state.tourIntro) {
    mem.beginTourSteps()
    await router.push(tourBeats[0].route)
    return
  }
  const r = mem.nextTour()
  if (r === 'end') {
    state.tourFinished = true
  }
}

function onPrev() {
  mem.prevTour()
}
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="pointer-events-none fixed inset-0 z-[80]">
      <div
        v-if="state.tourIntro"
        class="pointer-events-auto flex h-full flex-col items-center justify-center bg-void/96 px-6 text-center"
      >
        <div class="royal-frame w-full max-w-3xl px-8 py-14 sm:px-14">
        <p class="museum-kicker">Visite guidée</p>
        <h2 class="mt-6 max-w-3xl font-display text-4xl text-white md:text-6xl">Bienvenue dans une mémoire pas comme les autres.</h2>
        <p class="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/80">
        Cette mémoire a été conçue pour conserver les 15 années d’une histoire, les voix de ceux qui l’ont
          vécue et les souvenirs d’une journée qui mérite d’être transmise.
        </p>
        <button type="button" class="gold-btn-solid mt-10" @click="onNext">Commencer la visite</button>
        <p class="mt-6 text-[11px] uppercase tracking-[0.28em] text-subtle">Environ 5 minutes</p>
        <button type="button" class="mt-8 text-[11px] uppercase tracking-[0.2em] text-subtle" @click="mem.skipTour()">
          Passer la visite
        </button>
        </div>
      </div>

      <div
        v-else-if="state.tourFinished"
        class="pointer-events-auto flex h-full flex-col items-center justify-center bg-void/96 px-6 text-center"
      >
        <p class="font-display text-3xl text-white md:text-5xl">15 années ont écrit une histoire.</p>
        <p class="mt-6 font-display text-2xl text-primary-soft md:text-4xl">Aujourd’hui, nous la conservons.</p>
        <p class="mt-6 font-display text-2xl text-white/80 md:text-4xl">Demain, nous la transmettrons.</p>
        <p class="mt-14 text-[11px] uppercase tracking-[0.28em] text-primary">Couple Israël Mutombo</p>
        <p class="mt-3 text-sm italic text-subtle">Vos moments passent. Votre mémoire reste.</p>
        <div class="mt-12 flex flex-col gap-3 sm:flex-row">
          <button type="button" class="gold-btn-solid" @click="mem.skipTour(); router.push('/')">
            Explorer la mémoire
          </button>
          <button type="button" class="gold-btn" @click="mem.skipTour(); router.push('/onememoria')">
            Contact
          </button>
          <button type="button" class="gold-btn" @click="mem.restartTour()">↻ Recommencer la visite</button>
        </div>
      </div>

      <div
        v-else
        class="pointer-events-auto absolute inset-x-0 bottom-0 border-t border-white/10 bg-void/95 p-4 backdrop-blur-md md:p-6"
        :class="state.presentation ? 'md:p-10' : ''"
      >
        <div class="mx-auto max-w-5xl">
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-subtle">
            <span>{{ currentBeat.kicker }} · {{ tourProgress }}</span>
            <div class="flex gap-4">
              <button type="button" @click="mem.skipTour()">Quitter la visite</button>
              <button type="button" @click="mem.skipTour()">Passer la visite</button>
            </div>
          </div>
          <p class="mb-3 hidden flex-wrap gap-x-2 text-[9px] uppercase tracking-[0.18em] text-subtle/80 md:flex">
            <span v-for="(label, i) in ['Histoire','15 ans','Cérémonie','Voix','Témoignages','IA','Capsule','Livre','Musée','Vault','QR','Futur','Fin']" :key="label" :class="i === state.tourIndex ? 'text-primary' : ''">
              {{ label }}<span v-if="i < 12" class="text-subtle/40"> →</span>
            </span>
          </p>
          <div class="mb-4 h-px w-full overflow-hidden bg-primary/15">
            <div class="h-full bg-primary transition-all duration-700" :style="{ width: `${((state.tourIndex + 1) / 13) * 100}%` }" />
          </div>
          <p class="font-display text-2xl text-white md:text-4xl">{{ currentBeat.title }}</p>
          <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/75">{{ currentBeat.body }}</p>
          <div class="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" class="gold-btn" @click="onPrev">← Précédent</button>
            <button v-if="state.tourIndex < 12" type="button" class="gold-btn-solid" @click="onNext">
              Suivant →
            </button>
            <button v-else type="button" class="gold-btn-solid" @click="onNext">Terminer</button>
            <button
              v-if="state.tourFinished || state.tourIndex >= 12"
              type="button"
              class="text-[11px] uppercase tracking-[0.2em] text-primary"
              @click="mem.restartTour()"
            >
              ↻ Recommencer la visite
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
