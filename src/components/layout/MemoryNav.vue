<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { useMemory } from '@/composables/useMemory.js'

const router = useRouter()
const route = useRoute()
const { content, startTour } = useMemory()
const open = ref(false)
const more = ref(false)
const scrolled = ref(false)
const onHero = computed(() => route.path === '/')
const navOnPhoto = computed(() => onHero.value && !scrolled.value)

const primary = [
  { to: '/', label: 'Accueil' },
  { to: '/histoire', label: 'Histoire' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/ceremonie', label: 'Cérémonie' },
  { to: '/voix', label: 'Voix' },
  { to: '/onememoria', label: 'Contact' },
]

function go(to) {
  open.value = false
  more.value = false
  router.push(to)
}

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function isActive(to) {
  return route.path === to
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition duration-500"
    :class="navOnPhoto
      ? 'nav-hero bg-transparent'
      : 'bg-cream/95 text-ink shadow-lg shadow-black/10 backdrop-blur-md'"
  >
    <nav class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 lg:px-8">
      <button
        type="button"
        class="flex items-center gap-3 text-left"
        :class="navOnPhoto ? 'text-white' : 'text-ink'"
        @click="go('/')"
      >
        <BrandLogo size="md" />
        <span class="text-[11px] font-semibold uppercase tracking-[0.18em]">{{ content.brand.name }}</span>
      </button>

      <div class="hidden items-center lg:flex">
        <button
          v-for="item in primary"
          :key="item.to"
          type="button"
          class="nav-link"
          :class="isActive(item.to) ? 'is-active' : ''"
          @click="go(item.to)"
        >
          {{ item.label }}
        </button>
        <div class="relative">
          <button type="button" class="nav-link" @click="more = !more">Plus ▾</button>
          <div
            v-if="more"
            class="absolute left-0 top-full mt-2 min-w-48 border border-ink/10 bg-cream p-2 text-left shadow-xl"
          >
            <button
              v-for="item in content.nav.filter((n) => !primary.some((p) => p.to === n.to))"
              :key="item.to"
              type="button"
              class="block w-full px-3 py-2 text-left text-[11px] uppercase tracking-[0.16em] text-ink/80 hover:text-ink"
              @click="go(item.to)"
            >
              {{ item.label }}
            </button>
            <button
              type="button"
              class="block w-full px-3 py-2 text-left text-[11px] uppercase tracking-[0.16em] text-primary"
              @click="go('/musee')"
            >
              Musée
            </button>
            <button
              type="button"
              class="block w-full px-3 py-2 text-left text-[11px] uppercase tracking-[0.16em] text-primary"
              @click="go('/admin')"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="hidden px-5 py-2 text-[10px] uppercase tracking-[0.18em] transition md:inline"
          :class="navOnPhoto
            ? 'text-white hover:bg-white/15'
            : 'text-ink hover:bg-ink/10'"
          @click="startTour('guided')"
        >
          Découvrir
        </button>
        <ThemeToggle :on-photo="navOnPhoto" />
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          :class="navOnPhoto ? 'text-white' : 'text-ink'"
          aria-label="Menu"
          @click="open = !open"
        >
          <i class="fas fa-bars" />
        </button>
      </div>
    </nav>

    <div v-if="open" class="max-h-[70vh] overflow-auto bg-cream px-5 py-4 text-ink lg:hidden">
      <button
        v-for="item in content.nav"
        :key="item.to"
        type="button"
        class="block w-full py-3 text-left text-xs uppercase tracking-[0.16em]"
        @click="go(item.to)"
      >
        {{ item.label }}
      </button>
    </div>
  </header>
</template>
