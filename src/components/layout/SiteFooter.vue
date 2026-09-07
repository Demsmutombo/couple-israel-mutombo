<script setup>
import { RouterLink } from 'vue-router'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
</script>

<template>
  <footer class="relative overflow-hidden bg-void text-white">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    <div
      class="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full opacity-20"
      style="background: radial-gradient(circle, rgba(181,142,109,0.35), transparent 70%)"
    />

    <div class="relative mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <div class="flex flex-col items-center text-center">
        <BrandLogo size="lg" />
        <p class="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
          {{ content.brand.name }}
        </p>
        <p class="mt-3 text-[11px] uppercase tracking-[0.2em] text-primary">
          {{ content.couple.years }} · {{ content.couple.anniversary }} ans
        </p>
        <blockquote class="mt-8 max-w-2xl font-display text-2xl leading-snug text-primary-soft sm:text-3xl">
          “{{ content.footer.quote }}”
        </blockquote>
        <p class="mt-4 max-w-md text-sm leading-relaxed text-white/55">
          {{ content.footer.quotePremium }}
        </p>
      </div>

      <nav
        class="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-y border-white/10 py-8"
        aria-label="Pied de page"
      >
        <RouterLink
          v-for="item in content.nav"
          :key="item.to"
          :to="item.to"
          class="text-[11px] uppercase tracking-[0.18em] text-white/55 transition hover:text-primary"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="mt-10 text-center">
        <p class="text-[11px] tracking-[0.12em] text-white/35">
          © {{ content.couple.renewalYear }} {{ content.couple.shortName }}
        </p>
      </div>
    </div>
  </footer>
</template>
