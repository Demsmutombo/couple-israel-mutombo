<script setup>
import { RouterLink } from 'vue-router'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content, setDemoMode, state, startTour, openPitch } = useMemory()
</script>

<template>
  <footer id="contact" class="bg-void px-6 py-16 text-white/80 lg:px-8">
    <div class="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-5">
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
          <li><RouterLink to="/">Accueil</RouterLink></li>
          <li><RouterLink to="/histoire">Histoire</RouterLink></li>
          <li><RouterLink to="/galerie">Galerie</RouterLink></li>
          <li><RouterLink to="/ceremonie">Cérémonie</RouterLink></li>
          <li><RouterLink to="/onememoria">Contact</RouterLink></li>
        </ul>
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-[0.2em] text-white">Salles</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li><RouterLink to="/voix">Voix</RouterLink></li>
          <li><RouterLink to="/livre">Livre</RouterLink></li>
          <li><RouterLink to="/capsule">Capsule</RouterLink></li>
          <li><RouterLink to="/vault">Vault</RouterLink></li>
          <li><RouterLink to="/musee">Musée</RouterLink></li>
        </ul>
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-[0.2em] text-white">Découvrir</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li><button type="button" @click="startTour('guided')">Visite guidée</button></li>
          <li><button type="button" @click="openPitch">Pitch</button></li>
          <li><RouterLink to="/admin">Administration</RouterLink></li>
        </ul>
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-[0.2em] text-white">Contact</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li>
            <a :href="content.brand.url" target="_blank" rel="noopener">onememoria.com</a>
          </li>
          <li>
            <a :href="content.brand.whatsappHref" target="_blank" rel="noopener">WhatsApp</a>
          </li>
          <li>
            <button type="button" class="text-primary" @click="setDemoMode(!state.demoMode)">
              {{ state.demoMode ? 'Demo mode' : 'Real content' }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <p class="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-center text-[11px] text-white/45">
      © {{ content.couple.renewalYear }} {{ content.brand.name }} — {{ content.couple.shortName }}
    </p>
  </footer>
</template>
