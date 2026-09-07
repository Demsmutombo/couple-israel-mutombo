<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { siteContent } from '@/content'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

const router = useRouter()
const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

const activeHash = computed(() => {
  const h = route.hash || '#home'
  return h === '' ? '#home' : h
})

function go(hash) {
  mobileOpen.value = false
  router.push({ path: '/', hash })
}

function onScroll() {
  scrolled.value = window.scrollY > 48
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function linkClass(hash) {
  return [
    'rounded px-2 py-2 text-xs font-semibold uppercase tracking-wide transition lg:px-2.5 lg:py-6',
    'text-brand-dark/90 hover:text-primary dark:text-secondary dark:hover:text-primary',
    activeHash.value === hash ? 'text-primary' : '',
  ]
}
</script>

<template>
  <header
    class="fixed left-2 right-2 top-2 z-50 rounded-2xl border transition-all duration-300 sm:left-4 sm:right-4 sm:top-3"
    :class="
      scrolled
        ? 'border-primary/25 bg-primary-soft/58 py-2 shadow-lg shadow-primary/15 backdrop-blur-md dark:border-primary-soft/35 dark:bg-primary-soft/14 dark:shadow-[0_14px_40px_rgba(18,13,16,0.30)] dark:backdrop-blur-xl'
        : 'border-primary/20 bg-primary-soft/48 py-2.5 shadow-md shadow-primary/10 backdrop-blur-md dark:border-primary-soft/30 dark:bg-primary-soft/12 dark:shadow-md dark:shadow-primary/5 dark:backdrop-blur-xl sm:py-3'
    "
  >
    <nav
      class="mx-auto flex max-w-7xl flex-col gap-1 px-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-2 lg:px-8"
    >
      <div class="flex w-full items-center justify-between gap-2 pt-1 lg:hidden">
        <button
          type="button"
          class="inline-flex items-center rounded-md p-2 text-brand-dark dark:text-secondary"
          aria-label="Menu"
          @click="mobileOpen = !mobileOpen"
        >
          <i class="fas fa-bars text-xl" />
        </button>

        <button
          type="button"
          class="font-secondary min-w-0 flex-1 truncate text-center text-2xl text-brand-dark dark:text-secondary/95"
          @click="go('#home')"
        >
          {{ siteContent.couple.navBrandMobile.line1 }}
          <span class="text-primary">{{ siteContent.couple.navBrandMobile.joiner }}</span>
          {{ siteContent.couple.navBrandMobile.line2 }}
        </button>

        <ThemeToggle />
      </div>

      <div
        class="w-full flex-grow flex-col items-stretch lg:flex lg:w-auto lg:flex-row lg:items-center lg:justify-between"
        :class="mobileOpen ? 'flex' : 'hidden lg:flex'"
      >
        <div class="flex flex-col gap-1 py-2 lg:flex-row lg:py-0">
          <button
            v-for="item in siteContent.nav.slice(0, 4)"
            :key="item.hash"
            type="button"
            :class="linkClass(item.hash)"
            @click="go(item.hash)"
          >
            {{ item.label }}
          </button>
        </div>

        <button
          type="button"
          class="font-secondary mx-6 hidden text-4xl text-brand-dark dark:text-secondary/95 lg:block"
          @click="go('#home')"
        >
          {{ siteContent.couple.navBrandDesktop.before
          }}<span class="text-primary">{{ siteContent.couple.navBrandDesktop.joiner }}</span
          >{{ siteContent.couple.navBrandDesktop.after }}
        </button>

        <div
          class="flex flex-col gap-1 border-t border-primary/25 py-2 dark:border-primary-soft/35 lg:flex-row lg:items-center lg:gap-3 lg:border-0 lg:py-0"
        >
          <button
            v-for="item in siteContent.nav.slice(4)"
            :key="item.hash"
            type="button"
            :class="linkClass(item.hash)"
            @click="go(item.hash)"
          >
            {{ item.label }}
          </button>
          <div class="hidden justify-center lg:flex lg:pl-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
