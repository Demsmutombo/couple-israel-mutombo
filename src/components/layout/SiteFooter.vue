<script setup>
import { RouterLink } from 'vue-router'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content } = useMemory()
</script>

<template>
  <footer class="bg-void px-6 py-16 text-white/80 lg:px-8">
    <div class="mx-auto max-w-3xl text-center">
      <blockquote class="font-display text-2xl italic text-primary-soft">
        “{{ content.footer.quote }}”
      </blockquote>
      <p class="mt-4 text-sm">{{ content.footer.quotePremium }}</p>
    </div>

    <div class="mx-auto mt-14 grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
          <BrandLogo size="md" />
          {{ content.brand.name }}
        </p>
        <p class="mt-4 text-sm leading-relaxed">{{ content.brand.signature }}</p>
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-[0.2em] text-white">Navigation</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="item in content.nav" :key="item.to">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-[0.2em] text-white">Mémoire</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li><RouterLink to="/ceremonie">Cérémonie</RouterLink></li>
          <li><RouterLink to="/voix">Voix</RouterLink></li>
          <li><RouterLink to="/livre">Livre</RouterLink></li>
          <li><RouterLink to="/musee">Musée</RouterLink></li>
        </ul>
      </div>
    </div>
    <p class="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-center text-[11px] text-white/45">
      {{ content.footer.creditLabel }}
      <a :href="content.footer.creditUrl" target="_blank" rel="noopener" class="text-primary">{{ content.footer.creditName }}</a>
      <span class="mx-2">|</span>
      © {{ content.couple.renewalYear }} {{ content.couple.shortName }}
    </p>
  </footer>
</template>
