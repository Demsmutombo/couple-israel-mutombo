<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const items = [
  { to: '/', label: 'Accueil', icon: 'fas fa-landmark' },
  { to: '/histoire', label: 'Histoire', icon: 'fas fa-book-open' },
  { to: '/parcours', label: 'Parcours', icon: 'fas fa-microphone' },
  { to: '/galerie', label: 'Galerie', icon: 'fas fa-camera' },
  { to: '/famille', label: 'Famille', icon: 'fas fa-users' },
]
</script>

<template>
  <nav
    class="fixed inset-x-3 bottom-3 z-40 bg-cream/95 text-ink shadow-lg backdrop-blur-xl transition-colors duration-500 lg:hidden"
    style="padding-bottom: env(safe-area-inset-bottom)"
  >
    <ul class="grid grid-cols-5">
      <li v-for="item in items" :key="item.to">
        <button
          type="button"
          class="flex w-full flex-col items-center gap-1 py-3 text-[8px] uppercase tracking-[0.16em] transition-colors duration-300"
          :class="route.path === item.to ? 'text-primary' : 'text-ink/45'"
          @click="router.push(item.to)"
        >
          <i :class="item.icon" />
          {{ item.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>
