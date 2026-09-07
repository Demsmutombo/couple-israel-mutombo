<script setup>
import { onMounted } from 'vue'
import { memoryContent } from '@/content'

const emit = defineEmits(['start'])

onMounted(() => {
  document.body.classList.add('overflow-hidden')
})

function start() {
  emit('start')
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden px-6"
      role="dialog"
      aria-label="Bienvenue"
    >
      <img
        :src="memoryContent.media.hero"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        style="object-position: center 18%"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/45" />

      <div class="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <h1 class="font-display text-4xl leading-tight text-white sm:text-6xl md:text-7xl">
          {{ memoryContent.splash.title }}
        </h1>
        <p class="mt-8 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          {{ memoryContent.splash.welcome }}
        </p>
        <button type="button" class="discover-btn mt-12" @click="start">
          <span class="discover-btn__icon" aria-hidden="true">▶</span>
          {{ memoryContent.splash.cta }}
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.discover-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  min-width: min(22rem, 88vw);
  padding: 1.15rem 2.25rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #111;
  background: var(--primary);
  border: 0;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease;
}

.discover-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-3px) scale(1.02);
}

.discover-btn__icon {
  font-size: 0.7rem;
  line-height: 1;
}
</style>
