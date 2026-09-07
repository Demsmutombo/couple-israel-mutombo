<script setup>
import MemoryLayout from '@/components/layout/MemoryLayout.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { useMemory } from '@/composables/useMemory.js'

const { content, couple } = useMemory()
</script>

<template>
  <MemoryLayout>
    <section class="mx-auto max-w-2xl px-6 py-24 text-center">
      <div class="mb-8 flex justify-center">
        <BrandLogo size="lg" />
      </div>
      <p class="museum-kicker">Contact</p>
      <h1 class="museum-title mt-6">{{ couple.familyName }}</h1>
      <p class="mt-6 text-sm leading-relaxed text-subtle">{{ content.message.main }}</p>

      <p class="mt-12 text-[11px] uppercase tracking-[0.18em] text-primary">{{ content.contact.intro }}</p>
      <div class="mt-6 flex flex-col items-center gap-3 text-sm">
        <a class="gold-btn-solid" :href="content.contact.whatsappHref" target="_blank" rel="noopener">
          WhatsApp · {{ content.contact.phoneLabel }}
        </a>
        <a class="gold-btn" :href="content.contact.phoneHref">{{ content.contact.phoneLabel }}</a>
      </div>

      <blockquote class="mt-16 font-display text-2xl italic text-primary-soft">
        “{{ content.footer.quote }}”
      </blockquote>
      <p class="mt-4 text-sm text-subtle">{{ content.footer.quotePremium }}</p>
    </section>
  </MemoryLayout>
</template>
